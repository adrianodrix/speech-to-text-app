const multer = require('multer')
const FormData = require('form-data');
const { Readable } = require('stream');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffmetadata = require('ffmetadata');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const express = require('express');
const router = express.Router();

router.post('/text-to-speech', async (req, res) => {
    try {
      const client = new textToSpeech.TextToSpeechClient();
  
      const { text } = req.body;
  
      // Construct the request
      const request = {
          input: {text: text},
          // Select the language and SSML voice gender (optional)
          voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
          // select the type of audio encoding
          audioConfig: {audioEncoding: 'MP3'},
      };
  
      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);
      
      // Write the binary audio content to a local file
      const writeFile = await util.promisify(fs.writeFile);
      await writeFile('output.mp3', response.audioContent, 'binary');
      
      console.log('Audio content written to file: output.mp3');
  
      res.json({ text }); 
    } catch (error) {
      console.error(error);
      if (error.data) console.error(error.data);
      res.status(500).json({ error: 'Error transcribing audio' });
    }    
});

module.exports = router;