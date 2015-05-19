define(function (require, exports, module) {

    var a = {};


    a.init = function () {

        document.getElementById("clickMe").onclick = function () { 
            require.async("./b.js", function (b) {
                b.init();
            });
           
        }   


        console.log(123);
    }
    //导出 a 
     module.exports = a; 


});