/**
* 슬라이더
* @author uncha
* 
* @constructor
* @param {jQuery} wrap - 슬라이더 wrapper
* @param {jQuery} slideList - 슬라이더의 개별 리스트
* @param {jQuery} paging - 페이지를 표시할 리스트(생략 가능)
* @param {jQuery} btnAuto - 자동 플레이 버튼(생략 가능)
* @param {Boolean} useAutoPlay - 자동 플레이 사용 유, 무(생략 가능)
* @param {jQuery} prevBtn - 이전 버튼(생략 가능)
* @param {jQuery} nextBtn - 다음 버튼(생략 가능)
* @param {Function} slideStart - 슬라이드 시작 콜백(생략 가능)
* @param {Function} slideEnd - 슬라이드 끝 콜백(생략 가능)
*/
export class Slider{
	constructor({
		wrap, 
		slideList, 
		paging=$(''), 
		btnAuto=$(''), 
		useAutoPlay=true, 
		autoPlayTime=5000, 
		prevBtn=$(''), 
		nextBtn=$(''),
		slideStart=function(){},
		slideEnd=function(){}
	}){
		if(!wrap) throw new Error('전달인자 wrap은 필수항목 입니다.');
		if(!slideList) throw new Error('전달인자 slideList는 필수항목 입니다.');
		
		// jQuery El
		_(this).$wrap = wrap;
		_(this).$slideList = slideList;
		_(this).$paging = paging;
		_(this).$btnAuto = btnAuto;
		_(this).$prevBtn = prevBtn;
		_(this).$nextBtn = nextBtn;
		// callback
		_(this).slideStart = slideStart;
		_(this).slideEnd = slideEnd;
		// default variable
		_(this).current = 0;
		_(this).timerId;
		_(this).autoPlay = true;
		_(this).useAutoPlay = useAutoPlay;
		_(this).autoPlayTime = autoPlayTime;
		
		this.addEvent();
		this.timer();
	}

	/*
	* 초기 이벤트 생성
	*/
	addEvent(){
		let $this = this;
		let _this = _(this);

		_(this).$paging.on('click.Slider', function(e){
			e.preventDefault();

			let i = $(this).index();
			let direction = (_this.current < i) ? 'right' : 'left';
			
			$this.move(i, direction);
		});

		_(this).$btnAuto.on('click.Slider', function(e){
			e.preventDefault();

			if($(this).hasClass('pause')){
				$(this).removeClass('pause').addClass('play');
				_this.autoPlay = false;
				clearTimeout(_this.timerId);
			} else {
				$(this).removeClass('play').addClass('pause');
				_this.autoPlay = true;
				$this.timer();
			}
		});

		_(this).$nextBtn.on('click.Slider', function(e){
			e.preventDefault();

			let i = 0;
			let len = _this.$slideList.length-1;
			if(_this.current == len){
				i = 0;
			} else {
				i = _this.current + 1;
			}

			$this.move(i);
		});

		_(this).$prevBtn.on('click.Slider', (e)=>{
			e.preventDefault();

			let i = 0;
			if(_this.current == 0){
				let len = _this.$slideList.length-1;
				i = len;
			} else {
				i = _this.current - 1;
			}

			$this.move(i, 'left');
		});
	}

	/*
	* 슬라이드 실행 함수
	*
	* @param {Number} i - 활성화 시킬 슬라이드 index
	* @param {String} direction - 슬라이드 방향 left, right(생략 가능)
	*/
	move(i, direction='right'){
		if(_(this).current == i) return;

		let $current = _(this).$slideList.eq(_(this).current);
		let $next = _(this).$slideList.eq(i);

		_(this).$paging.removeClass('on');
		_(this).$paging.eq(i).addClass('on');

		let $this = this;
		let _this = _(this);
		//let direction = (_(this).current < i) ? 'right' : 'left';

		_(this).slideStart.call(this, i);

		if(direction == 'right'){
			$current.css({left:0}).animate({left:'-100%'}, {queue:false, duration:600, ease:'easeOutCubic'});
			$next.css({left:'100%'}).animate({left:0}, {queue:false, duration:600, ease:'easeOutCubic', complete:()=>{
				if(_this.autoPlay) $this.timer();
				_this.slideEnd.call($this, i);
			}});
		} else {
			$current.css({left:0}).animate({left:'100%'}, {queue:false, duration:600, ease:'easeOutCubic'});
			$next.css({left:'-100%'}).animate({left:0}, {queue:false, duration:600, ease:'easeOutCubic', complete:()=>{
				if(_this.autoPlay) $this.timer();
				_this.slideEnd.call($this, i);
			}});
		}

		_(this).current = i;
	}

	/*
	* 자동 슬라이드
	*/
	timer(){
		if(!_(this).useAutoPlay) return;

		clearTimeout(_(this).timerId);

		let _this = _(this);
		let $this = this;
		_(this).timerId = setTimeout(()=>{
			let i = _this.current;
			let len = _this.$slideList.length-1;
			(i==len) ? i=0 : i++;
			$this.move(i);
		}, _(this).autoPlayTime);
	}
}