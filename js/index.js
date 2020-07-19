//全局变量
var index = 0,
    timer = null,
    prev = byId("prev"),
    next = byId("next"),
    pics = byId("banner").getElementsByTagName("div"),
    cricle = byId("dots").getElementsByTagName("span"),
    len = pics.length,
    menu = byId("menu-content"),
    content = menu.getElementsByTagName("span"),
    subMenu = byId("submenu"),
    innerBox = submenu.getElementsByClassName("inner-box");

//函数封装
function byId(id) {
    return typeof (id) === 'string' ? document.getElementById(id) : id;
}

//鼠标图片移入移出图片
function slideIMG() {
    var main = byId("main");

    //移入
    main.onmouseover = function () {
        //清楚定时器
        if (timer) clearInterval(timer);
    }

    //移出
    main.onmouseout = function () {

        timer = setInterval(function () {

            index++;
            if (index > len - 1) {
                index = 0;
            }
            console.log(index);

            changeImg();

        }, 3000);
    }
    //自动在main上触发鼠标离开事件
    main.onmouseout();

    //小圆点
    for (var d = 0; d < len; d++) {
        cricle[d].id = d;
        cricle[d].onclick = function () {
            index = this.id;
            changeImg();
        }
    }

    //下一张，上一张
    next.onclick = function () {
        if (index < 4) {
            ++index;
            changeImg();
        }
    }
    prev.onclick = function () {
       if(index>=1){
        --index;
        changeImg();
       }
    }
    //菜单栏
    //鼠标移入子菜单
    for(var m=0;m<content.length;m++){
        content[m].setAttribute("data-index",m);
        content[m].onmouseover = function(){
            var idx = this.getAttribute("data-index");
            for(var s=0;s<innerBox.length;s++){
                innerBox[s].style.display = "none";
                content[s].style.background = "none";
            }
            subMenu.className = "sub-menu";
            innerBox[idx].style.display = "block";
            content[idx].style.background = "rgb(0,0,0,0.1)";
        }
    }

    //鼠标移出菜单
    menu.onmouseout = function(){
        subMenu.className = "sub-menu hidden";

    }

    subMenu.onmouseover = function(){
        this.className = "sub-menu";
    }

    subMenu.onmouseout = function(){
        subMenu.className = "sub-menu hidden";
    }

}
slideIMG();

function changeImg() {
    for (var i = 0; i < len; i++) {
        pics[i].style.display = 'none';
        cricle[i].className = "";
    }
    pics[index].style.display = 'block';
    cricle[index].className = "active";
}