const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id}) // can do this because property & value are the same
//        id: id
//    })
        .then(user => {
            if (user.length) {
                res.status(200).json(user[0]);
            } else {
                res.status(400).json('Error getting user.');
            }
        });
}

module.exports = {
    handleProfile: handleProfile
};