const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('public')); 

app.post('/save-data', (req, res) => {
    const data = req.body;
    const jsonContent = JSON.stringify(data, null, 2);

    fs.writeFile(path.join(__dirname, '/db/events.json'), jsonContent, (err) => {
        if (err) {
            console.error('Erro ao salvar arquivo:', err);
            res.status(500).send('Erro ao salvar dados.');
        } else {
            res.send('Dados salvos com sucesso!');
        }
    });
});
app.post('/save-user', (req, res) => {
    const data = req.body;
    const jsonContent = JSON.stringify(data, null, 2);

    fs.writeFile(path.join(__dirname, '/db/user.json'), jsonContent, (err) => {
        if (err) {
            console.error('Erro ao salvar arquivo:', err);
            res.status(500).send('Erro ao salvar dados.');
        } else {
            res.send('Dados salvos com sucesso!');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
