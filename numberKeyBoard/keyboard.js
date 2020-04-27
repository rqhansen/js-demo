;(function(window,document){
    let defKeyBoardIpt = getEleById('defKeyBoardIpt');
    let defKeyBoard = getEleById('defKeyBoard');
    let defClose = getEleById('defClose');
    let rqKeys = getElesByClassName('rq-key');
    let iptWrap = getElesByClassName('rq-input')[0];
    let isClosing = false;

    addEvent(defKeyBoardIpt,'click',showDefaultKeyBoard);
    addEvent(defClose,'click',closeDefKeyBoard);

    function showDefaultKeyBoard() {
        if(defKeyBoard.style.display === 'block') return;
        defKeyBoard.style.display = 'block';
        addClassName(defKeyBoard,'rq-slide-up-enter');
        setTimeout(() =>{
            removeClassName(defKeyBoard,'rq-slide-up-enter');
        },300);
    }

    function closeDefKeyBoard() {
        if(isClosing) return;
        isClosing = true;
        addClassName(defKeyBoard,'rq-slide-up-leave');
        setTimeout(() =>{
            removeClassName(defKeyBoard,'rq-slide-up-leave');
            defKeyBoard.style.display = 'none';
            isClosing = false;
        },300);
    }

    for(let i = 0,len = rqKeys.length; i<len; i++) {
        let key = rqKeys[i];
        addEvent(key,'click',clickKey.bind(null,i));
    }

    function clickKey(index) {
        let val = defKeyBoardIpt.value || '';
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
                defKeyBoardIpt.value = `${val}${index+1}`;
                break;
            case 9: // 小数点
                if(!val || val.indexOf('.') != '-1') return;
                defKeyBoardIpt.value = `${val}.`;
                break;
            case 10: // 0
                if(!val) return;
                defKeyBoardIpt.value = `${val}0`;
                break;
            case 11: // 删除
                if(!val) return;
                defKeyBoardIpt.value = val.substring(0,val.length - 1);
                break;
            default:
                break;
        }
    }

    // 点击键盘其它地方收起键盘
    addEvent(document,'click',(e) => {
        let clickedEle = e.target;
        if(!iptWrap.contains(clickedEle) && !defKeyBoard.contains(clickedEle)) {
            if(isClosing || defKeyBoard.style.display === 'none') return;
            closeDefKeyBoard();
        }
    });
    
})(window,document);