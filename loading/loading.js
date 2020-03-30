;(function(window,document) {
    let btn1 = getEleById('rqBtn1');
    let btn2 = getEleById('rqBtn2')
    let indictor1 = getEleById('rqIndictor1');
    let indictor2 = getEleById('rqIndictor2');
    
    btn1.addEventListener('click',() => {
        indictor1.classList.add('show');
        setTimeout(() => {
            indictor1.classList.remove('show');
        },2000);
    },false);

    btn2.addEventListener('click',() => {
        indictor2.classList.add('show');
        setTimeout(() => {
            indictor2.classList.remove('show');
        },2000);
    },false);
    
    function getEleById(id) {
        return document.getElementById(id);
    }
})(window,document);
