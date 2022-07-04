let cart = {}; 

$.getJSON('api/goods', function (data) {
    const goods = data; 
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); 

    function showCart() {
        if ($.isEmptyObject(cart)) {
            //empty
            const out = '<h1 id = "empty">Empty</h1>';
            $('#my-cart').html(out);
        }
        else {
            let out = '';
            
            for (let key in cart) {
                //console.log(goods);
                //console.log(goods[key].id);
                for(let i=0; i<goods.length; i++)
                {
                if(key == goods[i].id){
                    out+='<div class="single-cart">';
                    out += '<button class="delete" data-art="' + goods[i].id + '" >x</button>';
                    out += '<img src="' + goods[i].img + '" width="48"><br><br>';
                    out += goods[i].name;
                    out += '<br><button class="minus" data-art="' + goods[i].id + '">-</button>';
                    out += cart[key];
                    out += '<button class="plus" data-art="' + goods[i].id + '">+</button>';
                    out += '<p class="price">'+cart[key] * goods[i].price + ' UAH</p>';
                    out += '<br>';
                    out+='</div>';
                    
                    break;
                }
                }
            }
            $('#my-cart').html(out);       
            
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);

            $('#btnSubmit').on('mousedown', submitOrder);
        }

        let totalPrice = 0;
        $( 'p.price' ).each(function( index ) {
            totalPrice +=  ($( this ).text()).split(' ')[0] *1 ;
        
        });
        $('#totalPrice').html('Total price: '+totalPrice + ' UAH');
    }

    function submitOrder() {
    
        localStorage.removeItem('cart');
    
        //showCart();
    }

    function plusGoods() {
        const articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); // в localStorage
        showCart();
    }

    function minusGoods() {
        const articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();// в localStorage
        showCart();
    }

    function deleteGoods() {
        const articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();// в localStorage
        showCart();
    }


});

function checkCart() {
    
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}