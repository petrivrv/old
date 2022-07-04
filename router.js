const Router = require('express');
const router = new Router();
const models = require('./models/models');
const bodyParser = require('body-parser');

const urlEnc =  bodyParser.urlencoded({extended:false}); 
//====== for UI
router.get('/',  (req,res) => { res.render('index'); });

router.get('/cart',  (req,res) => { res.render('cart'); });


//===== for API   
router.get('/api/shops', async (req,res) => {
    const shop = await models.Shop.findAll();
    res.json( shop);
});

router.get('/api/goods', async (req,res) => {
    const good = await models.Good.findAll();
    res.json( good);
    
});

 router.get('/api/goods/:shopid', async (req,res) => {
    const {shopid}= req.params;
    const good = await models.Good.findAll({where: {shopid}});
    res.json( good);
    
});

router.post('/cart',urlEnc, async (req,res) => {
    const {name,email, phone, address}= req.body;
    console.log(req.body);
     await models.Order.create({name,email, phone, address});
});

module.exports = router;