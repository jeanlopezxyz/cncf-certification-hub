#!/bin/bash

# Script para configurar Git con múltiples usuarios
# Uso: ./setup-git-config.sh [personal|work]

if [ "$1" = "personal" ]; then
    echo "🏠 Configurando Git para proyectos PERSONALES..."
    git config --local include.path "../.gitconfig-personal"
    git config --local user.name "jeanlopezxyz"
    git config --local user.email "jeanlopez@linux.com"
    echo "✅ Configurado para: jeanlopezxyz <jeanlopez@linux.com>"
    
elif [ "$1" = "work" ]; then
    echo "🏢 Configurando Git para proyectos de TRABAJO..."
    git config --local include.path "../.gitconfig-work"
    git config --local user.name "Jean Lopez"
    git config --local user.email "jealopez@redhat.com"
    echo "✅ Configurado para: Jean Lopez <jealopez@redhat.com>"
    
else
    echo "❌ Uso: $0 [personal|work]"
    echo ""
    echo "Ejemplos:"
    echo "  $0 personal  # Para proyectos personales (GitHub: jeanlopezxyz)"
    echo "  $0 work      # Para proyectos de trabajo (GitHub: jealopezb)"
    echo ""
    echo "Configuración actual:"
    echo "  Nombre: $(git config user.name)"
    echo "  Email:  $(git config user.email)"
    exit 1
fi

echo ""
echo "📋 Verificación:"
echo "  Nombre: $(git config user.name)"
echo "  Email:  $(git config user.email)"