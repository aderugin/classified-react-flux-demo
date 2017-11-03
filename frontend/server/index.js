const express = require('express');
const proxy = require('express-http-proxy');
const renderReact = require('./render.bundle.js').default;
const app = express();

if (process.env.NODE_ENV === 'develop') {
    app.use('/build', express.static('build'));
}

app.all('/api*', proxy('http://webapp:8000/api'));
app.all('/admin*', proxy('http://webapp:8000/admin'));
app.get('/static*', proxy('http://webapp:8000/static'));
app.get('/media*', proxy('http://webapp:8000/media'));
app.get('*', renderReact);

app.listen(5000, '0.0.0.0', () => {
    console.log('Server listening on 0.0.0.0:5000');
});
