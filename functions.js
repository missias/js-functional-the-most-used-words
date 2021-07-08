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
        paths.map(path => lerArquivo(path))
     )
}


function elementsEndedIn(pattern) {
    return function(array) {
        return array.filter(el => el.endsWith(pattern))
    }

}

module.exports = {
    appReadDir,
    appReadFiles,
    elementsEndedIn
}