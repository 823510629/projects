/**
 * Created by haonan.zhu on 2015/5/13.
 */

//Array新增扩展方法 splice:拼接函数(索引位置, 要删除元素的数量, 插入的新元素)

// 根据索引和项目插入新项目
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
    return this;
};

//根据索引移除项目
Array.prototype.remove = function (index) {
    this.splice(index, 1);
    return this;
};

//根据索引修改项目
Array.prototype.update = function (index,item) {
    this.splice(index,1,item);
    return this;
};


// //http://localhost:63342/myFirstHTML/pages/Test/163.html?id=2&name=bingqing&aaa=123&c=yyyyy&d=6666&.......
//获取所有URL参数对象
function getAllPara() {
    var retval = {};
    var paraStr = window.location.search.substr(1);//  "id=2&name=bingqing&aaa=123&c=yyyyy&d=6666"
    var paraList = paraStr.split("&");//  ["id=2", "name=bingqing", "aaa=123", "c=yyyyy", "d=6666"]
    for (var i = 0; i < paraList.length; i++) {
        var para = paraList[i];
        var paraGroup = para.split("=");
        if (paraGroup.length == 2) {
            var key = paraGroup[0];
            var val = paraGroup[1];
            retval[key] = val;
        }
    }
    return retval;
}

//根据参数名称获取URL参数值
function getUrlPara(name) {
    return window.location.href.split(name+"=")[1].split("&")[0];
}