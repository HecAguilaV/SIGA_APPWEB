#!/bin/bash

# SIGA Prototipo - Script de ejecución
# Uso: ./run.sh [comando]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones
show_help() {
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}   SIGA PROTOTIPO - Script de Ejecución${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    echo ""
    echo -e "${GREEN}Uso:${NC}"
    echo "  ./run.sh [comando]"
    echo ""
    echo -e "${GREEN}Comandos disponibles:${NC}"
    echo "  ${YELLOW}dev${NC}          - Inicia servidor de desarrollo (localhost:5173)"
    echo "  ${YELLOW}test${NC}         - Ejecuta tests con Karma + Jasmine"
    echo "  ${YELLOW}test:watch${NC}   - Ejecuta tests en modo watch"
    echo "  ${YELLOW}build${NC}        - Compila para producción"
    echo "  ${YELLOW}preview${NC}      - Vista previa de build"
    echo "  ${YELLOW}check${NC}        - Verifica tipos TypeScript"
    echo "  ${YELLOW}install${NC}      - Instala dependencias"
    echo "  ${YELLOW}help${NC}         - Muestra esta ayuda"
    echo ""
    echo -e "${GREEN}Ejemplos:${NC}"
    echo "  ./run.sh dev"
    echo "  ./run.sh test"
    echo "  ./run.sh build"
    echo ""
}

# Verificar si Node.js está instalado
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js no está instalado${NC}"
        echo "Descárgalo desde: https://nodejs.org/"
        exit 1
    fi
    echo -e "${GREEN}✓ Node.js encontrado: $(node --version)${NC}"
}

# Verificar y instalar dependencias
install_deps() {
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
        npm install
        echo -e "${GREEN}✓ Dependencias instaladas${NC}"
    fi
}

# Comandos
dev() {
    echo -e "${BLUE}🚀 Iniciando servidor de desarrollo...${NC}"
    install_deps
    npm run dev
}

test_cmd() {
    echo -e "${BLUE}🧪 Ejecutando tests (una sola vez)...${NC}"
    install_deps
    npm test
}

test_watch() {
    echo -e "${BLUE}🧪 Ejecutando tests en modo watch...${NC}"
    install_deps
    npm run test:watch
}

build_cmd() {
    echo -e "${BLUE}🔨 Compilando para producción...${NC}"
    install_deps
    npm run build
}

preview_cmd() {
    echo -e "${BLUE}👁️ Vista previa del build...${NC}"
    install_deps
    npm run preview
}

check_cmd() {
    echo -e "${BLUE}✓ Verificando tipos TypeScript...${NC}"
    install_deps
    npm run check
}

install_cmd() {
    echo -e "${BLUE}📦 Instalando dependencias...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencias instaladas${NC}"
}

# Main
check_node

case "${1:-help}" in
    dev)
        dev
        ;;
    test)
        test_cmd
        ;;
    test:watch)
        test_watch
        ;;
    build)
        build_cmd
        ;;
    preview)
        preview_cmd
        ;;
    check)
        check_cmd
        ;;
    install)
        install_cmd
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando desconocido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
