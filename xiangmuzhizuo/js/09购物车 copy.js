//获取用户
let phone = $.cookie('phone');
var goodsId = $.cookie('goodsId');
// console.log(phone);
// 封装ajax请求
function ajax(method, url, params) {
    return new Promise(function (resolove, reject) {
        //发请求(借助jquery内部封装好的方法来发送请求)
        $.ajax(url, {
            type: method,//请求类型
            data: params,//携带并发给服务器的参数
            success: function (res) {//回调函数，接受服务器返回的数据
                //console.log(res);
                resolove(res);
            },
            error: function (err) {
                reject(err);
            }
        })
    })
}
let countjg = 0;
let count = 0;
// 判断是否登录账号 登录账号发送请求
// 显示购物车 (列表) 的请求
$(function () {
    if (!phone) {
        alert("未登录，请先登录");
        location.href = './02-index.html'
    } else {
        ajax('get', '../goodsAndShoppingCart/getShoppingCart.php', { 'vipName': phone }).then(function (res) {
            // console.log(res);
            render(res);
        })
    }
})

// 封装渲染函数
function render(res) {
    ajax("get", "../goodsAndShoppingCart/getShoppingCart.php", { 'vipName': phone }).then(function (res) {
        var str = $.map(JSON.parse(res), function (item) {
            return `
        <div class="center" id = ${item.goodsId}>
            <div class="input-box" >
                <input type="checkbox">
                <div class="img-box">
                    <img src="${item.goodsImg}" alt="">
                </div>
            </div>
            <span>${item.goodsName}</span>
            <div class="text">
                <p>尺寸：${item.beiyong1}</p>
                <p>颜色规格：${item.beiyong2}</p>
                <p>配送方式：快递配送</p>
            </div>
            <div class="danjia">
                 <span>￥</span>
                 <span class = "p">${item.goodsPrice}</span>
                
            </div>
            <div class="jia">
                <div class = "jian">-</div>
                <div id = "shuzi">${item.goodsCount}</div>
                <div class = "j">+</div>
            </div>
            <div class="zongjia">
            ${item.goodsCount * item.goodsPrice}
            </div>
            <div class="shanchu">
                <div>移入收藏夹</div>
                <div class = "del">删除</div>
            </div>
        </div>`
        }).join('');
        $('.bigbox .shopping').html(str);

        var count = JSON.parse(res).reduce(function (t, i) {
            return t + parseInt(i.goodsCount);
        }, 0);
        $(".last .center .jiesuan .n span").eq(0).html(count);

        var total = JSON.parse(res).reduce(function (t, i) {
            return t + parseInt(i.goodsCount) * parseFloat(i.goodsPrice);
        }, 0);
        $(".last .center .jiesuan .n span").eq(2).html('￥' + countjg);
    })
}


// 点击加减 让总价加减
$('.bigbox .shopping').on('click', ".jian,.j", function () {
    var id = $(this).parent().parent().attr("id");
    var counts = $('#shuzi').text();
    console.log(counts);
    var price = $(this).parent().siblings('.danjia').find('.p').html();
    if (this.className == "jian") {
        counts == 1 ? alert('数量已经最低了，不能减了') : counts--;
    } else if (this.className == "j") {
        counts++;
    }
    $(this).siblings('.shuzi').html(counts);
    $(this).parent().siblings(".zongjia").html("￥" + price * counts);
    ajax('get', '../goodsAndShoppingCart/updateGoodsCount.php', { 'vipName': phone, 'goodsId': id, 'goodsCount': counts }).then(function (res) {

    })
    render();
})

// 点击复选框
$('.bigbox .shopping').on('click', ".input-box input", function () {
    let dan = $(this).parent().siblings('.zongjia').html();
    let geshu =$('#shuzi').text();
    console.log(geshu);
    
    console.log(dan);
    if(this.checked){
        countjg =Number(dan)+Number(countjg)
        $(".last .center .jiesuan .n span").eq(2).html('￥' + countjg);
        count =Number(geshu)+Number(count)
        $(".last .center .jiesuan .n span").eq(0).html(count);
    }else{
        countjg =Number(countjg)-Number(dan)
        count =Number(count)-Number(geshu)
        $(".last .center .jiesuan .n span").eq(2).html('￥' + countjg);
        $(".last .center .jiesuan .n span").eq(0).html(count);
    }
    console.log(this);
})

// 绑定全选按钮
$('.box .center .input-box input').on('click', function () {
    var inputs = $('.bigbox .shopping .center input');
    if (this.checked) {
        for (let a = 0; a < inputs.length; a++) {
            inputs[a].checked = true
        }
   changge()
      
    } else {
        for (let a = 0; a < inputs.length; a++) {
            inputs[a].checked = false
        }
        countjg=0
        $(".last .center .jiesuan .n span").eq(2).html('￥' + countjg);
    }
})

// 删除商品 发送删除商品的请求
$('.bigbox .shopping').on('click', '.del', function () {

    var id = $(this).parent().parent().attr("id");
    $(this).parent().parent().remove();
    ajax(
        'get',
        '../goodsAndShoppingCart/deleteGoods.php',
        {
            vipName: phone,
            goodsId: id
        }
    ).then(function (res) {


    })
    render();
})

// 点击结算跳转 
$('.last .jiesuan div').on('click',function(){
    location.href = "./10结算.html"
})


function changge(){
    ajax("get", "../goodsAndShoppingCart/getShoppingCart.php", { 'vipName': phone }).then(function (res) {
         countjg = JSON.parse(res).reduce(function (t, i) {
            return t + parseInt(i.goodsCount) * parseFloat(i.goodsPrice);
        }, 0);
        $(".last .center .jiesuan .n span").eq(2).html('￥' + countjg);
         count = JSON.parse(res).reduce(function (t, i) {
            return t + parseInt(i.goodsCount);
        }, 0);
        $(".last .center .jiesuan .n span").eq(0).html(count);
    })
   

}
