// this is the constructor for the move object, which are the logical moves of one pokemon
function move(name, remaining, total, damage) {
	this.name = name;
	this.remaining = remaining;
	this.total = total;
	this.damage = damage;
}

// constructer for moveObject, which are the actual elements in the html file
function moveObject(name, pp, img) {
  this.name = name;
  this.pp = pp;
  this.img = img;
}

$(function(){
  // trainer object
  var trainer = {
    // each attribute refers to the corresponding element in the html file
    name: $('#pokemon-name'),
    sprite: $('#pokemon-sprite'),
    level: $('#pokemon-level'),
    hpRemaining: $('#hp-remaining'),
    hpTotal: $('#hp-total'),
    hpBar: $('#pokemon-hp-bar'),

    // img and altImg are links to the pokemon assets for shorter coding
    img: 'assets/back/pikachu.png',
    altImg: 'assets/back/pikachu2.png',

    // logical moves (pure data; doesn't refer to html elements)
    // notice how use the move() constructor from above
    move1: new move('TACKLE', 20, 20, 2),
    move2: new move('SCRATCH', 15, 15, 3),
    move3: new move('TAIL WHIP', 25, 25, 1),
    move4: new move('SAND ATTACK', 25, 25, 1),
  }

  // opponent object
  var opponent = {
    // each attribute refers to the corresponding element in the html file
    name: $('#opponent-name'),
    sprite: $('#opponent-sprite'),
    level: $('#opponent-level'),
    hpBar: $('#opponent-hp-bar'),

    // logical hp
    hpRemaining: 20,
    hpTotal: 20,
  }

  // menu object; each attribute refers to the button in the html file
  var menu = {
    main: $('.menu'),
    fight: $('#menu-fight'),
    bag: $('#menu-bag'),
    cancel: $('#menu-cancel'),
    pokemon: $('#menu-pokemon'),
  }

  // fight object; each attribute refers to the button in the html file
  var fight = {
    main: $('.fight'),
    cancel: $('#fight-cancel'),

    // here the moveObject constructor from above is used
    // each attribute of a move is an element from the html file
    move1: new moveObject($('#move1-name'), $('#move1-pp'), $('#move1-img')),
    move2: new moveObject($('#move2-name'), $('#move2-pp'), $('#move2-img')),
    move3: new moveObject($('#move3-name'), $('#move3-pp'), $('#move3-img')),
    move4: new moveObject($('#move4-name'), $('#move4-pp'), $('#move4-img'))
  }
});
