
/*
			- Circular things in a circle -

			<div id='coins'></div>
*/

var coins, nr = 0;
var lst = []
var w = window,
		d = document,
		e = d.documentElement,
		g = d.body;

function figSize() { //width = height = figSize
	return 40;
}

function getW() {
	return w.innerWidth || e.clientWidth || g.clientWidth;
}
function getH() {
	return w.innerHeight|| e.clientHeight|| g.clientHeight;
}

function nrOfAccounts() {
	return nr;
}

function getAccount(nr) {
	return lst[nr];
}

////////////////// Create and remove Accounts //////////////////

var onUpdate = [];

setTimeout(init, 100);
function init() {
	coins = document.getElementById('buttons_dec_inc');
	if (!coins) {
		coins = document.createElement("DIV");
		document.body.appendChild(coins);
	}
	else {
		appendStringAsNodes(coins, "<input onclick='dec();' class='but' type='button' value='-' />");
		appendStringAsNodes(coins, "<input onclick='inc();' class='but' type='button' value='+' />");
	}
	inc(); setTimeout(function() {inc();}, 50);
}

var view_images_only = true;
var fig, figs = 0, letter, stop = false, no_images = false;
function inc() {
	if (nr > 24 + figs || stop) return;
	if (typeof buttonPress == 'function') onUpdate.forEach(function(f) { f("inc"); });
	var fig = new Object
	lst.push(fig)
	nr++;

	letter = String.fromCharCode(64 + nr);
	var file = "url('faces/" + letter + ".png')";
	var myImage = new Image();
	myImage.src = "faces/" + letter + ".png";
	myImage.onerror = function(){
		if (nr < 2) no_images = true;
		file = "";
		if (!figs) figs = nr;
		fig.figure.innerHTML = "<b>" + String.fromCharCode(65 + nr - figs) + "</b>";
		if (view_images_only && !no_images) { stop = true; dec(); }
	}
	appendStringAsNodes(coins, "<div id='fig" + nr + "' class='fig tooltip'><a href='http://www.freepik.com'><span class='tooltiptext'>www.Freepik.com</span></a></div>");
	fig.figure = document.getElementById('fig' + nr);

	var style = fig.figure.style;
	style.width = figSize() + "px";
	style.height = figSize() + "px";
	style.lineHeight = figSize() + "px"; /* http://stackoverflow.com/questions/8865458/how-to-vertically-center-text-with-css */
	style.textShadow = "0 0 " + figSize()/2 + "px white, 0 0 2px #666";

	style.backgroundImage = file;

	relocate()
}

function dec() {
	if (nr < 3) return;
	if (typeof buttonPress == 'function') onUpdate.forEach(function(f) { f("dec"); });
	var o = lst[nr - 1].figure
	o.style.display = 'none';
	coins.removeChild(o);
	delete o
	nr--;
	delete lst.pop()
	relocate()
}

function relocate() {
	for (var i = 0; i < nr; i++) position(lst[i], i)
}

function position(target, i) {
	if (!target) return;
	var radians = (i + 1) * 2 * Math.PI / nr
	var radius = getW() < getH()? getW()/2: getH()/2
	radius -= radius / 4
	var x = getW()/2 -10 + (Math.cos(radians) * radius);
	var y = getH()/2 -10 + (Math.sin(radians) * radius);
	target = target.figure;
	target.style.left = x + "px";
	target.style.top =  y + "px";
}
