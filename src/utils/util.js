
const config = {
    serverHost : 'http://localhost:8090',
}

const _common_util = {
    //向服务器发送请求
    request : function(param){
        const _this = this;
        $.ajax({
            type     : param.method || 'GET',
            url      : param.url || '',
            dataType : param.type || 'json',
            contentType : param.contentType || 'application/json',
            data     : param.data || '',
            xhrFields: {
                withCredentials: true
            },
            timeout  : 3000,
            success  : function(res){
                //请求成功，且服务器返回0
                if( 0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.message);
                }
                //请求成功，服务器返回1，表示错误
                else if( 1 === res.status){
                    typeof param.error === 'function' && param.error(res.message);
                }
                //请求成功，服务器返回10，表示参数错误
                else if( 10 === res.status){
                    typeof param.error === 'function' && param.error(res.message);
                }
                //请求成功，服务器返回11，表示需要登录
                else if( 11 === res.status){
                    _this.toLogin();
                }
            },
            error    : function(err){
                //请求失败，服务器返回HTTP状态码不是200
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //跳转统一登录页面
    toLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //获取服务器请求地址
    getServerURL : function(path){
        return config.serverHost + path;
    },
    //页面跳转时获取URL中的参数
    getURLParam : function(name){
        //http://localhost:8099/aaa?a=1&b=2
        const paramString = window.location.search.substring(1);
        const regExp = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        const result = paramString.match(regExp);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //字段校验，支持字符串非空校验(require)、手机格式校验(phone)、邮箱格式校验(email)
    validate : function (value, type){
        value = $.trim(value);
        if('require' === type){
            return !!value;
        }
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        if('email' === type){
            return /^\w+([-+.]\w+)*@\w+([-.]\ w+)*\.\w+([-.]\w+)*$/.test(value);
        }
    }
};

module.exports = _common_util;