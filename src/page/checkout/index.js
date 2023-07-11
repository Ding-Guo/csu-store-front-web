require("./index.css");
require("page/common/nav-top/index.js");
require("page/common/nav-search/index.js");

const checkoutTemplate = require("./index.string");

const _common_util = require("utils/util.js");
const _order_service = require("service/order-service.js");

const _address = require("page/address/index.js");
const errorItem = {
    show : function(errorMsg){
        $('.user-form-error').show().find('.error-message').text(errorMsg);
    },
    hide : function(){
        $('.user-form-error').hide().find('.error-message').text('');
    }
};
const _checkout = {
    init: function () {
        this.onLoad();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {
        const _this = this;

        $(document).on("click", ".checkout-btn", function () {
            _this.createOrder();
        });
    },
    onLoad: function () {
        this.loadCheckout();
    },
    loadCheckout: function () {
        let checkoutHtml = "";
        const $checkoutContent = $(".checkout-content");
        const _this = this;

        _order_service.getSelectedCartItemList(function (res) {
            console.log(res.data);
            checkoutHtml = _common_util.renderHTML(checkoutTemplate, res);
            $checkoutContent.html(checkoutHtml);

            _this.loadAddress();
        }, function (errorMsg) {
            _common_util.errorTips(errorMsg);
        });
    },
    loadAddress: function () {
        _address.init($(".address-list-wrapper"));
    },
    createOrder: function () {
        let addressId = $(".address-list-item.active").data("id");
        if (!_common_util.validate(addressId,'require')){
            _common_util.errorTips('地址不能为空')
        }else {
            _order_service.createOrder(JSON.stringify({
                addressId: addressId
            }), function (res) {
                window.location.href = "./order-info.html?orderNo=" + res.orderNo;
            }, function (errorMsg) {
                _common_util.errorTips(errorMsg);
            });
        }

    }
};

$(function(){
    _checkout.init();
});
