;(function(window,document) {
    let startX = 0;
    let diffX = 0;
    let timer = '';
    let startTimer = '';
    let autoPlayTimer = '';
    let nextIndex = 0;
    let currIndex = 0;
    let target = '';
    let nextTarget = '';
    let isCompleting = false;
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    let swipeItems = Array.from(getEleByClassName('rq-swipe-item'));
    let indicators = getEleByClassName('rq-swipe-indicator');

    target = swipeItems[0];
    swipeItems[0].classList.add('is-active');
    indicators[0].classList.add('is-active');

    let throttleMove = throttle(touchMove,50);

    for(let i = 0,len = swipeItems.length; i < len; i++) {
        var item = swipeItems[i];
        item.addEventListener('touchstart',(e) => {
            touchStart(e,i);
        },false);
        item.addEventListener('touchmove',(e) => {
            throttleMove(e);
        },false);
        item.addEventListener('touchend',() => {
            touchEnd();
        },false);

        item.addEventListener('click',() => {
            console.log('索引为：' + i);
        });
    }

    // 一进来设置自动轮播
    startTimer && clearTimeout(startTimer);
    startTimer = setTimeout(autoPlay,3000);

    // 自动轮播
    function autoPlay() {
        showOtherSwipeItem(currIndex);
        let nextIndex = currIndex === swipeItems.length - 1 ? 0 : currIndex + 1;
        let nextTarget = swipeItems[nextIndex];
        let offSetDis = 0;
        autoPlayTimer && clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            offSetDis = Math.max(offSetDis-=20, -clientWidth);
            setTransform(target,offSetDis);
            setTransform(nextTarget,clientWidth + offSetDis);
            if(offSetDis <= -clientWidth) {
                clearInterval(autoPlayTimer);
                removeTransProperty();
                target.classList.remove('is-active');
                nextTarget.classList.add('is-active');
                indicators[nextIndex].classList.add('is-active');
                indicators[currIndex].classList.remove('is-active');
                currIndex = nextIndex;
                target = nextTarget;
                startTimer = setTimeout(autoPlay,3000);
            }
        },15);
    }

    function touchStart(e,index) {
        if(isCompleting) return;
        startTimer && clearTimeout(startTimer);
        autoPlayTimer && clearInterval(autoPlayTimer);
        target = swipeItems[index];
        currIndex = index;
        nextTarget = '';
        startX = getClientX(e);
        showOtherSwipeItem(index);
    }

    function touchMove(arguments) {
        if(isCompleting) return;
        let endX = getClientX(arguments[0]);
        diffX =  parseFloat(endX - startX);
        let offSetDis = 0;
        if(diffX > 0) {
            nextIndex = currIndex === 0 ? swipeItems.length - 1 : currIndex - 1;
            diffX = Math.min(diffX,clientWidth);
            offSetDis = diffX - clientWidth;
        } else {
            nextIndex = currIndex === swipeItems.length - 1 ? 0 : currIndex + 1;
            diffX = Math.max(diffX,-clientWidth);
            offSetDis = clientWidth + diffX;
        }
        nextTarget = swipeItems[nextIndex];
        setTransform(target,diffX);
        setTransform(nextTarget,offSetDis);
    }

    function touchEnd() {
        if(isCompleting) return;
        if(diffX === 0) {
            showOtherSwipeItem(currIndex);
            startTimer = setTimeout(autoPlay,3000);
            return; 
        }
        isCompleting = true;
        timer && clearTimeout(timer);
        startTimer && clearTimeout(startTimer);
        autoPlayTimer && clearInterval(autoPlayTimer);
        setTransition(target);
        setTransition(nextTarget);
        if(Math.abs(diffX) <= clientWidth * 0.25) { // 不轮播
            let offSetDis = diffX < 0 ? clientWidth : -clientWidth;
            setTransform(target,0);
            setTransform(nextTarget,offSetDis);
            timer = setTimeout(() => {
                removeTransProperty();
                diffX = 0;
                showOtherSwipeItem(currIndex);
                isCompleting = false;
                startTimer = setTimeout(autoPlay,3000);
            },300)
        } else { // 轮播
            let offSetX = diffX < 0 ? -clientWidth : clientWidth;
            setTransform(target,offSetX);
            setTransform(nextTarget,0);
            timer = setTimeout(() => {
                removeTransProperty();
                target.classList.remove('is-active');
                nextTarget.classList.add('is-active');
                indicators[nextIndex].classList.add('is-active');
                indicators[currIndex].classList.remove('is-active');
                diffX = 0;
                // 设置当前的索引
                currIndex = nextIndex;
                target = nextTarget;
                showOtherSwipeItem(currIndex);
                isCompleting = false;
                startTimer = setTimeout(autoPlay,3000);
            },300) 
        }
    }

    function removeTransProperty() {
        swipeItems.forEach(el => {
            el.style = undefined;
        });
    }

    function setTransition(ele) {
        ele.style.transition = `transform 300ms ease-in-out`;
    }

    function setTransform(ele,offSetX) {
        ele.style.transform = `translate3d(${offSetX}px,0,0)`;
    }

    function showOtherSwipeItem(index) {
        swipeItems.forEach((el,idx) => {
            idx !== index && (el.style.display = 'block');
        });
    }

    function getClientX(e) {
        return e.changedTouches[0].clientX;
    }

    function getEleByClassName(className) {
        return document.getElementsByClassName(className);
    };
})(window,document);