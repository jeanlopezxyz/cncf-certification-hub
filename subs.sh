#!/usr/bin/env bash
# subs.sh - Extrae audio, limpia/realza voz y transcribe con Whisper (open source).
#          Sin cuDNN ni CTranslate2. GPU si hay, con fallback automático a CPU.
# Requisitos: ffmpeg, python3, pip. (Instala openai-whisper si falta)
# Opcional: jq (para generar <base>_filtered.txt)

set -euo pipefail

usage() {
  cat <<'EOF'
Uso:
  subs.sh <video_entrada> [--model <tiny|base|small|medium|large>] [--lang <codigo>]
          [--no-denoise] [--strong-denoise] [--vad] [--boost <dB>] [--loudnorm]
          [--device <auto|cuda|cpu>] [--batch <n>] [--initial-prompt "<texto>"]

Ejemplos:
  subs.sh charla.mp4 --model medium --lang es
  subs.sh charla.mp4 --strong-denoise --boost 4dB --vad
  subs.sh charla.mp4 --model large --lang es --device cpu   # si quieres evitar GPU

Salida:
  - <base>.wav            -> audio crudo (mono, 16kHz)
  - <base>_clean.wav      -> audio limpio + EQ + compresor (+ loudnorm/boost)
  - <base>_trim.wav       -> (si --vad) audio con silencios recortados
  - <base>.txt/.srt/.vtt/.json -> salidas de Whisper
  - <base>_filtered.txt   -> (si hay jq) texto filtrado por confianza/ruido
EOF
}

if [[ ${1:-} == "-h" || ${1:-} == "--help" || $# -lt 1 ]]; then usage; exit 0; fi

need(){ command -v "$1" >/dev/null 2>&1 || { echo "Error: falta '$1' en el PATH."; exit 1; }; }

need ffmpeg
need python3
if ! command -v whisper >/dev/null 2>&1; then
  echo "Instalando whisper (open source)..."
  python3 -m pip install --upgrade openai-whisper >/dev/null
fi

INPUT="$1"; shift || true
[[ -f "$INPUT" ]] || { echo "Error: no existe el archivo: $INPUT"; exit 1; }

# Defaults
MODEL="small"
LANG=""
DENOISE=1
STRONG_DENOISE=0
APPLY_VAD=0
BOOST_DB=""
APPLY_LOUDNORM=0
DEVICE="auto"          # auto|cuda|cpu
BATCH="4"              # reduce si hay OOM
INITIAL_PROMPT="Transcribe literalmente lo que se escucha, sin añadir palabras ni frases comunes."

# Flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --model) MODEL="${2:-small}"; shift 2 ;;
    --lang)  LANG="${2:-}";       shift 2 ;;
    --no-denoise) DENOISE=0; shift ;;
    --strong-denoise) STRONG_DENOISE=1; shift ;;
    --vad) APPLY_VAD=1; shift ;;
    --boost) BOOST_DB="${2:-}"; shift 2 ;;
    --loudnorm) APPLY_LOUDNORM=1; shift ;;
    --device) DEVICE="${2:-auto}"; shift 2 ;;
    --batch)  BATCH="${2:-4}"; shift 2 ;;
    --initial-prompt) INITIAL_PROMPT="${2:-}"; shift 2 ;;
    *) echo "Parámetro no reconocido: $1"; usage; exit 1 ;;
  esac
done

BASENAME="$(basename "$INPUT")"
STEM="${BASENAME%.*}"
RAW_WAV="${STEM}.wav"
CLEAN_WAV="${STEM}_clean.wav"

echo "[1/4] Extrayendo audio -> ${RAW_WAV} (mono, 16kHz)"
ffmpeg -y -i "$INPUT" -vn -ac 1 -ar 16000 -acodec pcm_s16le "$RAW_WAV" >/dev/null 2>&1

SOURCE_WAV="$RAW_WAV"

# --- Limpieza: denoise + EQ + compresor + loudnorm/boost + limitador ---
if [[ $DENOISE -eq 1 ]]; then
  echo "[2/4] Limpieza + EQ + Compresor de voz"
  if [[ $STRONG_DENOISE -eq 1 ]]; then
    DENOISE_CHAIN="afftdn=nr=20:nf=-35"
  else
    DENOISE_CHAIN="afftdn=nr=12:nf=-25"
  fi

  HP_LP="highpass=f=80,lowpass=f=7800"
  EQ_MUD="equalizer=f=300:t=h:width_type=o:width=1.0:g=-3"
  EQ_PRESS="equalizer=f=3000:t=h:width_type=o:width=0.8:g=3"
  COMPRESSOR="acompressor=threshold=-18dB:ratio=4:attack=5:release=50:makeup=8"
  [[ $APPLY_LOUDNORM -eq 1 ]] && LOUD="loudnorm=I=-16:TP=-1.5:LRA=11" || LOUD=""
  [[ -n "$BOOST_DB" ]] && BOOST="volume=${BOOST_DB}" || BOOST=""
  LIMIT="alimiter=limit=0.95"

  AF_CHAIN="$DENOISE_CHAIN,$HP_LP,$EQ_MUD,$EQ_PRESS,$COMPRESSOR"
  [[ -n "$LOUD"  ]] && AF_CHAIN="$AF_CHAIN,$LOUD"
  [[ -n "$BOOST" ]] && AF_CHAIN="$AF_CHAIN,$BOOST"
  AF_CHAIN="$AF_CHAIN,$LIMIT"

  ffmpeg -y -i "$SOURCE_WAV" -af "$AF_CHAIN" -ac 1 -ar 16000 "$CLEAN_WAV" >/dev/null 2>&1
  SOURCE_WAV="$CLEAN_WAV"
