

////////////////// Selecting a random Pair and do speed buttons //////////////////


var A, B, C, D, c, d, timer, speed = 3, speeder = 5000, maxSpeed = 10;

A = B = C = D = null

onUpdate.push(buttonPress)

function buttonPress(fn) {
	clearTimeout(timer);
	timer = setInterval(select, speeder/speed);
	x = document.getElementsByClassName('line')[0];
	if (x) x.style.visibility = "hidden";
}

function deg(a, b) {
	return Math.atan2(parseInt(b.top) - parseInt(a.top), parseInt(b.left) - parseInt(a.left)) * 180 / Math.PI;
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

function select() {
	var nr = nrOfAccounts()

	do {
		var a = Math.floor(Math.random() * nr)
		var b = Math.floor(Math.random() * nr)
	} while (a == b || nr > 2 && (a == c || b == d || a == d && b == c) || a == c && b == d);
	c = a; d = b;

	//color red is 'from' and green is 'to', A --> B
	A = getAccount(a).figure
	B = getAccount(b).figure

	if (C && typeof bulbOff == 'function') bulbOff(C, D)
	if (typeof bulbOn == 'function') bulbOn(A, B)
	C = A; D = B;
}

function speedUp() {
	speed++;
	if (speed > maxSpeed) speed = 100;
	clearTimeout(timer);
	timer = setInterval(select, speeder/speed);
}

function speedDn() {
	speed--;
	if (speed < 1) speed = 1;
	if (speed > maxSpeed) speed = maxSpeed;
	clearTimeout(timer);
	timer = setInterval(select, speeder/speed);
}

setTimeout(speedButtons, 200)
function speedButtons() {
	var x = document.getElementById('buttons_speedDn_speedUp');
	if (!x) return;
	appendStringAsNodes(x, "<input onclick='speedDn();' class='but' type='button' value='-' />");
	appendStringAsNodes(x, "<input onclick='speedUp();' class='but' type='button' value='+' />");
}
