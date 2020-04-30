;(function(window,document) {
     // 基本模式
     let currIndex = 3;
     let basePagination = getEleById('basePagination');
     let prevBtn = basePagination.getElementsByClassName('rq-pagination-prev')[0];
     let nextBtn = basePagination.getElementsByClassName('rq-pagination-next')[0];
     let pageNums = basePagination.getElementsByClassName('rq-pagination-page');
     let len = pageNums.length;

     // 基本模式
    addClassName(pageNums[currIndex],activedClaName);
    if(currIndex === 0) {
        addClassName(prevBtn,disabledClaName);
    } 
    if(currIndex === pageNums.length - 1) {
        addClassName(nextBtn,disabledClaName);
    }
    // 点击上一页事件
    addEvent(prevBtn,'click',() => {
        if(currIndex === 0) return;
        removeClassName(pageNums[currIndex],activedClaName);
        if(currIndex-- === pageNums.length - 1) {
            removeClassName(nextBtn,disabledClaName);
        }
        addClassName(pageNums[currIndex],activedClaName);
        if(currIndex === 0) {
            addClassName(prevBtn,disabledClaName);
        } 
    });
    // 点击下一页事件
    addEvent(nextBtn,'click',() => {
        if(currIndex === pageNums.length - 1) return;
        removeClassName(pageNums[currIndex],activedClaName);
        if(currIndex++ === 0) {
            removeClassName(prevBtn,disabledClaName);
        }
        addClassName(pageNums[currIndex],activedClaName);
        if(currIndex === pageNums.length - 1) {
            addClassName(nextBtn,disabledClaName);
        }
    });
     // 点击页码事件
     for(let i = 0; i < len; i++) {
        addEvent(pageNums[i],'click',() => {
            if(currIndex === i) return;
            clickPageNum(i,pageNums);
        });
    }
    function clickPageNum(pageIndex,pageNums) {
        removeClassName(pageNums[currIndex],activedClaName);
        if(currIndex === 0) {
            removeClassName(prevBtn,disabledClaName);
        } else if(currIndex === pageNums.length - 1) {
            removeClassName(nextBtn,disabledClaName);
        }
        addClassName(pageNums[pageIndex],activedClaName);
        if(pageIndex === 0) {
            addClassName(prevBtn,disabledClaName);
        }
        if(pageIndex === pageNums.length - 1) {
            addClassName(nextBtn,disabledClaName);
        }
        currIndex = pageIndex;
    }
    
})(window,document);