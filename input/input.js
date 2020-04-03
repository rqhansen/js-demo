;(function(window,document){

    let integerIpt = getEleById('integerIpt');
    let numIpt = getEleById('numInput');

    // 输入过程中触发
    integerIpt.addEventListener('input',(e) => {
        handleIntegerIpt(e);
    },false);

    // 输入框失焦后才可能触发
    integerIpt.addEventListener('change',(e) =>{
        handleIntegerChange(e);
    },false);

    numIpt.addEventListener('input',(e) => {
        handleNumIpt(e);
    });

    numIpt.addEventListener('change',(e) => {
        handleNumChange(e);
    })

    function handleIntegerIpt(e) {
        let val = e.target.value;
        // 阻止输入以'0'开头的数字
        val = val.replace(/^0/g,'');
        // 替换非数字为''
        e.target.value = val.replace(/[^\d]/g,'');
    }

    function handleIntegerChange(e) {
        console.log('onchange');
    }

    function handleNumIpt(e) {
        let val = e.target.value;
        // 清除'数字'和'.'以外的字符
        val = val.replace(/[^\d\.]/g,'');
        // 验证第一个字符是'数字'，而不是'.'或者'0'
        val = val.replace(/^[0\.]/g,'');
        // 只保留第一个.,清除多余的.
        val = val.replace(/\.{2,}/g,'.');
        // 替换掉间隔性输入的'.'
        val = val.replace('.','$=$').replace(/\./g,'').replace('$=$','.');
        // 保留两位小数
        val = val.replace(/(^\d+)(\.\d{0,2})?(.*)$/,'$1$2');
        e.target.value = val;
    }

    function handleNumChange(e) {
        let val = e.target.value;
        // 去掉数字末尾的'.'
        e.target.value = val.replace(/\.$/,'');
    }

    function getEleById(id) {
        return document.getElementById(id);
    }
})(window,document);