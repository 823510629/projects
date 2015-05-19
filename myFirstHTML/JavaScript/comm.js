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
