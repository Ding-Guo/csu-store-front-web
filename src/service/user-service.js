const _common_util = require('utils/util.js');

const _user_service = {
    //获取用户信息
    getUserInfo: function (resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/get_user_info'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
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
};

module.exports = _user_service;