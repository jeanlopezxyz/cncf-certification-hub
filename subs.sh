#!/usr/bin/env bash
# subs_simple.sh - Versión simple que prioriza calidad de transcripción
# Menos procesamiento = mejor transcripción en muchos casos

set -euo pipefail

usage() {
  cat <<'EOF'
Uso:
  subs_simple.sh <video_entrada> [opciones]

Opciones principales:
  --model <tiny|base|small|medium|large>     (default: medium)
  --lang <codigo>                            es, en, fr, etc. (IMPORTANTE)
  --device <auto|cuda|cpu>                   (default: auto)

Opciones de audio (usar CON CUIDADO):
  --denoise                                  Reducción de ruido suave
  --normalize                                Normalizar volumen
  --no-process                               Solo extraer audio sin procesar

Opciones de transcripción:
  --beam-size <1-5>                          Calidad búsqueda (default: 5)
  --temperature <0-1>                        Creatividad (default: 0)
  --word-timestamps                          Timestamps por palabra

Ejemplos:
  # Mejor calidad - sin procesamiento
  subs_simple.sh video.mp4 --model medium --lang es --no-process

  # Con denoise suave
  subs_simple.sh video.mp4 --model medium --lang es --denoise

  # Máxima calidad
  subs_simple.sh video.mp4 --model large --lang es --beam-size 5 --word-timestamps
EOF
}

if [[ ${1:-} == "-h" || ${1:-} == "--help" || $# -lt 1 ]]; then usage; exit 0; fi

need(){ command -v "$1" >/dev/null 2>&1 || { echo "Error: falta '$1' en el PATH."; exit 1; }; }
need ffmpeg
need python3

# Verificar whisper
if ! python3 -c "import whisper" >/dev/null 2>&1; then
  echo "Instalando whisper..."
  python3 -m pip install --upgrade openai-whisper >/dev/null
fi

INPUT="$1"; shift || true
[[ -f "$INPUT" ]] || { echo "Error: no existe el archivo: $INPUT"; exit 1; }

# Defaults optimizados para calidad
MODEL="medium"
LANG=""
DEVICE="auto"
DENOISE=0
NORMALIZE=0
NO_PROCESS=0
BEAM_SIZE=5
TEMPERATURE=0
WORD_TIMESTAMPS=0

# Parsing argumentos
while [[ $# -gt 0 ]]; do
  case "$1" in
    --model) MODEL="${2:-medium}"; shift 2 ;;
    --lang) LANG="${2:-}"; shift 2 ;;
    --device) DEVICE="${2:-auto}"; shift 2 ;;
    --denoise) DENOISE=1; shift ;;
    --normalize) NORMALIZE=1; shift ;;
    --no-process) NO_PROCESS=1; shift ;;
    --beam-size) BEAM_SIZE="${2:-5}"; shift 2 ;;
    --temperature) TEMPERATURE="${2:-0}"; shift 2 ;;
    --word-timestamps) WORD_TIMESTAMPS=1; shift ;;
    *) echo "Parámetro no reconocido: $1"; usage; exit 1 ;;
  esac
done

# Validaciones
valid_models=("tiny" "base" "small" "medium" "large")
[[ " ${valid_models[*]} " =~ " ${MODEL} " ]] || { echo "Modelo inválido: $MODEL"; exit 1; }

# Setup
BASENAME="$(basename "$INPUT")"
STEM="${BASENAME%.*}"
RAW_WAV="${STEM}_raw.wav"

echo "🎵 [1/3] Extrayendo audio..."

# Extraer audio básico
ffmpeg -y -i "$INPUT" -vn -ac 1 -ar 16000 -acodec pcm_s16le "$RAW_WAV" >/dev/null 2>&1

SOURCE_WAV="$RAW_WAV"

