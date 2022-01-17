//数据
var data = [{
    id: 1,
    pname: '小米',
    price: 3742
}, {
    id: 2,
    pname: '三星',
    price: 2999
}, {
    id: 3,
    pname: '华为',
    price: 4921
}, {
    id: 4,
    pname: '苹果',
    price: 3324
}, {
    id: 5,
    pname: 'vivo',
    price: 2999
}];
var that;
class Table {
    constructor() {
        that = this;
        this.sou = document.querySelector('.sou');
        this.cha = document.querySelector('.cha');
        this.updateMessage();
        this.setData(data);
        //点击搜索按钮时
        this.sou.onclick = this.acdPrice;
        //点击查询按钮时
        this.cha.onclick = this.acdName;
    }
    //渲染表格
    setData(myData) {
        that.tbody.innerHTML = '';//先清空表格中的数据
        myData.forEach(function (value) {
            var tr = document.createElement('tr');
            tr.innerHTML = `<tr><td>${value.id}</td><td>${value.pname}</td><td>${value.price}</td>`;
            that.tbody.appendChild(tr);
        })
    }

    updateMessage() {
        this.tbody = document.querySelector('tbody');
        this.min = document.querySelector('.min');
        this.max = document.querySelector('.max');
        this.name = document.querySelector('.name');
    }
    //按照商品名称查询
    acdName() {
        that.updateMessage();
        // that.init();
        var name = that.name.value;
        var arr = [];
        //如果查询数组中唯一元素，用some方法更合适，因为它找到这个元素就不再进行循环，效率更高
        data.some(function (value) {
            if (value.pname === name) {
                arr.push(value);
                return true; //结束
            }
        })
        that.setData(arr);
        that.updateMessage();
    }
    //按照商品价格查询
    acdPrice() {
        that.updateMessage();
        var min = that.min.value;
        var max = that.max.value;
        var newDate = data.filter(function (value) {
            return value.price >= min && value.price <= max;
        })
        console.log(newDate);
        that.setData(newDate);
        that.updateMessage();
    }

   
}
new Table();