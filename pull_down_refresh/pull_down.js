;(function (window,document) {
    // 开始滚动的位置
    let startY = 0;
    // 结束滚动的位置
    let endY = 0;
    // 滚动的差值
    let diff = 0;
    // 是否还在请求数据中
    let isRequesting = false;
    // 可以刷新了
    let canPullDownReFresh = false;
    let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 滑动到distance触发刷新
    // let distance = 48 * clientHeight / 750;
    let distance = 48;

    // 下拉刷新
    let status1 = "<i class='iconfont iconjiantouarrow505'></i>下拉刷新";
    let status2 = "<i class='iconfont iconjiantouarrow499'></i>释放立即刷新";
    let status3 = "<i class='iconfont loading'></i>加载中...";
    let status4 = "<i class='iconfont iconchenggong'></i>刷新成功";

    let list = getEle('list');
    let content = getEle('content');
    let refreshWp = getEle('refresh');

    let throttleMove = throttle(move,50);

    list.addEventListener('touchstart',(e)=>{
        touchStart(e);
    },false);

    list.addEventListener('touchmove',(e)=>{
        touchMove(e);
    },false);

    list.addEventListener('touchend',(e)=>{
      touchEnd();
    },false);

    function touchStart(e) {
        startY = getClientY(e);
        let result = ['','translate3d(0px, 0px, 0px)'].includes(content.style.transform);
        canPullDownReFresh = list.scrollTop === 0 && result;
    }

    function touchMove(e) {
        if(isRequesting) return;
        if(!canPullDownReFresh) return;
        refreshWp.innerHTML = status1;
        throttleMove(e);
        if(diff >= distance) {
            refreshWp.innerHTML = status2;
        }
    }

    function touchEnd() {
        if(diff < distance) {
            setTransform(0);
            return;
        }
        if(isRequesting) return;
        isRequesting = true;
        refreshWp.innerHTML = status3;
        // 模拟异步请求
        setTimeout(() =>{
            refreshWp.innerHTML = status4;
            updateData();
            list.scrollTop = 0;
            setTimeout(() =>{
                setTransform(0);
                setTimeout(() =>{
                    isRequesting = false;
                    diff = 0;
                },500)
            },500)
        },1500)
    }

    function move(argument) {
        endY = getClientY(argument[0]);
        diff = parseInt(endY - startY);
        if(diff <= 0) return;
        let maxDiff = Math.min(diff,distance) * clientHeight / 750;
        setTransform(maxDiff);
    }
    
    // 模拟更新数据
    function updateData() {
        let index = list.firstElementChild.innerHTML;
        let li = document.createElement('li');
        li.innerHTML = --index;
        list.insertBefore(li,list.firstElementChild);
    }

    function setTransform(diffY) {
        content.style.transform = `translate3d(0,${diffY}px,0)`;
    }
    
    // 获取clientY
    function getClientY(e) {
        return e.changedTouches[0].clientY;
    }

    function getEle(id) {
        return document.getElementById(id);
    }
})(window,document);