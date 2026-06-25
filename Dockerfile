# =============================================================================
# Replicast AI Hero UI - Docker Image
# =============================================================================
# Multi-stage build for a lightweight Nginx-based static site container.
# The Next.js app is built and exported to static HTML/CSS/JS, then served
# by Nginx for optimal performance.
#
# Build: docker build -t replicast-ai-hero-ui .
# Run:   docker run -p 8080:80 replicast-ai-hero-ui
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build the static site
# -----------------------------------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build the static export
# Note: NEXT_PUBLIC_* vars must be set at build time for static export
ARG NEXT_PUBLIC_BASE_PATH=""
ARG NEXT_PUBLIC_SITE_URL="https://maugus0.github.io/replicast-ai-hero-ui"
ARG NEXT_PUBLIC_APP_VERSION=""

ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_APP_VERSION=${NEXT_PUBLIC_APP_VERSION}

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Serve with Nginx
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static export from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
