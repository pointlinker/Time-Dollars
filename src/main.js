
/////////////////////////////////////////////////////////////////////////////

var enable_flash = true;
var enable_line = true;
var enable_sound = true;
var enable_amount = true;
var enable_acount = true;

var line_thickness = 6;
var grow_after_x_transactions = 6;

// http://www.grsites.com/archive/sounds/category/1/?offset=0
var sounds = ['zap1', 'blip1', 'adder1', 'adder2', 'adder3', 'coin1', 'coin2', 'typer1', 'typer2', 'typer3', 'typer4'];

/////////////////////////////////////////////////////////////////////////////

//http://stackoverflow.com/questions/9334645/create-node-from-markup-string
function appendStringAsNodes(element, html) {
		var frag = document.createDocumentFragment(),
				tmp = document.createElement('body'), child;
		tmp.innerHTML = html;
		// Append elements in a loop to a DocumentFragment, so that the browser does
		// not re-render the document for each node
		while (child = tmp.firstChild) {
				frag.appendChild(child);
		}

		if (element === document.body) {
			element.insertBefore(frag, element.childNodes[0]);
		}
		else element.appendChild(frag); // Now, append all elements at once
		frag = tmp = null;
}

sounds.forEach(function(s, i) { sounds[i] = new Audio('sound/' + s + '.ogg');});

var snd2, move_sound = new Audio('sound/move.ogg');
var counter = 3;
var L1, L2, kredit, debet, flash;

setTimeout(startUpMain, 80);
function startUpMain() {

	//set 'false' to remove objects
	if (enable_amount) {
		appendStringAsNodes(document.body, "<div id='kredit' class='flyNr'></div>");
		appendStringAsNodes(document.body, "<div id='debet' class='flyNr'></div>");
	}
	if (enable_flash) appendStringAsNodes(document.body, "<div id='flash' class='hidden'></div>");
	if (enable_line) appendStringAsNodes(document.body, "<div class='line2'></div>");

	L1 = document.getElementsByClassName('line1')[0];
	L2 = document.getElementsByClassName('line2')[0];
	kredit = document.getElementById('kredit');
	debet = document.getElementById('debet');
	flash = document.getElementById('flash');

	onUpdate.push(function(){
		if (debet) debet.innerHTML = "";
		if (kredit) kredit.innerHTML = "";
		if (L1) L1.style.visibility = "hidden";
		if (L2) L2.style.visibility = "hidden";
		if (flash) flash.style.visibility = "hidden";
	})

	speedDn(); speedUp(); speedDn(); //exempel

}

function bulbOn(A, B) {

	A = A.style; B = B.style;
	A.backgroundColor = "#f99"; //red
	B.backgroundColor = "#9f9"; //green
	A.boxShadow = "#fff 0 0 20px"
	B.boxShadow = "#fff 0 0 20px"

	/// BEAM ///

	if (L1) {
		var line = L1.style;
		line.height = line_thickness;
		line.top = (parseInt(A.top) -(line_thickness/2) + figSize()/2) + "px"
		line.left = (parseInt(A.left) + figSize()/2) + "px"
		line.width = dist(parseInt(A.left), parseInt(A.top), parseInt(B.left), parseInt(B.top)) + "px"
		line.visibility = "visible";

		var s = "rotate(" + deg(A, B) + "deg)";
		//line.MozTransform = s; /*  */
		//line.OTransform = s; /*  */
		//line.msTransform = s; /* IE 9 */
		//line.webkitTransform = s; /* Safari */
		line.transform = s; /* Standard syntax */
	}
	if (L2) {
		var line = L2.style;
		line.height = line_thickness;
		line.top = (parseInt(A.top) -(line_thickness/2) + figSize()/2) + "px"
		line.left = (parseInt(A.left) + figSize()/2) + "px"
		line.width = dist(parseInt(A.left), parseInt(A.top), parseInt(B.left), parseInt(B.top)) + "px"
		line.visibility = "visible";

		var s = "rotate(" + deg(A, B) + "deg)";
		//line.MozTransform = s; /*  */
		//line.OTransform = s; /*  */
		//line.msTransform = s; /* IE 9 */
		//line.webkitTransform = s; /* Safari */
		line.transform = s; /* Standard syntax */
	}

	/// FLYING NUMBERS ///

	if (debet) {
		debet.style.left = (parseInt(A.left) + parseInt(B.left))/2
		debet.style.top = (parseInt(A.top) + parseInt(B.top))/2 + 10
	}
	if (kredit) {
		kredit.style.left = (parseInt(A.left) + parseInt(B.left))/2
		kredit.style.top = (parseInt(A.top) + parseInt(B.top))/2 + 10
	}

	if (flash) {
		flash.style.visibility = "visible";
		flash.style.left = (parseInt(A.left) + parseInt(B.left))/2 -20
		flash.style.top = (parseInt(A.top) + parseInt(B.top))/2 -20
		flash.className = 'visible';
		setTimeout(function() {
				flash.className = 'hidden';
		}, 300);
	}

	/* Simple JavaScript Tween v 0.2  - http://mattshaw.org/projects/simple-javascript-tweening
	 *
	 * [Arguments]
	 * o: Target element
	 * props: key/values object of props to tween
	 * durationSecs: duration of tween in seconds (not millis)
	 * onComplete: (optional) function to fire when tween is complete
	 * easef: (optional) easing function
	 */
	var x = Math.floor(Math.random() * 150) + 1;
	if (kredit) {
		tween(kredit, {left: parseInt(A.left), top: parseInt(A.top) - 30} ,1.3, null, Quad_easeInOut);
		kredit.innerHTML = -x;
	}
	if (debet) {
		tween(debet, {left: parseInt(B.left), top: parseInt(B.top) - 30} ,1.3, null, Quad_easeInOut);
		debet.innerHTML = "+" + x;
	}

	if (counter++ > grow_after_x_transactions) {
		inc();
		counter = 0;
		if (enable_sound) move_sound.play();
	}
	else {
		var snd;
		do snd = Math.floor(Math.random() * sounds.length);
		while (!snd || snd == snd2);
		snd2 = snd
		if (enable_sound) sounds[snd].play();
	}

}

function bulbOff(A, B) {

	//https://developer.mozilla.org/en/docs/Web/API/HTMLElement/dataset
	if (enable_acount && debet) {
		if (!B.dataset.acount) B.dataset.acount = 0
		if (!debet.innerHTML) debet.innerHTML = "0"
		B.dataset.acount = parseInt(B.dataset.acount) + parseInt(debet.innerHTML)
	}
	if (enable_acount && kredit) {
		if (!A.dataset.acount) A.dataset.acount = 0
		if (!kredit.innerHTML) kredit.innerHTML = "0"
		A.dataset.acount = parseInt(A.dataset.acount) + parseInt(kredit.innerHTML)
	}

	A = A.style; B = B.style;
	A.backgroundColor = "#789";
	B.backgroundColor = "#789";
	A.boxShadow = "#555 3px 3px 15px"
	B.boxShadow = "#555 3px 3px 15px"
}
