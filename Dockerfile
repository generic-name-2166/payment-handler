FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev

# ENV POSTGRES_HOST="payment-postgres"

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
