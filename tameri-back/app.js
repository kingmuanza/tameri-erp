const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Routes
const testRoutes = require('./_routes/test.route');
const companyRoutes = require('./_routes/company.route');
const communityRoutes = require('./_routes/community.route');
const authRoutes = require('./_routes/auth.route');
const employeeRoutes = require('./_routes/employee.route');
const resourceRoutes = require('./_routes/resource.route');
const productRoutes = require('./_routes/product.route');
const productpackRoutes = require('./_routes/productpack.route');
const resourcepackRoutes = require('./_routes/resourcepack.route');
const pricingRoutes = require('./_routes/pricing.route');
const communitytypeRoutes = require('./_routes/communitytype.route');
const companytypeRoutes = require('./_routes/companytype.route');
const producttypeRoutes = require('./_routes/producttype.route');
const resourcetypeRoutes = require('./_routes/resourcetype.route');
const productcategoryRoutes = require('./_routes/productcategory.route');

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
app.use('/companytype', companytypeRoutes);
app.use('/community', communityRoutes);
app.use('/communitytype', communitytypeRoutes);
app.use('/employee', employeeRoutes);
app.use('/pricing', pricingRoutes);
app.use('/product', productRoutes);
app.use('/productcategory', productcategoryRoutes);
app.use('/productpack', productpackRoutes);
app.use('/producttype', producttypeRoutes);
app.use('/resource', resourceRoutes);
app.use('/resourcepack', resourcepackRoutes);
app.use('/resourcetype', resourcetypeRoutes);

module.exports = app;