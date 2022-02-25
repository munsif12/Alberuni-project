const fs = require('fs')
const readFileData = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        })
    }
    )
}
module.exports = {
    readFileData
}
