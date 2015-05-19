define(function (require, exports, module) {

    var b = {};


    b.init = function () {
        console.log(456);
    }
    //导出 a 
    module.exports = b;


});