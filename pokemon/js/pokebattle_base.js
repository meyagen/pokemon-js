function move(name, remaining, total, damage) {
	this.name = name;
	this.remaining = remaining;
	this.total = total;
	this.damage = damage;
}

function moveObject(name, pp, img) {
  this.name = name;
  this.pp = pp;
  this.img = img;
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
    
    attack: function(victim, damage){
      victim.hpRemaining = victim.hpRemaining - damage;
      victim.sprite.effect("shake");
      var hp = victim.hpRemaining/victim.hpTotal * 100;

      // ratatata faints      
      if(hp <= 0){
        dialogue.html('RATATA has fainted! :(');
        victim.sprite.fadeOut("slow");
        this.sprite.attr('src', this.altImg);
      }

      // ratata lives
      else {
        dialogue.html('RATATA takes ' + damage + ' damage!');
      }

      if(hp < 30){
        victim.hpBar.animate({'width': hp + 'px', 'background-color': 
                            '#f85828'});
      }

      else if(hp < 60){
        victim.hpBar.animate({'width': hp + 'px', 'background-color': 
                            '#f8b000'});
      }

      else{
        victim.hpBar.animate({'width': hp + 'px', 'background-color': 
                            '#18c020'});
      }

    },
	}

  var dialogue = $('#battle-text');

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
    move1: new moveObject($('#move1-name'), $('#move1-pp'), $('#move1-img')),
    move2: new moveObject($('#move2-name'), $('#move2-pp'), $('#move2-img')),
    move3: new moveObject($('#move3-name'), $('#move3-pp'), $('#move3-img')),
    move4: new moveObject($('#move4-name'), $('#move4-pp'), $('#move4-img'))
	}

  menu.main.show();

  menu.fight.click(function(){
    menu.main.hide();
    fight.main.show();
  });

  fight.cancel.click(function(){
    fight.main.hide();
    menu.main.show();
  });

  fight.move1.img.click(function(){
    trainer.attack(opponent, trainer.move1.damage);
  });

  $.ajax({
      type: 'GET',
      url: 'http://188.166.240.238/random_pokemon',
      dataType: 'json',
      success: function(data){
        console.log(data);
        pokemon = data.pokemon;
        trainer.hpRemaining.html(pokemon.hp);
        trainer.hpTotal.html(pokemon.hp);
        trainer.level.html(pokemon.level);
        trainer.img = 'assets/back/' + pokemon.name + '.png';
        trainer.altImg = 'assets/back/' + pokemon.name + '2.png';
        trainer.sprite.attr('src', trainer.img);
        trainer.name.html(pokemon.name.toUpperCase());
      },

      error: function(data){
        console.log(data);
      }
  });





















});
