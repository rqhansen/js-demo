(function(window,document){

	function slideNav(className,option) {
		if(!className) {
			throw new Error('className can not be empty');
		}
		if(typeof className !== 'string') {
			throw new Error('className needs a correct name');
		}
		if(!/^[a-zA-Z]/i.test(className)) {
			throw new Error('className should starts with letter');
		}
		if(!this instanceof slideNav) {
			return new SlideNav(className,option);
		}	
		//菜单对象
		this.menu = document.getElementsByClassName(className)[0];
		//执行动画的步调
		this.step = 5;
		//显示下拉菜单时，初始的step值
		this.initShowStep = -100;
		//隐藏下拉菜单时，初始的值
		this.initCloseStep = 0;
		//显示、隐藏执行完的回调函数
		if(option) {
			if(typeof option.step === 'number') {
				var step = option.step;
				this.step = step > 100 ? 100 : step;
			}	
			if(typeof option.onAfterShow === 'function') {
				this.onAfterShow = option.onAfterShow
			}
			if(typeof option.onAfterHide === 'function') {
				this.onAfterHide = option.onAfterHide;
			}
		}
		if(typeof this.show !== 'function'){
			var proto = slideNav.prototype;
			//显示
			proto.showNav = function() {
				window.requestAnimationFrame(this.show);
			}
			//隐藏
			proto.closeNav = function() {
				window.requestAnimationFrame(this.hide);
			}
			//显示执行的动画
			proto.show = function() {
				this.initShowStep += this.step;
				if(this.initShowStep > 0) {
					this.initShowStep = 0; 
				}
				this.menu.style.transform = 'translate3d(0,' + this.initShowStep + '%,0)';
				if(this.initShowStep < 0 ) {
					window.requestAnimationFrame(this.show);
				} else if(this.initShowStep === 0){ //动画执行完
					this.initShowStep = -100;
					if(this.onAfterShow) {
						this.onAfterShow();
					}
				}
			}.bind(this);
			//隐藏执行动画
			proto.hide = function() {
				this.initCloseStep -= this.step;
				if(this.initCloseStep < -100) {
					this.initCloseStep = -100;
				}
				this.menu.style.transform = 'translate3d(0,' + this.initCloseStep + '%,0)';
				if(this.initCloseStep > -100) {
					window.requestAnimationFrame(this.hide);
				} else { //动画执行完
					this.initCloseStep = 0;
					if(this.onAfterHide) {
						this.onAfterHide();
					}
				}
			}.bind(this);
		}
	}

	window.slideNav = slideNav;
})(window,document);