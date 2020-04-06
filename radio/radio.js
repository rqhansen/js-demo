;(function () {
    let radios = Array.from(document.getElementsByClassName('rq-radio-input'));
    let radioVal = document.getElementById('radioVal');
    radios.forEach(radio =>{
        radio.addEventListener('change',(e) =>{
            let checked = e.target.checked;
            if(checked) {
                radioVal.innerHTML = `选择了：选项 ${e.target.value}`;
            }

        },false);
    })
    
})(window,document);