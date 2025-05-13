FROM node:20-slim

RUN apt-get update && apt-get install -y \
    chromium \
    fonts-thai-tlwg \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx prisma generate

COPY . .

RUN chmod +x /app/docker-entrypoint.sh
CMD ["/app/docker-entrypoint.sh"]
