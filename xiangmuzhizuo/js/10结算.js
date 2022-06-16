var userCookie = $.cookie('user') ? JSON.parse($.cookie('user')) : null;
var money = $.cookie('counts') ? JSON.parse($.cookie('money')) : null;

var time = $.cookie('time') ? JSON.parse($.cookie('time')) : null;
let textBox = document.querySelector(".tip");

$('button').on('click',function(){
    $('.img').css({ "opacity": "1", 'display': 'block' });
    $('.img').on('click',function(){
        $('.img').css({ "opacity": "0", 'display': 'none' });

    })
})
