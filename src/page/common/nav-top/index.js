require('./index.css');

const _common_util = require('utils/util.js');
const _user_service = require('service/user-service.js');
const _cart_service = require('service/cart-service.js')
const _nav_top = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function () {
        //登录点击事件
        $('.js-login').on('click', function(){
            _common_util.toLogin();
        });
        $('.js-register').on('click', function(){
            _common_util.toRegister();
        });
        $('.js-logout').on('click', function () {
            _user_service.logout(function (res) {
                console.log(res);
            }, function (errorMsg) {
                console.log(errorMsg);
            });
            _common_util.toMain();
        });
    },

    loadUserInfo : function (){
        _user_service.getUserInfo(function (res){
            console.log(res);
            $('.user.not-login').hide()
                .siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function (errorMsg){
            // console.log(errorMsg);
        });
    },
    loadCartCount : function (){
        _cart_service.getCartCount(function (res){
            console.log(res);
            // // $('.user.not-login').hide()
            // //     .siblings('.user.login').show()
            // //     .find('.username').text(res.username);
            // $.find('.cart-count').text(res)
        }, function (errorMsg){
            // console.log(errorMsg);

        });
    }
};

module.exports = _nav_top.init();