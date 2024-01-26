// Importa e configura as variáveis de ambiente do arquivo .env
require('dotenv').config();

const mongoose = require('mongoose');

// Usa a variável de ambiente para a string de conexão com o MongoDB
const connect = mongoose.connect(process.env.MONGODB_URI);

connect.then(() => {
    console.log('Connected correctly to server');
})
.catch(() => {
    console.log('Error connecting to server');
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('users', LoginSchema);

module.exports = collection;
