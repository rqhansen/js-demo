;(function(window,document) {
    let btn = getEleById('rqBtn');
    let indictor = getEleById('rqIndictor');
    
    btn.addEventListener('click',() => {
        indictor.classList.add('show');
        setTimeout(() => {
            indictor.classList.remove('show');
        },2000);
    },false);
    
    function getEleById(id) {
        return document.getElementById(id);
    }
})(window,document);
