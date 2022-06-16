/* /* 头部导航区域：点击跳转页面 */
var current_index = 0;
var sps = $('header .center span');
$('header .center span').on('click', function () {
    console.log(this);
    $(this).addClass('active');
    current_index = [...sps].indexOf(this);
    console.log(current_index);
    sps.parent().children(".active").removeClass("active");
    sps.eq(current_index).addClass('active');

    
    
    
})
$('header .center .d').on('click',function(){
    window.location.href="./03-登录.html";
})
$('section .center .active').on('click',function(){
    window.location.href="./03-登录.html";
})
$('section .center .pass').on('click', function () {
    window.location.href = "./04-验证登录.html";
})

$('section .center .ce').on('click', function () {
    window.location.href = "./05-注册.html";

})
$('header .center .img-box').on('click', function () {
    window.location.href = "./02-index.html";
})

