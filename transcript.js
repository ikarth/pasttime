
let lastUtterance = undefined;
function transcribeBookPassage(insertText) {
	if (lastUtterance == insertText) {
		//return;
	}
	document.querySelector("#book").insertAdjacentHTML('beforeend', insertText);
	lastUtterance = insertText;
}