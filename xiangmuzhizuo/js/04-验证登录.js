var userlist = $.cookie('userlist') ? JSON.parse($.cookie('userlist')) : [];
//给button绑定点击事件
$('main .center .box .button .c input[type = button]').on('click', function () {
    //获取input的值
    var phone = $('main .box input').eq(0).val();
    var pass = $('main .box input').eq(1).val();
    $.cookie('phone', JSON.stringify(phone));
    $.post(
        '../goodsAndShoppingCart/login.php',
        {
            'username': phone,
            'userpass': pass
        }, function (data) {
            console.log(data);
            if ("success" == data.trim()) {
                // console.log(name);
                alert("登录成功");
                window.location.href = "./02-index.html";

                //弹框后input值为空
                $('main .box input').eq(0).val('');
                $('main .box input').eq(1).val('');
                
            } else {
                alert("登录失败")
                $('main .box input').eq(0).val('');
                $('main .box input').eq(1).val('');
            }
            
        }
        
    )
})



