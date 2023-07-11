const _common_util = require('utils/util.js');

const _user_service = {
    //获取用户信息

    //用户登录
    login: function (userInfo, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/login'),
            method  : 'POST',
            data    : JSON.stringify(userInfo),
            success : resolve,
            error   : reject
        });
    },
    //用户注册
    register: function (userInfo, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/register'),
            method  : 'POST',
            data    : JSON.stringify(userInfo),
            success : resolve,
            error   : reject
        });
    },
    getForgetQuestion: function (username, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/get_forget_question?username=' + username),
            method  : 'GET',
            success : resolve,
            error   : reject,
        });
    },
    checkForgetQuestion: function (userInfo, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/check_forget_answer'),
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject,
        });
    },
    resetForgetPassword: function (userInfo, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/reset_forget_password'),
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject,
        });
    },
    //更新用户信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/update_user_info'),
            method  : 'POST',
            data    : JSON.stringify(userInfo),
            success : resolve,
            error   : reject
        });
    },
    resetPassword: function (passwordInfo, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/reset_password'),
            method  : 'POST',
            data    : JSON.stringify(passwordInfo),
            success : resolve,
            error   : reject,
        });
    },
    logout: function (resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/sign_out'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },
    getUserInfo: function (resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/get_user_info'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _user_service;