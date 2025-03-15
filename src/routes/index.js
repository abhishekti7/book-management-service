const express = require('express');
const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send("Hello world!")
}) 

module.exports = router;