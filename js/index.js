function RunImg() {

}

RunImg.prototype = {
    count: 0,
    bigbox: null,
    index: 0,
    imgurl: null,
    imgList: null,
    numList: null,
    timer: null,
    play: null,
    boxul: null,

    _$: function (obj) {
        if(typeof(obj) === "string"){
            if(obj.indexOf("#") >= 0){
                obj = obj.replace("#","");
                if(document.getElementById(obj)){
                    return document.getElementById(obj);
                }else{
                    alert("没有容器"+obj);
                    return null;
                }
            }else{
                return document.createElement(obj);
            }
        }else{
            return obj;
        }
    },

    createList: function (id) {
        this.count = this.count <= 5 ? this.count : 5;
        this.bigbox = this._$(id);
        var ul, li;
        // 两个ul 一个存放图片 一个存放 按钮
        for (var i = 0; i < 2; i++) {
            ul = this._$('ul');
            for (var j = 1; j <= this.count; j++) {
                li = this._$('li');
                li.innerHTML = i === 0 ? this.imgurl[j-1] : '';
                ul.appendChild(li);
            }
            this.bigbox.appendChild(ul);
        }
        var uls = this.bigbox.getElementsByTagName('ul');
        uls[0].className = 'imgList';
        uls[1].className = 'countNum';
        this.imgList = uls[0].getElementsByTagName('li');
        this.numList = uls[1].getElementsByTagName('li');
        this.numList[0].className = 'current';
        // this.count = this.count <= 5 ? this.count : 5;
        // this.bigbox = this._$(id);
        // var ul, li;
        // for (var i = 0; i < 2; i++) {
        //      ul = this._$("ul");
        //     for(var j=1;j<=this.count;j++){
        //        li=this._$("li");
        //         li.innerHTML=i==0?this.imgurl[j-1]:"";
        //         ul.appendChild(li);
        //     }
        //     this.bigbox.appendChild(ul);
        // }
        // var uls =this.bigbox.getElementsByTagName("ul");
        //
        // uls[0].className="imgList";
        // uls[1].className="countNum";
        // this.imgList=uls[0].getElementsByTagName("li");
        // this.numList=uls[1].getElementsByTagName("li");
        // this.numList[0].className="current";
    },
    
    _imgShow: function (num, numList, imgList) {
        this.index = num;
        var alpha = 0;
        for (var i = 0, nLen = numList.length; i < nLen; i++) {
            numList[i].className = '';
        }
        numList[this.index].className = 'current';
        clearInterval(this.timer);
        for (var j = 0, iLen = imgList.length; j < iLen; j++) {
            imgList[j].style.opacity = 0;
            imgList[j].style.filter = "alpha(opacity=0)";
        }
        var $this = this;
        // 透明度变化
        this.timer = setInterval(function () {
            alpha += 2;
            if (alpha > 100) {
                alpha = 100;
            }
            imgList[$this.index].style.opacity = alpha / 100;
            imgList[$this.index].style.filter = "alpha(opacity=" + alpha + ")";
            if (alpha === 100) {
                clearInterval($this.timer);
            }
        }, 20);
    },
    
    _autoplay: function () {
        var $this = this;
        this.play = setInterval(function () {
            $this.index++;
            if ($this.index > $this.imgList.length - 1) {
                $this.index = 0;
            }
            $this._imgShow($this.index, $this.numList, $this.imgList);
        }, 2000);
    },
    
    _mouseEvent: function (box, numList) {
        var $this = this;
        box.onmouseover = function () {
            clearInterval($this.play);
        };
        box.onmouseout = function () {
            $this._autoplay();
        };

        for (var i = 0; i < numList.length; i++) {
            numList[i].index =  i;
            numList[i].onmouseover = function () {
                $this._imgShow(this.index, $this.numList, $this.imgList);
            }
        }
    },

    action: function () {
        this._autoplay();
        this._mouseEvent(this.bigbox, this.numList)
    }

    
}

window.onload = function () {
    var runimg = new RunImg();
    runimg.count = 3;
    runimg.imgurl=[
        "<img src='image/bnr-1.jpg'/>",
        "<img src='image/bnr-2.jpg'/>",
        "<img src='image/bnr-3.jpg'/>"];
    runimg.createList('#box');
    runimg.action();
};


