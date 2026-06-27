#!/bin/bash

# Docker Optimization Script for giftoryth

echo "🚀 Optimizing Docker Build Process..."

# Function to show help
show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  fast     - Fast build (use cache, no rebuild)"
    echo "  rebuild  - Full rebuild (slow but clean)"
    echo "  dev      - Development mode (fastest)"
    echo "  prod     - Production build (optimized)"
    echo "  clean    - Clean everything and rebuild"
    echo "  help     - Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 fast     # Fastest - use existing images"
    echo "  $0 dev      # Development mode with hot reload"
    echo "  $0 prod     # Production build using docker-compose.yml"
}

# Function for fast build (use cache)
fast_build() {
    echo "⚡ Fast build - using cache..."
    docker compose up -d
}

# Function for development mode
dev_build() {
    echo "🔧 Development mode..."
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
}

# Function for production build
prod_build() {
    echo "🏭 Production build..."
    docker compose build
    docker compose down
    docker compose up -d
}

# Function for clean rebuild
clean_build() {
    echo "🧹 Cleaning everything..."
    docker compose down --volumes --remove-orphans
    docker system prune -f
    docker compose build
    docker compose down
    docker compose up -d
}

# Function for full rebuild
rebuild() {
    echo "🔄 Full rebuild..."
    docker compose up -d --build
}

# Main script logic
case "${1:-help}" in
    "fast")
        fast_build
        ;;
    "dev")
        dev_build
        ;;
    "prod")
        prod_build
        ;;
    "clean")
        clean_build
        ;;
    "rebuild")
        rebuild
        ;;
    "help"|*)
        show_help
        ;;
esac

echo "✅ Done!"
