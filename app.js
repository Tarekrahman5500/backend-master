const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const  morgan = require('morgan');
const mongoose = require('mongoose');
const port = 3000;
require('dotenv/config');
//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(()=>
    {console.log('DB is connoted')
})
    .catch((err) => {
        console.log(err);
    })

app.listen(port, () => {
    console.log(api);
    console.log(`Example app listening at http://localhost:${port}`);
})
