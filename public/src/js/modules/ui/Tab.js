/**
* 탭
* @author uncha
* 
* @constructor
* @param {String} tab - 탭 리스트 선택자
* @param {String} tabCont - 탭 선택시 보여질 콘텐츠 리스트 선택자
* @param {Number} fadeTime - 탭 전환 fade효과 시간 설정(생략 가능)
*/
export class Tab{
	constructor({
		tab='',
		tabCont='',
		fadeTime=0
	}){
		if(!tab || !tabCont) throw new Error('tab과 tabCont의 선택자가 전달되지 않았습니다.');

		_(this).$tab = $(tab);
		_(this).$tabCont = $(tabCont);
		_(this).fadeTime = fadeTime;

		this.addEvent();
	}

	/*
	* 초기 이벤트 생성
	*/
	addEvent(){
		let _this = _(this);

		_this.$tab.on('click', function(e){
			e.preventDefault();

			_this.$tab.removeClass('on');
			$(this).addClass('on'); 

			_this.$tabCont.stop().fadeOut(0);
			_this.$tabCont.eq($(this).index()).stop().fadeIn(_this.fadeTime);
		});

		_this.$tab.eq(0).trigger('click');
	}
}