# Procesamiento MÍNIMO si se requiere
if [[ $NO_PROCESS -eq 0 && ($DENOISE -eq 1 || $NORMALIZE -eq 1) ]]; then
  echo "🎛️  [2/3] Procesamiento mínimo de audio..."

  CLEAN_WAV="${STEM}_clean.wav"
  FILTERS=()

  # Solo denoise muy suave si se pide
  if [[ $DENOISE -eq 1 ]]; then
    FILTERS+=("afftdn=nr=8:nf=-25")
  fi

  # Solo normalización suave si se pide
  if [[ $NORMALIZE -eq 1 ]]; then
    FILTERS+=("loudnorm=I=-18:TP=-2:LRA=11")
  fi

  # Aplicar filtros mínimos
  if [[ ${#FILTERS[@]} -gt 0 ]]; then
    IFS=','
    FILTER_CHAIN="${FILTERS[*]}"

    if ffmpeg -y -i "$RAW_WAV" -af "$FILTER_CHAIN" -ar 16000 -ac 1 "$CLEAN_WAV" >/dev/null 2>&1; then
      SOURCE_WAV="$CLEAN_WAV"
      echo "   Aplicado: $FILTER_CHAIN"
    else
      echo "   ⚠️  Procesamiento falló, usando audio original"
    fi
  fi
else
  echo "🎛️  [2/3] Sin procesamiento de audio (--no-process o sin opciones)"
fi

echo "🎯 [3/3] Transcribiendo con Whisper..."

# Determinar device
determine_device() {
  case "$DEVICE" in
    cpu) echo "cpu" ;;
    cuda|auto)
      if command -v nvidia-smi >/dev/null 2>&1 && nvidia-smi >/dev/null 2>&1; then
        echo "cuda"
      else
        echo "cpu"
      fi ;;
  esac
}

ACTUAL_DEVICE=$(determine_device)

# Argumentos Whisper optimizados para CALIDAD
WHISPER_ARGS=(
  "$SOURCE_WAV"
  --model "$MODEL"
  --output_dir "."
  --output_format all
  --temperature "$TEMPERATURE"
  --beam_size "$BEAM_SIZE"
  --best_of 5
  --patience 1.0
  --condition_on_previous_text False
  --compression_ratio_threshold 2.4
  --logprob_threshold -1.0
  --no_speech_threshold 0.6
)

# IDIOMA es CRÍTICO para buena transcripción
if [[ -n "$LANG" ]]; then
  WHISPER_ARGS+=(--language "$LANG")
  echo "   Idioma especificado: $LANG"
else
  echo "   ⚠️  Sin idioma especificado - la detección automática puede fallar"
fi

[[ $WORD_TIMESTAMPS -eq 1 ]] && WHISPER_ARGS+=(--word_timestamps True)

# Initial prompt según idioma (MUY IMPORTANTE)
if [[ "$LANG" == "es" || "$LANG" == "spanish" ]]; then
  INITIAL_PROMPT="Transcribe exactamente lo que se dice en español, incluyendo muletillas y expresiones naturales."
elif [[ "$LANG" == "en" || "$LANG" == "english" ]]; then
  INITIAL_PROMPT="Transcribe exactly what is said in English, including natural speech patterns."
else
  INITIAL_PROMPT="Transcribe exactly what is said, maintaining natural speech."
fi
WHISPER_ARGS+=(--initial_prompt "$INITIAL_PROMPT")

# Configurar device
if [[ "$ACTUAL_DEVICE" == "cpu" ]]; then
  WHISPER_ARGS+=(--device cpu --fp16 False)
  command -v nproc >/dev/null 2>&1 && WHISPER_ARGS+=(--threads "$(nproc)")
else
  WHISPER_ARGS+=(--device cuda --fp16 True)
fi

echo "   Configuración: $MODEL | $ACTUAL_DEVICE | beam_size=$BEAM_SIZE | temp=$TEMPERATURE"

# Ejecutar Whisper
if ! python3 -m whisper "${WHISPER_ARGS[@]}"; then
  if [[ "$ACTUAL_DEVICE" == "cuda" ]]; then
    echo "⚠️  Reintentando en CPU..."
    # Fallback simple en CPU
    python3 -m whisper "$SOURCE_WAV" --model "$MODEL" --output_dir "." --output_format all \
      --device cpu --fp16 False --temperature "$TEMPERATURE" \
      ${LANG:+--language "$LANG"} \
      --initial_prompt "$INITIAL_PROMPT" || {
      echo "❌ Transcripción falló"
      exit 1
    }
  else
    echo "❌ Transcripción falló"
    exit 1
  fi
fi

# Estadísticas finales
if command -v jq >/dev/null 2>&1 && [[ -f "${STEM}.json" ]]; then
  SEGMENTS=$(jq -r '.segments | length' "${STEM}.json" 2>/dev/null || echo "0")
  AVG_CONF=$(jq -r '[.segments[].avg_logprob] | add / length' "${STEM}.json" 2>/dev/null || echo "N/A")

  echo "
📊 Estadísticas:
   Segmentos detectados: $SEGMENTS
   Confianza promedio: $AVG_CONF
   "
fi

echo "✅ Transcripción completada

📁 Archivos:
   • ${STEM}.txt - Transcripción
   • ${STEM}.srt - Subtítulos
   • ${STEM}.vtt - WebVTT
   • ${STEM}.json - Datos completos
   • ${SOURCE_WAV##*/} - Audio usado

💡 Si la calidad no es buena:
   1. Especifica --lang es (crítico)
   2. Usa --model large para mejor calidad
   3. Prueba --no-process si el audio está distorsionado
   4. Ajusta --temperature 0.2 si hay repeticiones
"