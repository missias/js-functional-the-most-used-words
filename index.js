const path = require('path')
const fn = require('./functions')

const caminho =  path.join(__dirname, 'subtitles')

fn.appReadDir(caminho)
    .then(fn.elementsEndedIn('srt'))
    .then(fn.lerArquivos)
    .then(console.log)