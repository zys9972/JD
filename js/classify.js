
window.onload = function () {
    document.querySelector('.classify-left').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    document.querySelector('.classify-right').addEventListener('touchmove',function(e){

        e.preventDefault();

    });
    /*�������Ч��*/
    /*������һ������װ��һ������html�ṹ*/
    /*�ҵ�������*/
    /*���������ڸ�����*/
    new IScroll(document.querySelector('.classify-left'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.classify-right'),{
        scrollX:true,
        scrollY:false
    });
}
