#!/usr/bin/env bash
# transcribe.sh - Extrae audio de un video, limpia ruido y transcribe con Whisper (open source).
# Requisitos: ffmpeg, python3, pip, y el paquete openai-whisper.
# Instala Whisper:  pip install --upgrade openai-whisper

set -euo pipefail

usage() {
  cat <<'EOF'
Uso:
  transcribe.sh <video_entrada> [--model <tiny|base|small|medium|large>] [--lang <codigo_idioma>] [--no-denoise] [--vad]

Ejemplos:
  transcribe.sh charla.mp4
  transcribe.sh charla.mov --model medium --lang es
  transcribe.sh charla.mp4 --no-denoise
  transcribe.sh charla.mp4 --vad  # recorta silencios antes de transcribir

Salida:
  - WAV crudo: <base>.wav
  - WAV limpio: <base>_denoise.wav  (si no usas --no-denoise)
  - Transcripciones: <base>.txt, <base>.srt, <base>.vtt, <base>.json
EOF
}

if [[ ${1:-} == "-h" || ${1:-} == "--help" || $# -lt 1 ]]; then
  usage; exit 0
fi

need() { command -v "$1" >/dev/null 2>&1 || { echo "Error: falta '$1' en el PATH."; exit 1; }; }
need ffmpeg
need python3
need whisper || { echo "Instalando whisper (open source)..." ; python3 -m pip install --upgrade openai-whisper >/dev/null ; }

INPUT="$1"; shift || true
[[ -f "$INPUT" ]] || { echo "Error: no existe el archivo: $INPUT"; exit 1; }

MODEL="small"
LANG=""
DENOISE=1
APPLY_VAD=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --model) MODEL="${2:-small}"; shift 2 ;;
    --lang)  LANG="${2:-}";       shift 2 ;;
    --no-denoise) DENOISE=0; shift ;;
    --vad) APPLY_VAD=1; shift ;;
    *) echo "Parámetro no reconocido: $1"; usage; exit 1 ;;
  esac
done

BASENAME="$(basename "$INPUT")"
STEM="${BASENAME%.*}"
RAW_WAV="${STEM}.wav"
CLEAN_WAV="${STEM}_denoise.wav"

echo "[1/3] Extrayendo audio -> ${RAW_WAV} (mono, 16kHz)"
ffmpeg -y -i "$INPUT" -vn -ac 1 -ar 16000 -acodec pcm_s16le "$RAW_WAV" >/dev/null 2>&1

if [[ $DENOISE -eq 1 ]]; then
  echo "[2/3] Reducción de ruido -> ${CLEAN_WAV}"
  # Cadena de limpieza pensada para voz:
  # - afftdn: denoise en frecuencia (nf ajusta fuerza, más negativo = más agresivo)
  # - highpass 80Hz: elimina rumbles de baja frecuencia
  # - lowpass 8kHz: reduce hiss agudo manteniendo inteligibilidad a 16kHz
  # - loudnorm: normaliza niveles para mejorar ASR
  ffmpeg -y -i "$RAW_WAV" -af "afftdn=nr=12:nf=-25,highpass=f=80,lowpass=f=8000,loudnorm=I=-20:TP=-1.5:LRA=11" -ac 1 -ar 16000 "$CLEAN_WAV" >/dev/null 2>&1
  SOURCE_WAV="$CLEAN_WAV"
else
  echo "[2/3] Saltando reducción de ruido (--no-denoise)"
  SOURCE_WAV="$RAW_WAV"
fi

if [[ $APPLY_VAD -eq 1 ]]; then
  echo "[2.5/3] Recortando silencios (VAD simple) -> ${STEM}_trim.wav"
  # silenceremove elimina silencios al inicio/fin y pausas largas internas
  # start_periods=1: detecta silencio inicial; start_threshold=0.02 ≈ -34 dB
  # stop_periods=-1: recorta también silencios al final y pausas
  ffmpeg -y -i "$SOURCE_WAV" -af "silenceremove=start_periods=1:start_threshold=0.02:start_silence=0.5:stop_periods=-1:stop_threshold=0.02:stop_silence=0.8" -ac 1 -ar 16000 "${STEM}_trim.wav" >/dev/null 2>&1
  SOURCE_WAV="${STEM}_trim.wav"
fi

echo "[3/3] Transcribiendo con Whisper (modelo: ${MODEL}${LANG:+, lang: $LANG})"
WHISPER_ARGS=( "$SOURCE_WAV" --model "$MODEL" )
[[ -n "$LANG" ]] && WHISPER_ARGS+=( --language "$LANG" )

# Genera .txt, .srt, .vtt, .json
whisper "${WHISPER_ARGS[@]}"

echo "✅ Listo."
echo "Archivos generados:"
echo "  - Audio crudo : ${RAW_WAV}"
[[ $DENOISE -eq 1 ]] && echo "  - Audio limpio: ${CLEAN_WAV}"
[[ $APPLY_VAD -eq 1 ]] && echo "  - Audio VAD   : ${STEM}_trim.wav"
echo "  - Texto       : ${STEM}.txt"
echo "  - Subtítulos  : ${STEM}.srt, ${STEM}.vtt"
echo "  - Segmentos   : ${STEM}.json"
