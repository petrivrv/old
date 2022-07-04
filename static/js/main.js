let cart = {}; 
let shopCode = null;

$('document').ready(function(){
    loadShops();
    loadGoods();
    checkCart();
    
});  

function loadShops() {
    
    $.getJSON('api/shops', function (data) {
        //console.log(data);
        let out = '';
        for (let key in data){
            out+='<a class="collection-item" data-shopid="'+data[key].id+'">';
            out+='<strong>'+data[key].name+'</strong>';
            out+='</a>';
        
        }
        $('#shops').html(out);
        $('[data-shopid="1"]').addClass('active');
        $('a.collection-item').on('click', loadGoods);
    
    }); 
}


function loadGoods() {

    let path;
    if( $(this).attr('data-shopid') ){
        $('a.collection-item').removeClass('active');
        $('[data-shopid="'+$(this).attr('data-shopid')+'"]').addClass('active');
        path = 'api/goods/'+$(this).attr('data-shopid');
        shopCode = $(this).attr('data-shopid');
    }
    else {
        path = 'api/goods/1';
        shopCode = '1';
    }
    
    $.getJSON(path, function (data) {
        //console.log(data);
        let out = '';
        for (let key in data){
            out+='<div class="single-goods">';
            out+='<strong>'+data[key].name+'</strong>';
            out+='<p>Price: '+data[key].price+' UAH</p>';
            out+='<img src="'+data[key].img+'">';
            out+='<button class="add-to-cart" data-art="'+data[key].id+'">add to Cart</button>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}


function addToCart() {
    
    if ($.isEmptyObject(cart)) {
        localStorage.removeItem('cart');
    }
    if (localStorage.getItem('cart')) {
        if(localStorage.getItem('shopCode') != shopCode ){
            alert('Users can order products only from one shop');
        }
        else{
            const articul = $(this).attr('data-art');
            if (cart[articul] != undefined) {
                cart[articul]++;
            }
            else {
                cart[articul] = 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart) );
        }
    }
    else {
        localStorage.setItem('shopCode', shopCode);
        const articul = $(this).attr('data-art');
        if (cart[articul] != undefined) {
            cart[articul]++;
        }
        else {
            cart[articul] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart) );

    }
    
    console.log(cart);
}

function checkCart(){
    // check в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

