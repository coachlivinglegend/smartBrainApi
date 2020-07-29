
const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(404).json('error loggin in'))
        } else {
            res.status(404).json('error loggin in')
        }
    })
    .catch(err => res.status(404).json('error loggin in'))
    // for (let user of database.users) {
    //     if (email === user.email && bcrypt.compareSync(password, user.password)) {
    //         const thisUser = {
    //             id: user.id,
    //             name: user.name,
    //             entries: user.entries
    //         }
    //         return res.json(thisUser);
    //     }
    // }
    // return res.status(404).json("error loggin in")
}

export {handleSignIn}