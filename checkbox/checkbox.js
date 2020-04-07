;(function(window,document) {
    let checkboxs = Array.from(document.getElementsByClassName('rq-checkbox-input'));
    let choiceVal = document.getElementsByClassName('rq-choice-value')[0];
    let selects = [];
    checkboxs.forEach(checkbox =>{
        checkbox.addEventListener('change',(e) => {
            let value = checkbox.value;
            if(!checkbox.checked) {
                selects = selects.filter(item =>item != value);
            } else if(!selects.includes(value)) {
                selects.push(value);
            }
            choiceVal.innerHTML = `选择了：${selects.join('，')}`;
        },false);
    });
})(window,document);