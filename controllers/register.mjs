
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
        // database.users.push({
        //     id: Date.now(),
        //     name: name,
        //     email: email,
        //     password: hash,
        //     entries: 0,
        //     joined: new Date()
        // })
        // res.json(database.users[database.users.length - 1])
    });
}

export { handleRegister }