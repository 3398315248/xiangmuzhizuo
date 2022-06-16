let type=$.cookie('type')
Number(type)
console.log(type);
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
var ajaxarr=[];

// 获得某种商品类型的所有商品 的请求
ajax('get', '../goodsAndShoppingCart/getGoodsList.php',{typeId:type}).then(function (res) {      
    var str = $.map(JSON.parse(res), function (item) {
        return `<div class='goods'>
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
    $('.list .center').html(str);

    // 点击商品，跳转到商品详情，保存id到cookie
    $('.list .center').on('click','.goods',function(){
        // 获取下标
        var index = $(this).index();

        // 获取id
        var id = (JSON.parse(res))[index].goodsId;
        console.log(id);
        window.location.href = "./08详情页.html";   
        // 把id存入cookie
        $.cookie('goodsId',id,{expires:7});
    })
     
})









