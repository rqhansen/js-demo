;(function(window,document) {
    let dotCurrIndex = 2;
    let dotPagination = getEleById('dotPagination');
    let dotPrevBtn = dotPagination.getElementsByClassName('rq-pagination-prev')[0];
    let dotNextBtn = dotPagination.getElementsByClassName('rq-pagination-next')[0];
    let dotPageNums = dotPagination.getElementsByClassName('rq-pagination-page');
    let dots = dotPagination.getElementsByClassName('rq-pagination-dot');
    let dotPageLen = 4;

    // 索引为0，禁用上一页，激活页码1
    // 索引为长度减1，禁用最后一个页码
    if(dotCurrIndex === 0) {
        addClassName(dotPrevBtn,disabledClaName);
        addClassName(dotPageNums[0],activedClaName);
    } 
     if(dotCurrIndex === dotPageLen -1) {
        addClassName(dotNextBtn,disabledClaName);
    }

    // 不大于3页，隐藏所有省略号
    if(dotPageLen <= 3) {
        addClassName(dots[0],hideClaName);
        addClassName(dots[1],hideClaName);
        for(let i = 0; i < dotPageLen; i++) { // 设置页码的值
            dotPageNums[i].innerHTML = i + 1;
        }
        addClassName(dotPageNums[dotCurrIndex],activedClaName);
        for(let i = dotPageLen; i < 3; i++) {
            addClassName(dotPageNums[i],hideClaName);
        }
    } else if(dotCurrIndex <= 1) {
        addClassName(dotPageNums[dotCurrIndex],activedClaName);
        addClassName(dots[0],hideClaName);
    } else {
        let activedIndex = '';
        removeClassName(dots[0],hideClaName);
        if(dotCurrIndex >= dotPageLen - 2) {
            addClassName(dots[1],hideClaName);
        }
        if(dotCurrIndex <= dotPageLen - 2) {
            activedIndex = 1;
            dotPageNums[0].innerHTML = dotCurrIndex;
            dotPageNums[1].innerHTML = dotCurrIndex + 1;
            dotPageNums[2].innerHTML = dotCurrIndex + 2;   
            if(dotCurrIndex < dotPageLen - 2) {
                removeClassName(dots[1],hideClaName);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        } else if(dotCurrIndex === dotPageLen - 1) {
            activedIndex = 2;
            dotPageNums[0].innerHTML = dotCurrIndex - 1;
            dotPageNums[1].innerHTML = dotCurrIndex;
            dotPageNums[2].innerHTML = dotCurrIndex + 1;
        }
        addClassName(dotPageNums[activedIndex],activedClaName);
    }

    // 上一页点击事件
    addEvent(dotPrevBtn,'click',handleClickPrevBtn);
    function handleClickPrevBtn() {
        if(dotCurrIndex === 0) return;
        if(dotPageLen <= 3) {
            removeClassName(dotPageNums[dotCurrIndex--],activedClaName);
            addClassName(dotPageNums[dotCurrIndex],activedClaName);
        } else if(dotCurrIndex > 1){
            dotCurrIndex--;
            if(dotCurrIndex === dotPageLen - 2) {
                addClassName(dotPageNums[1],activedClaName);
                removeClassName(dotPageNums[0],activedClaName);
                removeClassName(dotPageNums[2],activedClaName);
            }
            if(dotCurrIndex < dotPageLen - 2) {
                dotPageNums[0].innerHTML = dotCurrIndex;
                dotPageNums[1].innerHTML = dotCurrIndex + 1;
                dotPageNums[2].innerHTML = dotCurrIndex + 2;
            }
            if(dotCurrIndex === dotPageLen - 3) {
                removeClassName(dots[1],hideClaName);
            }
            if(dotCurrIndex === 1) {
                addClassName(dots[0],hideClaName);
                removeClassName(dots[1],hideClaName);
            }
        } else if(dotCurrIndex === 1) {
            dotCurrIndex--;
            removeClassName(dotPageNums[1],activedClaName);
            addClassName(dotPageNums[0],activedClaName);
        }
        if(dotCurrIndex === dotPageLen - 2) {
            removeClassName(dotNextBtn,disabledClaName);
        }
        if(dotCurrIndex === 0) {
            addClassName(dotPrevBtn,disabledClaName);
        }
    }

    // 下一页点击事件
    addEvent(dotNextBtn,'click',handleClickNextBtn);
    function handleClickNextBtn() {
        if(dotCurrIndex === dotPageLen - 1) return;
        if(dotPageLen <= 3) {
            removeClassName(dotPageNums[dotCurrIndex++],activedClaName);
            addClassName(dotPageNums[dotCurrIndex],activedClaName);
        } else if(dotCurrIndex < dotPageLen - 2) {
            dotCurrIndex++;
            if(dotCurrIndex === 1) {
                addClassName(dotPageNums[1],activedClaName);
                removeClassName(dotPageNums[0],activedClaName);
                removeClassName(dotPageNums[2],activedClaName);
            } else if(dotCurrIndex > 1) {
                dotPageNums[0].innerHTML = dotCurrIndex;
                dotPageNums[1].innerHTML = dotCurrIndex + 1;
                dotPageNums[2].innerHTML = dotCurrIndex + 2;
            }
            if(dotCurrIndex >= dotPageLen - 2) {
                addClassName(dots[1],hideClaName);
                removeClassName(dots[0],hideClaName);
            } 
            if(dotCurrIndex === 2) {
                removeClassName(dots[0],hideClaName);
            }
        } else if(dotCurrIndex === dotPageLen - 2) {
            dotCurrIndex++;
            removeClassName(dotPageNums[1],activedClaName);
            addClassName(dotPageNums[2],activedClaName);
        }
        if(dotCurrIndex === 1) {
            removeClassName(dotPrevBtn,disabledClaName);
        }
        if(dotCurrIndex === dotPageLen - 1) {
            addClassName(dotNextBtn,disabledClaName);
        }
    }

    // 点击页数
    for(let i = 0; i < dotPageNums.length; i++) {
        let page = dotPageNums[i];
        if(!page.classList.contains('rq-pagination-item-hide')) {
            addEvent(page,'click',clickPage.bind(null,page));
        }
    }

    function clickPage(page) {
        let idx = +page.innerHTML - 1;
        if(idx === dotCurrIndex) return;
        if(dotPageLen <= 3) {
            addClassName(dotPageNums[idx],activedClaName);
            removeClassName(dotPageNums[dotCurrIndex],activedClaName);
            if(idx === dotPageLen - 1) {
                addClassName(dotNextBtn,disabledClaName);
                removeClassName(dotPrevBtn,disabledClaName); 
            } 
            else if(idx === 1 && dotPageLen === 3) {
                removeClassName(dotPrevBtn,disabledClaName);
                removeClassName(dotNextBtn,disabledClaName);
            }
        } else if(idx >= 1 && idx <= dotPageLen - 2){
            // debugger;
            dotPageNums[0].innerHTML = idx;
            dotPageNums[1].innerHTML = idx + 1;
            dotPageNums[2].innerHTML = idx + 2;
            addClassName(dotPageNums[1],activedClaName);
            removeClassName(dotPageNums[0],activedClaName);
            removeClassName(dotPageNums[2],activedClaName);
            if(idx === 1) {
                addClassName(dots[0],hideClaName);
            } else if(idx === dotPageLen - 2) {
                addClassName(dots[1],hideClaName);
                removeClassName(dots[0],hideClaName);
            } else if(idx === 1) {
                removeClassName(dots[0],hideClaName);
            }
            if(idx === 2) {
                removeClassName(dots[0],hideClaName);
            }
            if(idx === dotPageLen - 3) {
                // debugger;
                removeClassName(dots[1],hideClaName);
                if(dotPageLen > 4) {
                    removeClassName(dots[0],hideClaName);
                }
            }
            removeClassName(dotPrevBtn,disabledClaName);
            removeClassName(dotNextBtn,disabledClaName);
        } else if(idx === dotPageLen - 1) {
            addClassName(dotPageNums[2],activedClaName);
            removeClassName(dotPageNums[1],activedClaName);
            removeClassName(dotPrevBtn,disabledClaName);
            addClassName(dotNextBtn,disabledClaName);
        }
        if(idx === 0) {
            addClassName(dotPrevBtn,disabledClaName);
            removeClassName(dotNextBtn,disabledClaName);
            addClassName(dotPageNums[0],activedClaName);
            removeClassName(dotPageNums[1],activedClaName);
        }
        dotCurrIndex = idx;
    }
    // 省略号的点击事件
    for(let i = 0; i < 2; i++) {
        addEvent(dots[i],'click',handleClickDot.bind(null,i));
    }
    function handleClickDot(dotIndex) {
        if(dotIndex === 0) {
            if(dotCurrIndex === dotPageLen - 1) {
                dotCurrIndex -= 3;
            } else {
                dotCurrIndex -= 2;
            }
        } else {
            if(dotCurrIndex === 0) {
                dotCurrIndex += 3;
            } else {
                dotCurrIndex += 2;
            }
        }
        if(dotCurrIndex === 0) {
            addClassName(dotPrevBtn,disabledClaName);
            removeClassName(dotNextBtn,disabledClaName);

            addClassName(dotPageNums[0],activedClaName);
            removeClassName(dotPageNums[1],activedClaName);
            removeClassName(dotPageNums[2],activedClaName);

            removeClassName(dots[1],hideClaName);
            addClassName(dots[0],hideClaName);

            dotPageNums[0].innerHTML = dotCurrIndex + 1;
            dotPageNums[1].innerHTML = dotCurrIndex + 2;
            dotPageNums[2].innerHTML = dotCurrIndex + 3;

        } else if(dotCurrIndex >= 1 && dotCurrIndex <= dotPageLen - 2) {
            removeClassName(dotPrevBtn,disabledClaName);
            removeClassName(dotNextBtn,disabledClaName);

            addClassName(dotPageNums[1],activedClaName);
            removeClassName(dotPageNums[0],activedClaName);
            removeClassName(dotPageNums[2],activedClaName);

            if(dotCurrIndex < dotPageLen - 2) {
                removeClassName(dots[1],hideClaName);
            }
            if(dotCurrIndex === dotPageLen - 2) {
                removeClassName(dots[0],hideClaName);
                addClassName(dots[1],hideClaName);
            }

            if(dotCurrIndex > 1) {
                removeClassName(dots[0],hideClaName);
            } 
            if(dotCurrIndex === 1) {
                addClassName(dots[0],hideClaName);
            }

            dotPageNums[0].innerHTML = dotCurrIndex;
            dotPageNums[1].innerHTML = dotCurrIndex + 1;
            dotPageNums[2].innerHTML = dotCurrIndex + 2;
        } else{
            removeClassName(dotPrevBtn,disabledClaName);
            addClassName(dotNextBtn,disabledClaName);

            addClassName(dotPageNums[2],activedClaName);
            removeClassName(dotPageNums[0],activedClaName);
            removeClassName(dotPageNums[1],activedClaName);

            addClassName(dots[1],hideClaName);
            removeClassName(dots[0],hideClaName);

            dotPageNums[0].innerHTML = dotCurrIndex - 1;
            dotPageNums[1].innerHTML = dotCurrIndex;
            dotPageNums[2].innerHTML = dotCurrIndex + 1;
        }
        
    }
})(window,document)