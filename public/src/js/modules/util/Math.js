/**
* 수학연산 Util
* @author uncha
*/
export class Math{
	constructor(){

	}
	
	/*
	* 1차 함수 
	* tg의 start:min = end:max 비례식 값 얻기
	*
	* @param {Number} tg - 비교대상이될 값
	* @param {Number} start - 시작 값
	* @param {Number} end - 종료 값
	* @param {Number} min - 최소 값
	* @param {Number} max - 최대 값
	*/
	static linearFunction(tg, start, end, min, max){
		if(arguments.length < 5) throw new Error('전달인자가 정확하지 않습니다.');
		
		let result = (tg - start) * (max - min) / (end - start) + min;
		
		if(max > min){
			if(result < min) result = min;
			if(result > max) result = max;
		} else {
			if(result > min) result = min;
			if(result < max) result = max;
		}

		return result;
	}
}