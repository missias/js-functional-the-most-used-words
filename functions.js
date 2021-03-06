const fs = require('fs')
const path = require('path')

function appReadDir(myPath) {
    return new Promise((resolve, reject) => {
        try {
            let files = fs.readdirSync(myPath)
            files = files.map(file => path.join(myPath, file))
            resolve(files)
        } catch (e) {
            reject(e)
        }

    })
}


function appReadFile(path) {
    return new Promise( (resolve,reject) => {
        try {
            fs.readFile(path,  {encoding: 'utf-8'}, function (err, content) {
                resolve(content.toString())
            })
        } catch (e) {
            reject(e);
        }
    })
}
function appReadFiles(paths) {
    return Promise.all( 
        paths.map(path => appReadFile(path))
     )
}


function elementsEndedIn(pattern) {
    return function(array) {
        return array.filter(el => el.endsWith(pattern))
    }

}

function mergeElements(array) {
    return array.join(' ')
} 

function breakTextBy(symbol) {
    return function(text) {
        return text.split(symbol)        
    }

}

function removeElementsIfEmpty(array) {
    return array.filter(el =>  el.trim())
}

function removeElementsIfInclude(pattern ) {
    return function(array) {
        return [...array].filter(el =>  !el.includes(pattern))
    }
   
}

function removeElementsIfOnlyNumbers(array) {
    return array.filter(el =>  {
        const num = parseInt(el.trim())
        return num !== num
    })
}

function removeSymbols(symbols) {
    return function(array) {
        return array.map(el => {
            return symbols.reduce((acc, symbol) => {
                return acc.split(symbol).join('')
            }, el)

            /*
            refatoring for reduce 

            let txtwithoutSymbols = el
            symbols.forEach(symbol => {
                txtwithoutSymbols = txtwithoutSymbols.split(symbol).join('')
            });
            return txtwithoutSymbols
            */
        })
    }
}

function groupElementsByWords(words) {
    //Object.values -> return only values of obj ==> {"i've": { element: "i've", quantity: 101 }
    //to --> { element: "i've", quantity: 101 }
    return Object.values(words.reduce((acc, word) => {
        const el = word.toLowerCase()
        const quantity = acc[el] ? acc[el].quantity + 1 : 1
        acc[el] = {element: el, quantity: quantity}
        /*
        if (acc[el]) {
            acc[el] += 1
        } else {
            acc[el] = 1
        }
        */
        return acc
        
    }, {}))

}

/*
asc: order ascending 
desc: order descending
*/
function orderByAttribNumber(attrib , order='asc') {
    return function(array) {
        const desc = (o1, o2) => o1[attrib] - o2[attrib]
        const asc  =  (o1, o2) => o2[attrib] - o1[attrib]
        return array.sort(order === 'asc' ? asc : desc)
    }
}


module.exports = {
    appReadDir,
    appReadFiles,
    elementsEndedIn,
    mergeElements,
    breakTextBy,
    removeElementsIfEmpty,
    removeElementsIfInclude,
    removeElementsIfOnlyNumbers,
    removeSymbols,
    groupElementsByWords,
    orderByAttribNumber

    
}