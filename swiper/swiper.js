;(function(window,document) {
    let startX = 0;
    let diffX = 0;
    let timer = '';
    let nextIndex = 0;
    let currIndex = 0;
    let target = '';
    let nextTarget = '';
    let isComplete = false;
    
    let swipeItems = document.getElementsByClassName('rq-swipe-item');
    let indicators = document.getElementsByClassName('rq-swipe-indicator');
    swipeItems[0].classList.add('is-active');
    indicators[0].classList.add('is-active');
    let throttleMove = throttle(touchMove,50);
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    for(let i = 0,len = swipeItems.length; i < len; i++) {
        var item = swipeItems[i];
        item.addEventListener('touchstart',(e) => {
            touchStart(e,i);
        },false);
        item.addEventListener('touchmove',(e) => {
            throttleMove(e);
        },false);
        item.addEventListener('touchend',(e) => {
            touchEnd();
        },false)
    }

    function touchStart(e,index) {
        if(isComplete) return;
        target = swipeItems[index];
        currIndex = index;
        nextTarget = '';
        startX = getClientX(e);
        showOtherSwipeItem(index);
    }

    function touchMove(arguments) {
        if(isComplete) return;
        let endX = getClientX(arguments[0]);
        diffX =  parseFloat(endX - startX);
        if(!nextTarget) {
            if(diffX > 0) {
                nextIndex = currIndex === 0 ? swipeItems.length - 1 : currIndex - 1;
            } else {
                nextIndex = currIndex === swipeItems.length - 1 ? 0 : currIndex + 1;
            }
            nextTarget = swipeItems[nextIndex];
        }
        diffX = diffX < 0 ? Math.max(diffX,-clientWidth) : Math.min(diffX,clientWidth);
        target.style.transform = `translate3d(${diffX}px,0,0)`;
        if(diffX < 0) {
            nextTarget.style.transform = `translate3d(${clientWidth + diffX}px,0,0)`;
        } else {
            nextTarget.style.transform = `translate3d(${diffX - clientWidth}px,0,0)`;
        }
    }

    function touchEnd() {
        if(isComplete) return;
        isComplete = true;
        target.style.transition = 'transform 300ms ease-in-out';
        nextTarget.style.transition = 'transform 300ms ease-in-out';
        timer && clearTimeout(timer);
        if(Math.abs(diffX) <= clientWidth * 0.25) { // 不切换轮播图
            target.style.transform = 'translate3d(0,0,0)';
            let offSetDis = diffX < 0 ? clientWidth : -clientWidth;
            nextTarget.style.transform = `translate3d(${offSetDis}px,0,0)`;
            // if(diffX < 0) {
            //     nextTarget.style.transform = `translate3d(${clientWidth}px,0,0)`;
            // } else {
            //     nextTarget.style.transform = `translate3d(${-clientWidth}px,0,0)`;
            // }
            timer = setTimeout(() => {
                removeTransProperty(target);
                isComplete = false;
            },300)
        } else {
            let offSetX = diffX < 0 ? -clientWidth : clientWidth;
            target.style.transform = `translate3d(${offSetX}px,0,0)`;
            nextTarget.style.transform = 'translate3d(0,0,0)';
            timer = setTimeout(() => {
                removeTransProperty(target);
                target.classList.remove('is-active');
                nextTarget.classList.add('is-active');
                indicators[nextIndex].classList.add('is-active');
                indicators[currIndex].classList.remove('is-active');
                isComplete = false;
            },300) 
        }
    }

    function removeTransProperty(target) {
        target.style = undefined;
        nextTarget.style = undefined;
    }

    function showOtherSwipeItem(index) {
        let swipeItemsArr = Array.from(swipeItems);
        swipeItemsArr.forEach((el,idx) => {
            idx !== index && (el.style.display = 'block');
        });
    }

    function getClientX(e) {
        return e.changedTouches[0].clientX;
    }
})(window,document);