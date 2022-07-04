const express = require('express');
const path = require('path');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./router');
const cors = require('cors');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create( {defaultLayout: 'main', extname: 'hbs' } );
app.engine('hbs', hbs.engine );
app.set('view engine', 'hbs');
app.set('views', 'views' ); 

app.use(express.static(path.resolve(__dirname,'static')) );
app.use(cors());
app.use(express.json());
app.use(router);


const startServer = async  () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,  () => { console.log("server started..."); });
    }
    catch(e){
        console.log(e);
    }
    
}

startServer();



