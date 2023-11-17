const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve Angular app
app.use(express.static(path.join(__dirname, 'designio','dist','designio', 'browser')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'designio','dist','designio', 'browser', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