else
  echo "[2/4] Saltando limpieza (--no-denoise)"
fi

# --- VAD opcional (recorta silencios/pausas largas) ---
if [[ $APPLY_VAD -eq 1 ]]; then
  echo "[3/4] Recortando silencios (VAD) -> ${STEM}_trim.wav"
  ffmpeg -y -i "$SOURCE_WAV" \
    -af "silenceremove=start_periods=1:start_threshold=0.02:start_silence=0.5:stop_periods=-1:stop_threshold=0.02:stop_silence=0.8" \
    -ac 1 -ar 16000 "${STEM}_trim.wav" >/dev/null 2>&1
  SOURCE_WAV="${STEM}_trim.wav"
else
  echo "[3/4] Saltando VAD"
fi

# --- Construcción de args para whisper (anti-alucinación + device) ---
WHISPER_ARGS=( "$SOURCE_WAV" --model "$MODEL" --temperature 0 --condition_on_previous_text False \
               --no_speech_threshold 0.92 --compression_ratio_threshold 2.4 --initial_prompt "$INITIAL_PROMPT" \
               --batch_size "$BATCH" )
[[ -n "$LANG" ]] && WHISPER_ARGS+=( --language "$LANG" )

# Device
if [[ "$DEVICE" == "cpu" ]]; then
  WHISPER_ARGS+=( --device cpu --fp16 False )
elif [[ "$DEVICE" == "cuda" ]]; then
  WHISPER_ARGS+=( --device cuda --fp16 True )
else
  if command -v nvidia-smi >/dev/null 2>&1; then
    WHISPER_ARGS+=( --device cuda --fp16 True )
  else
    WHISPER_ARGS+=( --device cpu --fp16 False )
  fi
fi

# Evitar fragmentación CUDA (si aplica)
export PYTORCH_CUDA_ALLOC_CONF="${PYTORCH_CUDA_ALLOC_CONF:-expandable_segments:True,max_split_size_mb=64}"

echo "[4/4] Transcribiendo con Whisper (modelo: ${MODEL}${LANG:+, lang: $LANG})"
# Intento 1: según device elegido
if ! whisper "${WHISPER_ARGS[@]}"; then
  echo "⚠️  Falla en GPU/FP16 o memoria. Reintentando con batch más pequeño..."
  # Reduce picos de VRAM
  WHISPER_ARGS=( "${WHISPER_ARGS[@]/--batch_size $BATCH/--batch_size 2}" )
  if ! whisper "${WHISPER_ARGS[@]}"; then
    echo "⚠️  Reintentando en CPU..."
    # Forzar CPU sin FP16
    whisper "${WHISPER_ARGS[@]/--device cuda/--device cpu}" --fp16 False || {
      echo "❌ Whisper falló también en CPU."; exit 1;
    }
  fi
fi

# Post-proceso opcional con jq para filtrar segmentos de baja confianza
if command -v jq >/dev/null 2>&1 && [[ -f "${STEM}.json" ]]; then
  jq -r '
    .segments
    | map(select(
        ((.no_speech_prob // 0) < 0.85) and
        ((.avg_logprob     // -10) > -0.65) and
        ((.compression_ratio // 0) < 2.4) and
        ((.text // "") | length > 0)
      ))
    | .[].text
  ' "${STEM}.json" | sed 's/^[[:space:]]\+//;s/[[:space:]]\+$//' > "${STEM}_filtered.txt"
  echo "🧹 Post-proceso: generado ${STEM}_filtered.txt (texto filtrado por confianza/ruido)."
else
  echo "Tip: instala 'jq' para generar un texto filtrado por confianza."
fi

echo "✅ Listo.
Archivos generados:
  - Audio crudo : ${RAW_WAV}
  - Audio limpio: ${CLEAN_WAV} $( [[ $APPLY_VAD -eq 1 ]] && echo "y ${STEM}_trim.wav" )
  - Texto       : ${STEM}.txt (y ${STEM}.srt / ${STEM}.vtt / ${STEM}.json)
  - Filtrado    : ${STEM}_filtered.txt (si hay jq)
"
