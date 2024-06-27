require('dotenv').config();
const http = require('http');
const app = require('./app');
const cors = require('cors');

const port = process.env.PORT || '9000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});