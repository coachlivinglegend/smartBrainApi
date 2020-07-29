import Clarifai from 'clarifai'

const app = new Clarifai.App({
    apiKey: '2ea72e65bcba44f8a81ef35b4bff5c01'
});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleScoreIncrement = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries.length) {
            res.json(entries[0])
        } else {
            res.status(400).json('unable to get entries')
        }
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

export { handleScoreIncrement, handleApiCall }