;(function(window,document) {
    let pwdNum = 6;
    let pwdIpt = getElesByClassName('rq-password-input')[0];
    let lists = pwdIpt.getElementsByTagName('li');
    let defKeyBoard = getEleById('defKeyBoard');
    let defClose = getEleById('defClose');
    let rqKeys = getElesByClassName('rq-key');
    let isClosing = false;
    let inputVal = '';
    let cursorEle = '';

    addEvent(document,'click',clickOut);
    addEvent(pwdIpt,'click',bounceKeyBoard);
    addEvent(defClose,'click',clickBtncloseKeyBoard);
    
    for(let i = 0,len = rqKeys.length; i<len; i++) {
        let key = rqKeys[i];
        addEvent(key,'click',clickKey.bind(null,i));
    }

    function clickBtncloseKeyBoard() {
        closeKeyBoard();
        if(inputVal.length < pwdNum) {
            removeCursor(inputVal.length);
        }
    }

    // 弹出键盘
    function bounceKeyBoard() {
        if(defKeyBoard.style.display === 'block') return;
        defKeyBoard.style.display = 'block';
        addClassName(defKeyBoard,'rq-slide-up-enter');
        if(inputVal.length < pwdNum) { 
            insertCursor(inputVal.length);
        }
        setTimeout(() =>{
            removeClassName(defKeyBoard,'rq-slide-up-enter');
        },300);
    }

    // 插入光标
    function insertCursor(insertIndex) {
        if(!cursorEle) {
            cursorEle = createCursor();
        }
        lists[insertIndex].appendChild(cursorEle);
    }

    // 移除光标
    function removeCursor(removeIndex) {
        lists[removeIndex].removeChild(lists[removeIndex].lastElementChild);
    }

    // 显示dot
    function showDot(dotIndex) {
        lists[dotIndex].firstElementChild.style.visibility = 'visible';
    }

    // 隐藏dot
    function hideDot(dotIndex) {
        lists[dotIndex].firstElementChild.style.visibility = 'hidden';
    }

    // 关闭键盘
    function closeKeyBoard() {
        if(isClosing) return;
        isClosing = true;
        addClassName(defKeyBoard,'rq-slide-up-leave');
        setTimeout(() => {
            removeClassName(defKeyBoard,'rq-slide-up-leave');
            defKeyBoard.style.display = 'none';
            isClosing = false;
        },300);
    }

    function clickKey(index) {
        let val = inputVal || '';
        switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 10: // 0
                if(inputVal.length === pwdNum) return;
                inputVal = `${val}${index === 10 ? 0 : index + 1}`;
                showDot(inputVal.length - 1);
                if(inputVal.length === pwdNum) { // 输满6位 
                    removeCursor(5);
                    closeKeyBoard();
                    console.log('输入的密码是:' + inputVal);
                    return;
                }
                insertCursor(inputVal.length);
                break;
            case 11: // 删除
                if(!val) return;
                if(inputVal.length < pwdNum) {
                    removeCursor(inputVal.length);
                }
                hideDot(inputVal.length - 1);
                inputVal = val.substring(0,val.length - 1);
                insertCursor(inputVal.length);
                break;
            default:
                break;
        }
    }

    // 点击其它区域收起键盘
    function clickOut() {
        if(defKeyBoard.style.display === 'none') return;
        let arg = arguments[0];
        let target = arg.target || arg.srcElement;
        if(!pwdIpt.contains(target) && !defKeyBoard.contains(target)) {
            clickBtncloseKeyBoard();
        }
    }

    // 创建模拟光标
    function createCursor() {
        let ele = document.createElement('div');
        addClassName(ele,'rq-password-input-cursor');
        return ele;
    }

})(window,document);