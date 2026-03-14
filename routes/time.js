const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const currentTime = new Date().toString();
    res.json({ time: currentTime });
});

module.exports = router;