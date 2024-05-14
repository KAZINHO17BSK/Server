const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doacoes_agua'
});

connection.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/doar', (req, res) => {
  const { nome, email, quantidade_litros } = req.body;
  const sql = 'INSERT INTO doacoes (nome, email, quantidade_litros) VALUES (?, ?, ?)';
  connection.query(sql, [nome, email, quantidade_litros], (err, results) => {
    if (err) throw err;
    res.send('Doação registrada com sucesso!');
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'iagenn94@gmail.com', // Altere para o seu endereço de e-mail
        pass: '13052004ca' // Altere para a sua senha
      }
    });

    let mailOptions = {
      from: 'iagenn94@gmail.com',
      to: email,
      subject: 'Nova Doação de Água',
      text: `Recebemos uma nova doação de ${quantidade_litros} litros de ${nome}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
