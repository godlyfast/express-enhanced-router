const express = require('express');
const enhancedRouter = require('express-enhanced-router');
const app = express();
const router = express.Router();

app.use('/api', enhancedRouter(router));

app.listen(3000, () => {
    console.log('READY');
});