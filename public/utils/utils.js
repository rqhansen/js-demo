
//获取css3属性在不同浏览器中的表达
function getWholeCssProperty(property) {
	var cases = ['-webkit-','-moz-','-ms-','-o-',''];
	var ds = document.createElement('div').style;
	for(var i = 0,len = cases.length;i<len;i++) {
		var nProperty = camelCase(cases[i] + property);
		if(nProperty in ds) {
			return nProperty;
		}
	}
	return property;
}

// -webkit-transform 转为 WebkitTransform (WebkitTransform,MozTransform,msTransform,OTransform,transform)
function camelCase(str) {
	 return (str + '').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter) {
		return (letter + '').toUpperCase();
	})
}

function addEvent(obj,type,fn) {
	if(obj.addEventListener !== 'undefined') {
		obj.addEventListener(type,fn,false);
	} else if (obj.attachEvent !== 'undefined') {
		obj.attachEvent(type,fn,false);
		fn.call(obj,window.event);
	}
}

function addClassName(el,claName) {
	if(!el) throw new Error('element can not be empty');
	if(!claName) throw new Error('className can not be empty');
	!el.classList.contains(claName) && el.classList.add(claName);
}

function removeClassName(el,claName) {
	if(!el) throw new Error('element can not be empty');
	if(!claName) throw new Error('className can not be empty');
	el.classList.contains(claName) && el.classList.remove(claName);
}

function getEleComputedStyle(ele) {
	return window.getComputedStyle(ele,null);
}

function getEleById(id) {
	if(!id) throw new Error('id can not be empty');
	return document.getElementById(id);
}

function getElesByClassName(claName) {
	if(!claName) throw new Error('className can not be empty');
	return document.getElementsByClassName(claName);
}

function getClientHeight() {
	return window.innerHeight ||  document.documentElement.clientHeight || document.body.clientHeight;
}