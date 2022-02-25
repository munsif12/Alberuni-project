const { readFileData } = require('../utilities/readFileData')
const { writeDataToFile } = require('../utilities/writeDataToFile')
exports.stratex = async (req, res) => {
    //getting all users
    let users = await readFileData('data/users.json')
    // return the response
    return res.status(200).json(users);
}

exports.stratexAdd = async (req, res) => {
    try {
        //getting all users
        let users = await readFileData('data/users.json');
        let userExists = false;
        //check for existance of user
        users.forEach(user => {
            if (user.firstName === req.body.firstName) {
                userExists = true;
                return res.status(422).json({ err: "Email already exist" })
            }
        });
        //if user not exists then add user
        if (!userExists) {
            users.push(req.body);
        }
        //writing the new user to the list of users
        await writeDataToFile('data/users.json', users)
        // return the response
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({
            err: err.message,
        });
    }
}

// remove
exports.stratexDelete = async (req, res) => {
    try {
        //getting all users
        let users = await readFileData('data/users.json')
        users = users.filter(user => user.firstName !== req.body.firstName)
        // witing deleted users to the list of users
        await writeDataToFile('data/users.json', users)
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).send("User Delete Failed");
    }
};
