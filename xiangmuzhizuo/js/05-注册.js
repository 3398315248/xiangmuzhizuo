var userlist = $.cookie('userlist') ? JSON.parse($.cookie('userlist')) : [];

//给button绑定点击事件
$('main .box .button .c input[type=button]').on('click', function () {
    //console.log($('main .box .button input[type=button]'));
    //分别获取每个input的值
    var phone = $('main .box input').eq(0).val();
    var pass = $('main .box input').eq(1).val();
    var queren = $('main .box input').eq(2).val();
console.log(userlist);
    var phone_reg = /^1[3-9]\d{9}$/;
    var pass_reg = (/(?![\d]+$)(?![a-zA-Z]+$)(?![\da-zA-Z]+$).{6,20}$/);
    //如果有email，pass和phone的话执行里面的语句
    if (phone_reg.test(phone)==true && pass_reg.test(pass)==true && queren == pass) {
        $.post(
            '../goodsAndShoppingCart/addUser.php',
            {
                'username': phone,
                'userpass': pass
            }, function (data) {
                console.log(data);
                if(data!="fail"){
                    alert("恭喜您，注册成功！2秒后跳转到登录页面")
                    userlist.push({ phone_reg,pass_reg, queren });
        
                    //把userlist用cookie保存
                    $.cookie('userlist', JSON.stringify(userlist));
                    //让它注册成功后值为空
                    setTimeout(()=>{
                        location.href="./04-验证登录.html";
                    },2000);
                    console.log(setTimeout);
                    
                    $('main .box input').eq(0).val('');
                    $('main .box input').eq(1).val('');
                    $('main .box input').eq(2).val('');
                }else{
                    alert("您的账号已注册")
                }
        
            }
        )      
    }else{
        alert("输入有误,请按照规范填写")
        $('main .box input').eq(0).val('');
        $('main .box input').eq(1).val('');
        $('main .box input').eq(2).val('');
    }
})


