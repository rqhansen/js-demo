;(function(window,document) {
    let overLays = getElesByClassName('rq-overlay');
    let popups = getElesByClassName('rq-popup');
    let cells = getElesByClassName('rq-cell');

    addEvent(cells[0],'click',showOverLay);
    addEvent(overLays[0],'click',hideOverLay);

    // 基本用法
    
    // 显示
    function showOverLay() {
        overLays[0].style.display = 'block';
        popups[0].style.display = 'block';
        setTimeout(showOverLayOpcity);
    }

    function showOverLayOpcity() {
        overLays[0].style.opacity = '1';
        popups[0].style.opacity = '1';
    }
    // 隐藏
    function hideOverLay() {
        overLays[0].style.opacity = '0';
        popups[0].style.opacity = '0';
        setTimeout(() => {
            overLays[0].style.display = 'none';
            popups[0].style.display = 'none';
        },300)
    }

    // 顶部、底部弹出
    let locOverLay = overLays[1];
    let locPopup = popups[1];
    // 顶部弹出隐藏
    addEvent(cells[1],'click',() => {
        topShowOverLay('rq-popup-top');
    });
    addEvent(locOverLay,'click',() => {
        hideLocOverLay('rq-popup-top');
    });

    // 底部弹出隐藏
    addEvent(cells[2],'click',() => {
        topShowOverLay('rq-popup-bottom');
    });
    addEvent(locOverLay,'click',() => {
        hideLocOverLay('rq-popup-bottom');
    });

    function topShowOverLay(popupClaName) {
        addClassName(locPopup,popupClaName);
        locOverLay.style.display = 'block';
        locPopup.style.display = 'block';
        setTimeout(() => {
            locOverLay.style.opacity = '1';
            locPopup.style.height = '30%';
        });
    }

    function hideLocOverLay(popupClaName) {
        locOverLay.style.opacity = '0';
        locPopup.style.height = '0';
        setTimeout(() => {
            locOverLay.style.display = 'none';
            locPopup.style.display = 'none';
            removeClassName(locPopup,popupClaName);
        },300)
    }

    // 左、右弹出
    let disOverLay = overLays[2];
    let disPopup = popups[2];
    // 左弹出、隐藏
    addEvent(cells[3],'click',() => {
        showDisOverLay('rq-popup-left');
    });

    addEvent(disOverLay,'click',() => {
        hideDisOverLay('rq-popup-left');
    })

    // 右弹出隐藏
    addEvent(cells[4],'click',() => {
        showDisOverLay('rq-popup-right');
    });

    addEvent(disOverLay,'click',() => {
        hideDisOverLay('rq-popup-right');
    })

    function showDisOverLay(popupClaName) {
        addClassName(disPopup,popupClaName);
        disOverLay.style.display = 'block';
        disPopup.style.display = 'block';
        setTimeout(() => {
            disOverLay.style.opacity = '1';
            disPopup.style.width = '30%';
        });
    }

    function hideDisOverLay(popupClaName) {
        disOverLay.style.opacity = '0';
        disPopup.style.width = '0';
        setTimeout(() =>{
            disPopup.style.display = 'none';
            disOverLay.style.display = 'none';
            removeClassName(disPopup,popupClaName);
        },300)
    }

})(window,document);