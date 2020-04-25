;(function(window,document) {
    let activedClaName = 'rq-pagination-item-active';
    let disabledClaName = 'rq-pagination-item-disabled';
    let hideClaName = 'rq-pagination-item-hide';

    // 基本模式
    let currIndex = 1;
    let basePagination = getEleById('basePagination');
    let prevBtn = basePagination.getElementsByClassName('rq-pagination-prev')[0];
    let nextBtn = basePagination.getElementsByClassName('rq-pagination-next')[0];
    let pageNums = basePagination.getElementsByClassName('rq-pagination-page');
    let len = pageNums.length;

    // 简单模式
    let simpleCurrIndex = 1;
    let simplePagination = getEleById('simplePagination');
    let simplePageDesc = getEleById('simplePageDesc');
    let simplePrevBtn = simplePagination.getElementsByClassName('rq-pagination-prev')[0];
    let simpleNextBtn = simplePagination.getElementsByClassName('rq-pagination-next')[0];
    let simpleLen = 12;

    // // 带省略号的分页
    // let dotCurrIndex = 3;
    // let dotPagination = getEleById('dotPagination');
    // let dotPrevBtn = dotPagination.getElementsByClassName('rq-pagination-prev')[0];
    // let dotNextBtn = dotPagination.getElementsByClassName('rq-pagination-next')[0];
    // let dotPageNums = dotPagination.getElementsByClassName('rq-pagination-page');
    // let dots = dotPagination.getElementsByClassName('rq-pagination-dot');
    // let dotPageLen = 4;
    
    setPageNumStatus(currIndex,len,pageNums);
    setPageBtnStatus(prevBtn,nextBtn,currIndex,len);

    setPageBtnStatus(simplePrevBtn,simpleNextBtn,simpleCurrIndex,len);
    setSimplePageNum(simpleCurrIndex);

    // handleDotPage();
    // setPageNumStatus(dotCurrIndex,dotPageNums.length,dotPageNums);
    // setPageBtnStatus(dotPrevBtn,dotNextBtn,dotCurrIndex,dotPageLen);

    // 上下页绑定点击事件
    addEvent(prevBtn,'click',() => {
        if(currIndex === 0) return;
        currIndex--;
        setPageNumStatus(currIndex,len,pageNums);
        setPageBtnStatus(prevBtn,nextBtn,currIndex,len);
    });
    addEvent(nextBtn,'click',() => {
        if(currIndex === len - 1) return;
        currIndex++;
        setPageNumStatus(currIndex,len,pageNums);
        setPageBtnStatus(prevBtn,nextBtn,currIndex,len);
    });

    addEvent(simplePrevBtn,'click',() =>{
        if(simpleCurrIndex === 0) return;
        simpleCurrIndex--;
        setSimplePageNum(simpleCurrIndex);
        setPageBtnStatus(simplePrevBtn,simpleNextBtn,simpleCurrIndex,simpleLen);
    });

    addEvent(simpleNextBtn,'click',() => {
        if(simpleCurrIndex === simpleLen - 1) return;
        simpleCurrIndex++;
        setSimplePageNum(simpleCurrIndex);
        setPageBtnStatus(simplePrevBtn,simpleNextBtn,simpleCurrIndex,simpleLen);
    });

    // addEvent(dotPrevBtn,'click',() => {
    //     if(dotCurrIndex === 0) return;
    //     dotCurrIndex--;

    //     setPageBtnStatus(dotPrevBtn,dotNextBtn,dotCurrIndex,dotPageLen);
    // })

    // addEvent(dotNextBtn,'click',() => {
    //     if(dotCurrIndex === dotPageLen - 1) return;
    //     dotCurrIndex++;

    //     setPageBtnStatus(dotPrevBtn,dotNextBtn,dotCurrIndex,dotPageLen);
    // });

    // 页码绑定点击事件
    for(let i = 0; i < len; i++) {
        addEvent(pageNums[i],'click',() => {
            clickPage(i,len,pageNums);
        });
    }

    // 省略号模式页码点击事件
    for(let i = 0; i < dotPageNums.length; i++) {
        addEvent(dotPageNums[i],'click',() => {
            clickDotPage(i,dotPageNums);
        });
    }

    // 省略号的点击事件
    // for(let i = 0; i < dots.length; i++) {
    //     addEvent(dots[i],'click',() => {
    //         clickDot(i,dots);
    //     });
    // }

    // function clickDot(i) {
    //     if(i === 0) {
    //         dotCurrIndex = dotPageNums[0].innerHTML - 2;
    //     } else {
    //         dotCurrIndex = +dotPageNums[2].innerHTML;
    //     }
    //     setPageBtnStatus(dotPrevBtn,dotNextBtn,dotCurrIndex,dotPageLen);
    // }

    // function clickDotPage(i,dotPageNums) {
    //     let innerContent = dotPageNums[i].innerHTML - 1;
    //     if(dotCurrIndex === innerContent) return;
    //     dotCurrIndex = innerContent;
    //     setPageBtnStatus(dotPrevBtn,dotNextBtn,dotCurrIndex,dotPageLen,true);
    // }

    function clickPage(pageIndex,len,pageNums) {
        setPageNumStatus(pageIndex,len,pageNums);
        setPageBtnStatus(prevBtn,nextBtn,pageIndex,len);
        currIndex = pageIndex;
    }

    // function handleDotPage() {
    //     if(dotPageLen <= 3) {
    //         addClassName(dots[0],'rq-pagination-item-hide');
    //         addClassName(dots[1],'rq-pagination-item-hide');
    //         if(dotPageLen === 1) {
    //             setPageNumStatus(0,dotPageLen,dotPageNums);
    //             addClassName(dotPageNums[1],'rq-pagination-item-hide');
    //             addClassName(dotPageNums[2],'rq-pagination-item-hide');
    //         } else if(dotPageLen === 2) {
    //             addClassName(dotPageNums[2],'rq-pagination-item-hide');
    //             setPageNumStatus(1,dotPageLen,dotPageNums);
    //         }
    //     } else {
    //         if(dotCurrIndex <= 1) {
    //             addClassName(dots[0],'rq-pagination-item-hide');
    //             removeClassName(dots[1],'rq-pagination-item-hide');
    //             dotPageNums[0].innerHTML = 1;
    //             dotPageNums[1].innerHTML =  2;
    //             dotPageNums[2].innerHTML = 3;
    //         } 
    //         if(dotCurrIndex >=dotPageLen - 2 ) {
    //             removeClassName(dots[0],'rq-pagination-item-hide');
    //             if(dotCurrIndex === dotPageLen - 2) {
    //                 removeClassName(dots[1],'rq-pagination-item-hide');
    //             }
    //             if(dotPageLen <5) {
    //                 addClassName(dots[0],'rq-pagination-item-hide');
    //             }
    //             if(dotPageLen >= 5) {
    //                 addClassName(dots[1],'rq-pagination-item-hide');
    //             }

    //             dotPageNums[0].innerHTML = dotCurrIndex - 1;
    //             dotPageNums[1].innerHTML = dotCurrIndex;
    //             dotPageNums[2].innerHTML = dotCurrIndex + 1;
    //         }
    //     }
    // }

    function setPageNumStatus(pageIndex,pageLength,pages) {
        for(let i = 0; i < pageLength; i++) {
            if(i === pageIndex) {
                addClassName(pages[i],activedClaName);
            } else {
                removeClassName(pages[i],activedClaName);
            }
        }
    }

    // 修改上下页按钮禁用状态
    function setPageBtnStatus(prevBtn,nextBtn,pageIndex,len) {
        switch (pageIndex) {
            case 0:
                addClassName(prevBtn,disabledClaName);
                if(len === 1) {
                    addClassName(nextBtn,disabledClaName);
                    return;
                };
                removeClassName(nextBtn,disabledClaName);
                break;
            case len - 1:
                addClassName(nextBtn,disabledClaName);
                removeClassName(prevBtn,disabledClaName);
                break;
            default:
                removeClassName(prevBtn,disabledClaName);
                removeClassName(nextBtn,disabledClaName);
                break;
        }
    }

    function setSimplePageNum(pageIndex) {
        return  simplePageDesc.innerHTML = `${pageIndex+1}/12`;
    }
   
})(window,document)