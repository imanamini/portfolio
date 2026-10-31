FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY server.mjs ./
ENV NODE_ENV=production PORT=8080 DATA_DIR=/data \
    NODE_OPTIONS=--max-old-space-size=48
EXPOSE 8080
# Runs as root so it can write to whatever volume Darkube mounts at /data
CMD ["node", "server.mjs"]
