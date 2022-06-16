
// 鼠标滑过时,让盒子出现,
$(".b0").mouseover(function () {
    $(".b1").css({
        display: "block",
        display: "flex"
    })
    $(".b1>div").css({
        fontSize: "20px",
        color: "yellow"
    })
})
// $(".b0").mouseout(function(){
//     $(".b1").css({
//         display:"none"
//     })
// })
// 鼠标滑过b1时让b1划出
$(".b1").mouseout(function () {
    $(".b1").slideUp(8000)
})

// 当鼠标滑过b1时让b1淡出
$(".b1").mouseout(function () {
    $(".b1").fadeOut(5000)
})

// 鼠标滑过b1下的div时让a字体颜色变成绿色
$(".b1>div").mouseover(function () {
    $(".b1>div>a").css({
        color: "green"
    })
})


// $(".input-box").mouseover(".b00")(function(){
//    $(".b00").css({
//      display:"block",
//    })
// })
// $(".input-box").mouseout(".b00")(function(){
//     $(".b00").css({
//         display:"none",
//     })
// })

$(".input-box").mouseover(function () {
    $(".b00").css({
        display: "block",
    })
})

$(".input-box").mouseout(function () {
    $(".b00").css({
        display: "none",
    })
})
// 头尾自动分离
// $("header").load("header.html");


//发请求ajax方法
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

// 发送获取最新商品的请求
ajax('get', '../goodsAndShoppingCart/getGoodsListNew.php', { typeld: '女士服装', count: 8 }).then(function (res) {

    // console.log(res);
    var str = $.map(JSON.parse(res), function (item) {
        return `<div class="box">
        <div class="img-box">
            <img src="${item.goodsImg}" alt="">
        </div>
        <div class="text">
            <p>${item.goodsName}</p>
            <div class="wenzi">
                <span>￥${item.goodsPrice}</span>
                <span>月销量${item.goodsDesc}</span>
            </div>
        </div>
    </div>`
    }).join('');
    $('.new .center').html(str);
})

// 轮播图
function lunbo() {
    /* 轮播图区域 */
    var current_index = 0;
    var imgs = $('.swiper .center .container img');
    var spans = $('.swiper .center .indicator span');
    var timerid = null;

    autoPlay();

    //点击左箭头，显示上一张图片
    $(".swiper .center .left").on('click', function () {
        current_index--;
        if (current_index < 0) {
            current_index = imgs.length - 1;
        }
        changePic();
    })
    //点击右箭头，显示下一张图片
    $(".swiper .center .right").on('click', function () {
        current_index++;
        if (current_index > imgs.length - 1) {
            current_index = 0;
        }
        changePic();
    })

    //鼠标移入轮播图，暂停轮播
    $('.center').on('mouseover', function () {
        clearInterval(timerid);
    })
    //鼠标移出轮播图，继续轮播
    $('.center').on('mouseout', function () {
        autoPlay();
    })

    //点击小圆点，显示图片
    spans.on('click', function () {
        console.log("点击了span");
        current_index = [...spans].indexOf(this); /* 获取当前点击的小圆点的位置 */
        current_index = $(this).index();/* 获取当前点击的小圆点的位置 */
        changePic();
    })

    //自动轮播
    function autoPlay() {
        timerid = setInterval(function () {
            current_index++;
            if (current_index > imgs.length - 1) {
                current_index = 0;
            }
            changePic();
        }, 1000)
    }
    //切换图片
    function changePic() {
        //让当前显示的图片隐藏
        imgs.parent().children(".active").removeClass("active");
        //让下一张图片显示
        imgs.eq(current_index).addClass('active');

        //让当前高亮的小圆点 取消高亮
        spans.parent().children(".active").removeClass("active");
        //让对应小圆点高亮
        spans.eq(current_index).addClass("active");
    }
}

//发送轮播图请求
$.ajax('../goodsAndShoppingCart/bannerGet.php', {
    type: 'GET',//请求类型
    success: function (res) {//回调函数，接受服务器返回的数据
        var temparr = JSON.parse(res);
        $('.container').html($.map(temparr, function (item, index) {
            if (index == 0) {
                return `
                <img class="active" src="${item.img}" alt="">
                `
            } else {
                return `
            <img src="${item.img}" alt="">
            `}
        }).join(''));

        var spanstr = temparr.map(function (item, index) {
            return `<span class="${index == 0 ? 'active' : ''}"></span>`;
        }).join('');
        $('.indicator').html(spanstr)

        lunbo();
    }
});

//发送商品分类请求
ajax('get','../goodsAndShoppingCart/getGoodsType.php').then(function(res){
    var str = $.map(JSON.parse(res), function (item) {
        return `
        <div class="small a">
        <div class="img-box">
            <img src="${item.img}" alt="">
        </div>
        <div class="text">${item.goodsType}</div>
    </div>
        `
    }).join('');
    $('.big .center .box .zahuo').html(str);
    // console.log(res);

})
//点击一个类型让它跳转到当前类型
$('.big .center .box .zahuo').on('click', '.a',function () {
    // var index = $(this).index();
let type =0
    if($(this)[0].innerText=='女士服装'){
        type = 1;
    }else{
        type = 2;
    }
    $.cookie('type', JSON.stringify(type));
    window.location.href = './07购物页面.html'
})

// 判断是否已登录
var phone = $.cookie('phone');
console.log(phone);
if(phone != ''){

    var yonghu = $('header .center .d').html(phone);
    console.log(yonghu)

}

