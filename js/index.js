window.onload = function () {
    //顶部搜索
    search();
    //轮播图
    banner();
    //倒计时;
    timeLeave()
}
//页面滚动，导航栏透明度的变化
function search() {
    var searchBox = document.querySelector(".jd-search-box");
    var banner = document.querySelector(".jd-banner");
    var bannerHeight = banner.offsetHeight;
    window.onscroll = function () {
        //三种方式都可以得到页面滚动参数
        //console.log(document.body.scrollTop);
        //console.log(window.pageYOffset);
        //console.log(document.getElement.scrollTop)
        var scrollTop = window.pageYOffset;
        var opacity = 0;
        if (scrollTop < bannerHeight) {
            //按比例调整透明度
            opacity = scrollTop / bannerHeight * 1
        } else {
            //卷曲超过轮播图高度时
            opacity = 1
        }
        searchBox.style.background = "rgba(250,21,35," + opacity + ")"
    }

};
//轮播图的所有操作(核心是index)

function banner() {
    //1.自动无缝轮播
    var banner = document.querySelector(".jd-banner");//轮播图盒子
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-child");//图片盒子
    var pointBox = banner.querySelector("ul:last-child");//圆点的盒子
    var lists = pointBox.querySelectorAll("li")//所有的小圆点
    //添加过度动画
    var addTransition = function () {
        imgBox.style.transition = "all 0.2s";
        imgBox.style.webkitTransition = "all 0.2s";
    }
    //清除当前过度动画
    var removeTransition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";//兼容
    };
    //建立x为参数的过度动画
    var setTransition = function (x) {
        imgBox.style.transform = "translateX(" + x + "px)";
        imgBox.style.webkittransform = "translateX(" + x + "px)";//兼容
    }
    var index = 1;
    var time = setInterval(function () {
        index++;
        addTransition();
        setTransition(-index * width);
    }, 2500);
    imgBox.addEventListener("transitionend", function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTransition(-index * width);
        }
        ;
        if (index <= 0) {
            index = 8;
            removeTransition();
            setTransition(-index * width);
        }
        setPoint();
    });
    //2.点随着图片而变动
    function setPoint() {
        for (var i = 0; i < lists.length; i++) {
            //清除样式
            lists[i].classList.remove("now")
        }
        //添加样式
        lists[index - 1].classList.add("now")     //因为i的索引是0-7，而index是1-8，所以想要对应，设置index-1
    };
    //3.滑动效果（手指可以滑动图片事件的完成，滑动没到1/3，吸附回去。滑动超过1/3，切换上一张或者下一张）
    var start = 0;
    var distance = 0;
    var isMove = false
    imgBox.addEventListener("touchstart", function (e) {
        //清除定时器
        clearInterval(time)
        //记录初始位置
        start = e.touches[0].clientX
    });
    imgBox.addEventListener("touchmove", function (e) {
        //记录移动位置
        var move = e.touches[0].clientX;
        distance = move - start;
        var translateX = -index * width + distance;
        removeTransition();
        setTransition(translateX);
        isMove = true
    });
    imgBox.addEventListener("touchend", function (e) {
        if (isMove) {
            if (Math.abs(distance) < width / 3) {
                //吸附回去
                addTransition();
                setTransition(-index * width)
            } else {
                //distance>0,右滑，index--。否则左滑index++
                if (distance > 0) {
                    index--
                } else {
                    index++
                }
                addTransition();
                setTransition(-index * width)
            }
        }
        /*最好做一次参数的重置,为了手指离开后继续无缝轮播*/
        start = 0;
        distance = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(time);
        time = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTransition(-index * width);
        }, 2500);
    });
};
//秒杀倒计时

function timeLeave() {
        /*1.每一秒改变当前的时间*/
        /*2.倒数计时  假设 12小时*/
        var time = 12 * 60 * 60;
        var spans = document.querySelectorAll('.time span');

        var timer = setInterval(function () {
            time --;
            /*格式化  给不同的元素html内容*/
            var h = Math.floor(time/3600);
            var m = Math.floor(time%3600/60);
            var s = Math.floor(time%60);

            spans[0].innerHTML = Math.floor(h/10);
            spans[1].innerHTML = h%10;
            spans[3].innerHTML = Math.floor(m/10);
            spans[4].innerHTML = m%10;
            spans[6].innerHTML = Math.floor(s/10);
            spans[7].innerHTML = s%10;

            if(time <= 0){
                clearInterval(timer);
            }

        }, 1000)

}


