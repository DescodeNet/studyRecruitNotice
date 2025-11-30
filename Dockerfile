# ================================
# Stage 1: Build
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 캐싱을 위해 package 파일 먼저 복사
COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# ================================
# Stage 2: Production (Nginx)
# ================================
FROM nginx:alpine

# Nginx 설정 복사
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사 (Vite: dist 폴더)
COPY --from=builder /app/dist /usr/share/nginx/html

# 헬스체크
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
