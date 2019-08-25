;(function(window,document){
	var FullPage = function FullPage(className,options) {

		//判断是函数创建还是new创建，可以使用FullPage(className,options) 或者 new FullPage('className',options)
		if(!(this instanceof FullPage)) {
			return new FullPage(className,options);
		}
		//屏容器的类名
		this.className = className;
		this.transformProperty = '';
		this.transitionProperty = '';
		//一屏的高度
		this.viewHeight = 0;
		//手指开始滑动的位置
		this.startY = 0;
		//滚动容器
		this.target = '';
		//屏数
		this.pageNum = 0;
		//当前屏索引
		this.currIndex = 0;
		//滚动计时器
		this.scrollTimer = '';
		//滑动一屏需要的时间
		this.scrollTime = (options && (options.scrollTime)) || 600;
		//滚动一屏后触发的函数
		this.scrollOverCallback = '';
		if(options) {
			var callback = options.scrollOverCallback;
			if(callback && typeof callback === 'function') {
				this.scrollOverCallback = callback;
			}
		}

		//使用必要条件检测，然后添加函数
		if(typeof this.init !== 'function') {
			var proto = FullPage.prototype;
			proto.constructor = FullPage;
			proto.init = function(){
				this.target = document.getElementsByClassName(this.className)[0];
				this.viewHeight = getClientHeight();
				this.transformProperty = getWholeCssProperty('transform');
				this.transitionProperty = getWholeCssProperty('transition');
				this.target.style[this.transformProperty] = 'translate3d(0,0,0)';
				this.setPageHeight().addFullPageScrollEvent();
			},

			proto.setPageHeight = function () {
				var pages = document.getElementsByClassName('page');
				this.pageNum = pages.length;
				for(var i = 0,len = pages.length;i<len;i++) {
					pages[i].style.height = this.viewHeight +'px';
				}
				return this;
			},

			proto.addFullPageScrollEvent = function() {
				addEvent(this.target,'touchstart',function (e) {
					this.touchstart(e);
				}.bind(this));
				addEvent(this.target,'touchmove',function (e) {
					this.touchmove(e);
				}.bind(this));
				addEvent(this.target,'touchend',function (e) {
					this.touchend(e);
				}.bind(this));
				return this;
			},

			proto.goUp = function () {
				var transformY = this.getTranslateY();
				if(transformY>0) {
					var dire = -(transformY - this.viewHeight);
					this.setTranslateY(dire);
					this.currIndex--;
					this.afterScrollDo();
				}
			},
			proto.goDown = function () {
				var transformY = this.getTranslateY();
				if(transformY < this.viewHeight *(this.pageNum - 1)) {
					var dire = -(transformY + this.viewHeight);
					this.setTranslateY(dire);
					this.currIndex++;
					this.afterScrollDo();
				}
			},
			proto.afterScrollDo = function (){
				if(this.scrollTimer) clearTimeout(this.scrollTimer);
				this.scrollTimer = setTimeout(function() {
					this.scrollOverCallback && this.scrollOverCallback();
				}.bind(this),this.scrollTime);
			},
			proto.touchstart = function (e) {
				this.startY = e.touches[0].pageY;
			},
			proto.touchmove = function (e) {
				e.preventDefault();
			},
			proto.touchend = function (e) {
				var endY = e.changedTouches[0].pageY;
				if(endY - this.startY < 0) { //手指上滑
					this.goDown();
				} else {
					this.goUp();
				}
			},
			proto.setTranslateY = function(dire) {
				this.target.style[this.transformProperty] = 'translate3d(0,'+ dire + 'px,0)';
				this.target.style[this.transitionProperty] = 'all '+ this.scrollTime/1000 + 's';
			},
			proto.getTranslateY = function() {
				return -this.target.style[this.transformProperty].split(',')[1].trim().slice(0,-2);
			}
		}
	}
	//暴露方法
	window.FullPage = FullPage;
})(window,document);