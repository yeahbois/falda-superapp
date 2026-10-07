const path = require('path');
const express = require('express');
const { createRequestHandler } = require('@expo/server/adapter/express');

const app = express();
const port = process.env.PORT || 3000;

const clientDir = path.join(__dirname, 'dist', 'client');
const serverDir = path.join(__dirname, 'dist', 'server');

// Serve static assets from dist/client
app.use(express.static(clientDir, { maxAge: '1y', index: false }));

// Handle all dynamic SSR and API route requests with Expo Router
app.all('*', createRequestHandler({
  build: serverDir,
}));

app.listen(port, () => {
  console.log(`> Expo Server running at http://localhost:${port}`);
});
