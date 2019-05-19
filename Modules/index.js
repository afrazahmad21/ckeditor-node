var express = require('express');
var router = express.Router();
const Editor = require('./Model');
var upload = multer({dest: 'uploads/'})


router.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to CK-EDITOR APi"})
})

router.post('/save', async (req, res) => {
    try {
        const editor = await Editor.find();
        const {data} = req.body;
        if (editor.length) {
            editor[0].data = data;
            editor[0].updatedAt = new Date();
            editor[0].save();
        } else
            await Editor.create(req.body)
        res.status(200).json({message: "Saved Successfully"})
    } catch (err) {
        console.log(err)
        res.status(200).json({message: err.toString()})
    }
});

router.get('/view', async (req, res) => {
    const editor = await Editor.findOne({})
    res.status(200).json({editor})
})

router.post('/upload', upload.single('file'), async (req, res) => {
    res.status(200).json({message: "uploaded successfully"})
})
module.exports = router;
