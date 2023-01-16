//const handleSignIn = (req, res, db, bcrypt) => {
const handleSignIn = (db, bcrypt) => (req, res) => {
    // check input with current list of users & if passwords match
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Please provide login credentials.");
    }
    
    // Load hash from your password DB.
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            // console.log(data[0]);
            //bcrypt.compare(req.body.password, data[0], function(err, res) {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            // console.log("isValid:", isValid);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.status(200).json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            res.status(400).json('unable to sign in - wrong credentials')
        })
        .catch(err => res.status(400).json('unable to sign in'))
}

module.exports = {
    handleSignIn: handleSignIn
};