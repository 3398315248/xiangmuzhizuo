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
        location.href = './03-登录.html'
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
                <input type="checkbox" checked>
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
                ￥
                 <span class = "p">${item.goodsPrice}</span>
                
            </div>
            <div class="jia">
                <div class = "jian">-</div>
                <div id = "shuzi">${item.goodsCount}</div>
                <div class = "j">+</div>
            </div>
            <div class="zongjia">￥
            <span> ${item.goodsCount * item.goodsPrice}</span>
            </div>
            <div class="shanchu">
                <div>移入收藏夹</div>
                <div class = "del">删除</div>
            </div>
        </div>`
        }).join('');
        $('.bigbox .shopping').html(str);
        changge2()
    })
}


// 点击加减 让总价加减
$('.bigbox .shopping').on('click', ".jian,.j", function () {

    var id = $(this).parent().parent().attr("id");//ok
    var counts = this.parentElement.children[1].innerHTML;//ok?
    var price = $(this).parent().siblings('.danjia').find('.p').html();//ok
    if ($(this).html() == "-") {//ok
        counts == 1 ? alert('数量已经最低了，不能减了') : counts--;
    } else if ($(this).html() == "+") {
        counts++;
    }
    this.parentElement.children[1].innerHTML = counts;
    $(this).parent().siblings(".zongjia").children().eq(0).html( price * counts);
    ajax('get', '../goodsAndShoppingCart/updateGoodsCount.php', { 'vipName': phone, 'goodsId': id, 'goodsCount': counts }).then(()=> {
        changge2()
    })
})

// 点击复选框
$('body').on('change', "input", function () {
    changge2();
})

// 绑定全选按钮
$('.box .center .input-box input').on('click', function () {
    var inputs = $('.bigbox .shopping .center input');

        for (let a = 0; a < inputs.length; a++) {
            inputs[a].checked = this.checked;
         }
        changge2();
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





function changge2(){
    var allmoney = 0;
    var allconut = 0;
    [...$('.zongjia')].forEach(function(item){
        if(item.parentElement.children[0].children[0].checked){
            allmoney += Number(item.children[0].innerText);
            allconut += Number(item.parentElement.children[4].children[1].innerText);
        }; 
    });
    
    $(".last .center .jiesuan .n span").eq(2).html('￥' + allmoney);
    $(".last .center .jiesuan .n span").eq(0).html(allconut);    
}