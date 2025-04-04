# payment-handler

A simple webserver with 1 handle to handle payments.

On startup creates database `payment` with table `user` and 1 user with id `0`.

Make a payment with `/payment` route POST request

## Example

```bash
curl --request POST \
  --url http://localhost:3000/payment \
  --header 'content-type: application/json' \
  --data '{
  "id": 0,
  "amount": -1
}'
```

## How to run

```bash
npm install --omit=dev
npm run start
```

or with Docker

```bash
docker compose up --build
```
