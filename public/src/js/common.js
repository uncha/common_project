import {Popup as UIPopup} from '/resources/js/modules/ui/Popup.js';

// define Popup
window.definePopup = function(param){
	const popup = new UIPopup(param);
	return popup;
}