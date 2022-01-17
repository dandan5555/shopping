var that;
class Text {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);


        this.add = this.main.querySelector('.add');
        //li的父元素
        this.ul = this.main.querySelector('nav ul:first-child');
        //section的父元素
        this.content = this.main.querySelector('.content');

        this.init();
    }
    init() {
        this.updateNode();
        //init初始化操作让相关的元素绑定操作事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            //点击某一个li时
            this.lis[i].onclick = this.tabTag;
            //点击某一个关闭按钮时
            this.remove[i].onclick = this.tabClose;
            //双击某个li中的文字 时
            this.in[i].ondblclick = this.tabEdit;
            //双击某个文本页面
            this.sections[i].ondblclick = this.tabEdit;
        }
        //点击添加按钮
        this.add.onclick = this.tabAdd;
        //点击关闭按钮时
        this.remove.onclick = this.tabClose;
    }
    //因为我们动态添加元素 需要重新获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('.content section');
        this.remove = this.main.querySelectorAll('li span');
        this.in = this.main.querySelectorAll('.u-one section');
    }
    //删除功能
    tabClose(e) {
        e.stopPropagation();//阻止冒泡
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        //当我们删除的不是选中状态的li时，原来的选中状态保持不变
        if (document.querySelector('.u-one')) return;
        //当我们删除了选中状态的这个li时，让它的前一个li处于选中状态
        index--;
        that.lis[index] && that.lis[index].click();//手动调用点击事件 不需要鼠标触发
        that.init();//初始化
    }
    //添加功能
    tabAdd() {
        that.clearClass();
        //生成一个随机数 
        var random = Math.random();
        //(1)创建li元素和section元素
        let li = `<li class='u-one'><section>新选项卡</section><span>x</span></li>`;
        let section = `<section class='c-one'>测试` + random + `</section>`;
        //(2)将元素追加到父元素后边
        that.ul.insertAdjacentHTML('beforeend', li);
        that.content.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    //修改功能
    tabEdit() {
        var str = this.innerHTML;
        console.log(str);
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();//文本框里面的文字处于选中状态
        //当我们离开文本框就把文本框里边的值给li中的section
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        //按下回车键也可以把文本框中的值给li中的section
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
    //切换tab栏
    tabTag() {
        that.clearClass();
        that.lis[this.index].className = 'u-one';
        that.sections[this.index].className = 'c-one';
    }
    //清除样式
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            that.sections[i].className = '';
        }
    }


}
var x = new Text('#boxx');






