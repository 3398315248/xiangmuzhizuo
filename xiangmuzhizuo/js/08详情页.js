
//发请求ajax方法
function ajax(method, url, params) {
    return new Promise(function (resolove, reject) {
        //发请求(借助jquery内部封装好的方法来发送请求)
        $.ajax(url, {
            type: method,//请求类型
            data: params,//携带并发给服务器的参数
            success: function (res) {//回调函数，接受服务器返回的数据
                // console.log(res);
                resolove(res);
            },
            error: function (err) {
                reject(err);
            }
        })
    })
}
let sumcont =1
// 取cookie
var goodsId = $.cookie('goodsId');
console.log(goodsId);

// 根据商品编号获得商品详情（商品详情页面）详情页请求
ajax('get', '../goodsAndShoppingCart/getGoodsInfo.php', { 'goodsId': goodsId }).then(function (res) {
    res = JSON.parse(res)
    //  console.log(res);
    $('.box .center').html(`<div class="left">
   <div class="img-box">
       <img src="${res.goodsImg}" alt="">
   </div>
   <div class="jiantou">
       <div class="t">
           <img src="./imgs/01.png" alt="">
       </div>
       <div class="zhong">
           <div><img src="${res.goodsImg}" alt=""></div>
           <div><img src="${res.goodsImg}" alt=""></div>
           <div><img src="${res.goodsImg}" alt=""></div>
           <div><img src="${res.goodsImg}" alt=""></div>
       </div>
       <div class="t">
           <img src="./imgs/02.png" alt="">
       </div>
   </div>
</div>
<div class="right">
   <h1>${res.goodsName}</h1>
   <div class="p">价格 <span>￥${res.goodsPrice}</span></div>
   <div class="size">
       <span>尺码</span>
       <div>${res.beiyong1}</div>
       <div>${res.beiyong2}</div>
   </div>
   <div class="color">
       <span>颜色</span>
       <div>${res.beiyong3}</div>
       <div>${res.beiyong4}</div>
       <div>${res.beiyong5}</div>
   </div>
   <div class="yun">
       <div class="pei">
           <span>配送</span>
           <div>快递寄送</div>
           <div>门店自提</div>
           <div>同城速配</div>
       </div>
       <div class="fei">
           <span>运费</span>
           <span>配送至 上海</span>
           <span>普通快递:￥7</span>
           <span>满100元包邮</span>
       </div>
   </div>
   <div class="count">
       <span>数量</span>
       <div class="jian">-</div>
       <div class="shuzi">1</div>
       <div class="jia">+</div>
       <span>件</span>
   </div>

   <input class="a" type="button" value="加入购物车">
   <input type="button" value="立即购买">

</div>`)

    var count = $('.shuzi').html();
    // console.log(count);
    $(function () {
        // 点击减号数量减一
        $('.box .center').on('click', ".jian", function () {
            console.log($(this));

            console.log(count);
            if (count > 1) {
                count--;
            } else {
                count = 1;
            }
            $('.shuzi').html(count);
        })

        $('.box .center').on('click', ".jia", function () {

            count++;
            sumcont=count
            $('.shuzi').html(count);
        })
        
    })

    
}).catch(function (err) {

});
// 取cookie
let phone=$.cookie('phone');
console.log(phone);

// 发送 添加到购物车 的请求
$('.box .center').on('click', ' input', function () {
    // var name = $.cookie('userlist') ? $.cookie('userlist') : '';
    if (!phone) {
        alert("请先登录账号");
        window.location.href = "./04-验证登录.html"   
    }else{
        ajax(
            'post',
            '../goodsAndShoppingCart/addShoppingCart.php',
            {
                vipName: phone,
                goodsId: goodsId,
                goodsCount: sumcont
            }
        ).then(function(res){
            alert("已加入购物车");
           
        })
    }
                
})

// 点击购物车跳转购物车页面
$('header .center .icon-gouwuche').on('click',function(){
    console.log($(this));
    window.location.href = "./09购物车.html"
})




