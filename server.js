/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');

const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

// eslint-disable-next-line import/no-named-as-default-member
app.use(express.static('dist'));

app.get('/*', (request, response) => {
  // eslint-disable-next-line unicorn/prefer-module
  response.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://127.0.0.1:${PORT}`);
});
