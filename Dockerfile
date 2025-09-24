# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Enable corepack agar pnpm bisa dipakai
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency file
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install --force

# Copy semua source code
COPY . .

# Build React (output -> dist/)
RUN pnpm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine3.21

# Hapus default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx.conf kita
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build ke nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
