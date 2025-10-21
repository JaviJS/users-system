docker run --rm -v $(pwd)/app:/app -w /app node:20 npm install
docker run --rm -v $(pwd)/app:/app -w /app node:20 npm run build
