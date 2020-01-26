const express = require('express');
const enhancedRouter = require('express-enhanced-router');
const app = express();
const router = express.Router();

app.use('/api', enhancedRouter(router, 'api'));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});