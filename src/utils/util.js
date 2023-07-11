const Hogan = require('hogan.js');
const region = require("data/pca.json");

// const config = {
//     serverHost : 'http://127.0.0.1:8081',
// }
const config = {
    serverHost : '/mall',
}
const _common_util = {
    //向服务器发送请求

    request : function(param){
        const _this = this;

        $.ajax({
            headers:{
                "Authorization" :localStorage.getItem("token")
            },
            type     : param.method || 'GET',
            url      : param.url || '',
            dataType : param.type || 'JSON',
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
        window.location.href = '/view/user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    toRegister : function(){
        window.location.href = '/view/user-register.html?redirect=' + encodeURIComponent(window.location.href);
    },
    toMain: function () {
        window.location.href = "./index.html";
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
    },
    getStatusDesc: function (status) {
        let statusDesc = "";
        switch (status) {
            case 1:
                statusDesc = "已取消";
                break;
            case 2:
                statusDesc = "未付款";
                break;
            case 3:
                statusDesc = "已付款";
                break;
            case 4:
                statusDesc = "已发货";
                break;
            case 5:
                statusDesc = "交易成功";
                break;
            case 6:
                statusDesc = "交易关闭";
                break;
            default:
                statusDesc = "未知状态";
        }
        return statusDesc;
    },
    // 获取付款方式的中文描述
    getPaymentTypeDesc: function (paymentType) {
        let paymentTypeDesc = "";
        switch (paymentType) {
            case 1:
                paymentTypeDesc = "支付宝";
                break;
            case 2:
                paymentTypeDesc = "微信支付";
                break;
            default:
                paymentTypeDesc = "其他方式";
        }
        return paymentTypeDesc;
    },
    //使用hogan.js渲染数据到网页上
    renderHTML : function(htmlTemplate, data){
        const template = Hogan.compile(htmlTemplate);
        const result = template.render(data);
        return result;
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || '出错啦～～～');
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功～～～');
    },
    getRegionData: function (province, city, district) {
        let result = {
            provinces: [],
            cities: [],
            districts: [],
        };

        // 获取省份信息
        for (const key in region) {
            if (Object.hasOwnProperty.call(region, key)) {
                result.provinces.push({
                    name: key,
                    selected: key === province,
                });
            }
        }
        if (!province) {
            return result;
        }

        // 获取城市信息
        let currentProvince = region[province];
        for (const key in currentProvince) {
            if (Object.hasOwnProperty.call(currentProvince, key)) {
                result.cities.push({
                    name: key,
                    selected: key === city,
                });
            }
        }
        if (!city) {
            return result;
        }

        // 获取区县信息，最后一级的数据格式为数组
        let currentCity = currentProvince[city];
        for (const key in currentCity) {
            if (Object.hasOwnProperty.call(currentCity, key)) {
                result.districts.push({
                    name: currentCity[key],
                    selected: currentCity[key] === district,
                });
            }
        }
        return result;
    },
};

module.exports = _common_util;