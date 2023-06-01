require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js');
require('./index.css');

const _common_util = require('utils/util.js');
const _product_service = require('service/product-service.js');

const productListTemplate = require('./index.string');

const Pagination = require('utils/pagination/index.js');

const _product_list = {
    requestParam : {
        keyword     : _common_util.getURLParam('keyword') || '',
        categoryId  : _common_util.getURLParam('categoryId') || '',
        orderBy     : _common_util.getURLParam('orderBy') || '',
        pageNum     : _common_util.getURLParam('pageNum') || 1,
        pageSize    : _common_util.getURLParam('pageSize') || 2
    },
    init: function () {
        this.bindEvent();
        this.onLoad();
    },
    onLoad: function () {
        this.loadProductList();
    },
    bindEvent : function (){

    },
    loadProductList : function (){
        let requestParam = this.requestParam;
        let productListHTML = '';

        const $productListContent = $('.product-list-content');
        requestParam.categoryId ? (delete requestParam.keyword) : (delete requestParam.categoryId);

        const _this = this;
        _product_service.getProductList(requestParam, function(res){
            productListHTML = _common_util.renderHTML(productListTemplate,{list : res.records});
            $productListContent.html(productListHTML);
            _this.loadPagination(res.current, res.pages);
        }, function(errorMsg){
            _common_util.errorTips(errorMsg);
        });

    },
    loadPagination : function(current, pages){
        const _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render({
            container   : $('.pagination'),
            current     : current,
            pages       : pages,
            onClickItem : function(current){
                _this.requestParam.pageNum = current;
                _this.loadProductList();
            }
        });
    }
};

$(function(){
    _product_list.init();
});

