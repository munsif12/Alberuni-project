const fs = require('fs')
const writeDataToFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(fileName, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve("user added");
                }
            })
        } catch (error) {
            console.log('error', error.message)
        }
    })
}
module.exports = {
    writeDataToFile
}
