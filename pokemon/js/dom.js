// basic dom manipulation using vanilla js and jquery

// init ensures that the html file loads all the elements before the script runs
window.onload = init;

// example of DOM manipulation using vanilla javascript
function init(){
	var name = document.getElementById('pokemon-name');
	var last_name = document.createTextNode(' Pikapi');
	name.appendChild(last_name);
	document.body.appendChild(name);

	var opponent = document.getElementById('opponent-name');
	opponent.innerHTML = "RATATATATATATATA";

	var opponentIMG = document.getElementById('opponent-name');
}

// example of DOM manipulation using jquery
$(function(){
	var name = $('#pokemon-name');
	name.html('MIREYA');

	var img = $('#pokemon-sprite');
	img.attr('src', 'assets/back/squirtle.png');
});
