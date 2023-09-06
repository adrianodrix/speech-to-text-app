require('dotenv').config()

const express = require('express');
const cors = require('cors');

const textToSpeechRoute = require('./text-to-speech');
const speechToTextRoute = require('./speech-to-text');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Whisper Text-to-Speech API!');
});

app.use('/api', textToSpeechRoute);
app.use('/api', speechToTextRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});