;(function() {
    let startY = 0;
    let diffY = 0;
    let swipeOffSetY = 0;
    // 至少滑动了minSwipeDistance才能触发下拉刷新
    let minSwipeDis = -90;
    let minDistance = -48; // 容器在y轴的偏移距离
    let isRequest = false;
    let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.client;
    let throttleMove = throttle(move,50); 
    let status1 = "<i class='iconfont iconjiantouarrow505'></i>上拉加载";
    let status2 = "<i class='iconfont iconjiantouarrow499'></i>释放立即刷新";
    let status3 = "<i class='iconfont loading'></i>加载中...";
    
    let list = getEleById('rqList');
    let pullUpWrap = getEleById('rqPullUp');
    let rqLoading = getEleById('rqLoading');
    
    list.addEventListener('touchstart',(e) => {
        touchStart(e);
    },false);
    
    list.addEventListener('touchmove',(e) => {
        touchMove(e);
    },false);
    
    list.addEventListener('touchend',(e) => {
        touchEnd(e);
    },false);
    
    function touchStart(e) {
        startY = getClientY(e);
        pullUpWrap.style.transition = 'all .2s linear';
    }
    
    function touchMove(e) {
        if(isRequest) return;
        throttleMove(e);
    }
    
    function touchEnd() {
        if(diffY > -110) {
            setTransform(0);
            return;
        }
        if(isRequest) return;
        if(diffY < -110) {
            pullUpWrap.style.transform = 'all 0.1s linear';
            setTransform(minDistance * clientHeight / 750);
            rqLoading.innerHTML = status3;
        }
        isRequest = true;
        setTimeout(() => {
            updateData();
            pullUpWrap.style.transition = 'all 0s linear';
            setTimeout(() => {
                setTransform(0);
                list.scrollTop = list.scrollTop - minDistance * clientHeight / 750;
                isRequest = false;
                diffY = 0;
            },20)
        },1500)
    }
    
    function move(argument) {
        if(isRequest) return;
        if(!canMove()) return;
        rqLoading.innerHTML = status1;
        diffY = parseInt(getClientY(argument[0]) - startY);
        if(diffY <= minSwipeDis) { // 滑动偏移大于90时，才可能触发刷新
            let offSetY = Math.max(diffY,-150);
            if(diffY <= - 110) {
                rqLoading.innerHTML = status2;
            }
            setTransform(offSetY);
        }
    }
    
    function setTransform(diffY) {
        pullUpWrap.style.transform = `translate3d(0,${diffY}px,0)`;
    }
    
    // 模拟更新数据
    function updateData() {
        let index = list.lastElementChild.innerHTML;
        let li = document.createElement('li');
        li.innerHTML = ++index;
        list.appendChild(li,list.firstElementChild);
    }
    
    function canMove() {
        return list.scrollHeight - clientHeight <= Math.ceil(list.scrollTop);
    }
    
    function getClientY(e) {
        return e.changedTouches[0].clientY;
    }
    
    function getEleById(id) {
        return document.getElementById(id);
    }
})(window,document);