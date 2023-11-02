
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/entrada.html');
});

app.get('/sala.html', (req, res) => {
  res.sendFile(__dirname + '/sala.html');
});

app.listen(port, () => console.log(`Executando na porta ${port}!`));
