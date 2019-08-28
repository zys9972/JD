window.onload = function () {
    //��������
    search();
    //�ֲ�ͼ
    banner();
    //����ʱ;
    timeLeave()
}
//ҳ�������������͸���ȵı仯
function search() {
    var searchBox = document.querySelector(".jd-search-box");
    var banner = document.querySelector(".jd-banner");
    var bannerHeight = banner.offsetHeight;
    window.onscroll = function () {
        //���ַ�ʽ�����Եõ�ҳ���������
        //console.log(document.body.scrollTop);
        //console.log(window.pageYOffset);
        //console.log(document.getElement.scrollTop)
        var scrollTop = window.pageYOffset;
        var opacity = 0;
        if (scrollTop < bannerHeight) {
            //����������͸����
            opacity = scrollTop / bannerHeight * 1
        } else {
            //���������ֲ�ͼ�߶�ʱ
            opacity = 1
        }
        searchBox.style.background = "rgba(250,21,35," + opacity + ")"
    }

};
//�ֲ�ͼ�����в���(������index)

function banner() {
    //1.�Զ��޷��ֲ�
    var banner = document.querySelector(".jd-banner");//�ֲ�ͼ����
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-child");//ͼƬ����
    var pointBox = banner.querySelector("ul:last-child");//Բ��ĺ���
    var lists = pointBox.querySelectorAll("li")//���е�СԲ��
    //��ӹ��ȶ���
    var addTransition = function () {
        imgBox.style.transition = "all 0.2s";
        imgBox.style.webkitTransition = "all 0.2s";
    }
    //�����ǰ���ȶ���
    var removeTransition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";//����
    };
    //����xΪ�����Ĺ��ȶ���
    var setTransition = function (x) {
        imgBox.style.transform = "translateX(" + x + "px)";
        imgBox.style.webkittransform = "translateX(" + x + "px)";//����
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
    //2.������ͼƬ���䶯
    function setPoint() {
        for (var i = 0; i < lists.length; i++) {
            //�����ʽ
            lists[i].classList.remove("now")
        }
        //�����ʽ
        lists[index - 1].classList.add("now")     //��Ϊi��������0-7����index��1-8��������Ҫ��Ӧ������index-1
    };
    //3.����Ч������ָ���Ի���ͼƬ�¼�����ɣ�����û��1/3��������ȥ����������1/3���л���һ�Ż�����һ�ţ�
    var start = 0;
    var distance = 0;
    var isMove = false
    imgBox.addEventListener("touchstart", function (e) {
        //�����ʱ��
        clearInterval(time)
        //��¼��ʼλ��
        start = e.touches[0].clientX
    });
    imgBox.addEventListener("touchmove", function (e) {
        //��¼�ƶ�λ��
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
                //������ȥ
                addTransition();
                setTransition(-index * width)
            } else {
                //distance>0,�һ���index--��������index++
                if (distance > 0) {
                    index--
                } else {
                    index++
                }
                addTransition();
                setTransition(-index * width)
            }
        }
        /*�����һ�β���������,Ϊ����ָ�뿪������޷��ֲ�*/
        start = 0;
        distance = 0;
        isMove = false;
        /*���϶�ʱ��*/
        clearInterval(time);
        time = setInterval(function () {
            index++;
            /*�ӹ���*/
            addTransition();
            /*��λ��*/
            setTransition(-index * width);
        }, 2500);
    });
};
//��ɱ����ʱ

function timeLeave() {
        /*1.ÿһ��ı䵱ǰ��ʱ��*/
        /*2.������ʱ  ���� 12Сʱ*/
        var time = 12 * 60 * 60;
        var spans = document.querySelectorAll('.time span');

        var timer = setInterval(function () {
            time --;
            /*��ʽ��  ����ͬ��Ԫ��html����*/
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


