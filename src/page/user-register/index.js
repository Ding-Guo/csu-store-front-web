require("./index.css");
require("page/user-login/index.css");
require("page/common/nav-top-simple/index.js");

const _common_util = require("utils/util.js");
const _user_service = require("service/user-service.js");

const errorItem = {
    show: function (errorMsg) {
        $('.user-form-error').show().find('.error-message').text(errorMsg);
    },
    hide: function () {
        $('.user-form-error').hide().find('.error-message').text('');
    }
}

const _user_register = {
    init: function () {
        this.bindEvents();
        return this;
    },
    bindEvents: function () {
        const _this = this;
        $('#submit').on('click', function () {
            _this.submit();
        });
        $('.user-form-item').on('keyup', function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        let formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            confirmPassword  : $.trim($('#confirm-password').val()),
            email           : $.trim($('#email').val()),
            phone           : $.trim($('#phone').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val()),
        };
        const validateResult = this.formDataValidate(formData);

        if (validateResult.status) {
            _user_service.register(formData, function (res) {
                console.log(res);
                window.location.href = _common_util.getURLParam('redirect') || './index.html';
            }, function (errorMsg) {
                errorItem.show(errorMsg);
            });
        } else {
            errorItem.show(validateResult.msg);
        }
    },
    formDataValidate: function (formData) {
        let result = {
            status  : false,
            msg     : '',
        };
        if (!_common_util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_common_util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (!_common_util.validate(formData.confirmPassword, 'require')) {
            result.msg = '重复密码不能为空';
            return result;
        }
        if (formData.confirmPassword !== formData.password) {
            result.msg = '重复密码不一致';
            return result;
        }
        if (!_common_util.validate(formData.email, 'require')) {
            result.msg = '邮箱不能为空';
            return result;
        }
        if (!_common_util.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_common_util.validate(formData.phone, 'require')) {
            result.msg = '电话号码不能为空';
            return result;
        }
        if (!_common_util.validate(formData.phone, 'phone')) {
            result.msg = '电话号码格式不正确';
            return result;
        }
        result.status = true;
        result.msg = '通过验证';
        return result;
    },
};

module.exports = _user_register.init();