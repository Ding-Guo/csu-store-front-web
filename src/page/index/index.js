require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js');
require('utils/unslider/index.js');
require('./index.css');

const _common_util = require('utils/util.js');
const bannerHTMLTemplate = require('./banner.string');
console.log('index.js####');

$(function (){
    const bannerHTML = _common_util.renderHTML(bannerHTMLTemplate);
    // console.log(bannerHTML);
    $('.banner-content').html(bannerHTML);
    $('.banner').unslider({
        dots : true,
    });
});