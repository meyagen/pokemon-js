function move(name, remaining, total, damage) {
	this.name = name;
	this.remaining = remaining;
	this.total = total;
	this.damage = damage;
}

$(function(){
	var trainer = {
		name: $('#pokemon-name'),
		sprite: $('#pokemon-sprite'),
		level: $('#pokemon-level'),
		hpRemaining: $('#hp-remaining'),
		hpTotal: $('#hp-total'),
		hpBar: $('#pokemon-hp-bar'),
		img: 'assets/back/pikachu.png',
		altImg: 'assets/back/pikachu2.png',
		move1: new move('TACKLE', 25, 25, 2),
		move2: new move('SCRATCH', 25, 25, 3),
		move3: new move('TAIL WHIP', 25, 25, 1),
		move4: new move('SAND ATTACK', 25, 25, 1),
	}

	var opponent = {
		name: $('#opponent-name'),
		sprite: $('#opponent-sprite'),
		level: $('#opponent-level'),
		hpRemaining: 20,
		hpTotal: 20,
		hpBar: $('#opponent-hp-bar'),

		hurtAnimation: function(){
			this.sprite.effect('shake');
		},

		faintedAnimation: function(){
			this.sprite.fadeOut("slow");
		},
	}

	var menu = {
		main: $('.menu'),
		fight: $('#menu-fight'),
		bag: $('#menu-bag'),
		cancel: $('#menu-cancel'),
		pokemon: $('#menu-pokemon'),
	}

	var fight = {
		main: $('.fight'),
		cancel: $('#fight-cancel'),
	}

});
