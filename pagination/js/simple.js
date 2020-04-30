;(function(window,document) {
    let simpleCurrIndex = 1;
    let simplePagination = getEleById('simplePagination');
    let simplePageDesc = getEleById('simplePageDesc');
    let simplePrevBtn = simplePagination.getElementsByClassName('rq-pagination-prev')[0];
    let simpleNextBtn = simplePagination.getElementsByClassName('rq-pagination-next')[0];
    let simpleLen = 4;

    // 简洁模式
    if(simpleCurrIndex === 0) {
        addClassName(simplePrevBtn,disabledClaName);
    } 
    if(simpleCurrIndex === simpleLen - 1) {
        addClassName(simpleNextBtn,disabledClaName);
    }
    setPageNum(simpleCurrIndex);
    // 点击上一页事件
    addEvent(simplePrevBtn,'click',() =>{
        if(simpleCurrIndex === 0) return;
        if(simpleCurrIndex-- === simpleLen - 1) {
            removeClassName(simpleNextBtn,disabledClaName);
        }
        if(simpleCurrIndex === 0) {
            addClassName(simplePrevBtn,disabledClaName);
        }
        setPageNum(simpleCurrIndex);
    });
    // 点击下一页事件
    addEvent(simpleNextBtn,'click',() => {
        if(simpleCurrIndex === simpleLen - 1) return;
        if(simpleCurrIndex++ === 0) {
            removeClassName(simplePrevBtn,disabledClaName);
        }
        if(simpleCurrIndex === simpleLen - 1) {
            addClassName(simpleNextBtn,disabledClaName);
        }
        setPageNum(simpleCurrIndex);
    });

    function setPageNum(pageIndex) {
        return  simplePageDesc.innerHTML = `${pageIndex+1}/${simpleLen}`;
    }
    
})(window,document);