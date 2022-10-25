const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Routes
const testRoutes = require('./_routes/test.route');
const companyRoutes = require('./_routes/company.route');
const communityRoutes = require('./_routes/community.route');
const authRoutes = require('./_routes/auth.route');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/community', communityRoutes);

module.exports = app;