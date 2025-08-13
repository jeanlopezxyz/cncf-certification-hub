#!/bin/bash

# Script para configurar protección de rama main via GitHub CLI
# Requiere: gh CLI instalado y autenticado

echo "🔒 Configurando protección de rama main..."

# Configurar protección de rama main
gh api repos/jeanlopezxyz/cncf-certification-hub/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["quality","test","build","security","lighthouse","link-check","notify"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":false}' \
  --field restrictions='{"users":[],"teams":[]}' \
  --field allow_force_pushes=false \
  --field allow_deletions=false

echo "✅ Protección de rama configurada exitosamente"
echo ""
echo "📋 Configuración aplicada:"
echo "- ✅ Requiere PR para merge"
echo "- ✅ Requiere 1 revisión aprobada"
echo "- ✅ Requiere que CI pase (7 checks)"
echo "- ✅ Bloquea force push"
echo "- ✅ Bloquea eliminación de rama"
echo "- ✅ Aplica reglas a administradores"