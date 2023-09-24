const express = require('express');
const {PORT} = require('./utils');
const expressApp = require('./express-app');
const database = require('./database');

const StartServer = async () => {
    const app = express();

    await expressApp(app, database);

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();
