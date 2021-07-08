const path = require('path')
const fn = require('./functions')

const caminho =  path.join(__dirname, 'subtitles')

const symbols = [
    '.', '?', '-', ',', '"',
    '♪', '_', '<i>', '</i>', '\r',
    '[', ']', '(', ')'
]

fn.appReadDir(caminho)
    .then(fn.elementsEndedIn('srt'))
    .then(fn.appReadFiles)
    .then(fn.mergeElements)
    .then(fn.breakTextBy('\n'))
    .then(fn.removeElementsIfEmpty)
    .then(fn.removeElementsIfInclude('-->'))
    .then(fn.removeElementsIfOnlyNumbers)
    .then(fn.removeSymbols(symbols))
    .then(fn.mergeElements)
    .then(fn.breakTextBy(' '))
    .then(fn.removeElementsIfEmpty)
    .then(fn.removeElementsIfOnlyNumbers)
    .then(fn.groupElementsByWords)
    .then(fn.orderByAttribNumber('quantity','desc'))
    .then(console.log)