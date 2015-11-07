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

		attack: function(victim, dmg){
			victim.hpRemaining = victim.hpRemaining - dmg;
			if(victim.hpRemaining < 0){
				victim.hpRemaining = 0;
			}

			var hp = victim.hpRemaining/victim.hpTotal*100;
			if(hp < 30){
				victim.hpBar.animate({'width': hp + 'px', 'background-color': '#f85828'});
			}

			else if(hp < 60){
				victim.hpBar.animate({'width': hp + 'px', 'background-color': '#f8b000'});
			}

			else {
				victim.hpBar.animate({'width': hp + 'px', 'background-color': '#18c020'});
			}

			console.log(victim.name.html() + ' received ' + dmg + ' damage!');
		},

		victoryAnimation: function(){
			this.sprite.attr('src', this.altImg);
		},

		hurtAnimation: function(){
			this.sprite.effect('shake');
		},

		faintedAnimation: function(){
			this.sprite.fadeOut("slow");
		}
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
		move1: new moveObject($('#move1-name'), $('#move1-pp'), $('#move1-img')),
		move2: new moveObject($('#move2-name'), $('#move2-pp'), $('#move2-img')),
		move3: new moveObject($('#move3-name'), $('#move3-pp'), $('#move3-img')),
		move4: new moveObject($('#move4-name'), $('#move4-pp'), $('#move4-img'))
	}

	var dialogue = $('#battle-text');

	menu.main.css('display', 'block');

	function switchToFight(){
		menu.main.hide();
		fight.main.show();
	}

	function switchToMenu(){
		fight.main.hide();
		menu.main.show();
	}

	function playerAttack(opponent, damage){
		opponent.hurtAnimation();
		trainer.attack(opponent, damage);
		if(opponent.hpRemaining <= 0){
			dialogue.html(opponent.name.html() + ' fainted!');
			opponent.faintedAnimation();
			switchToMenu();
			dialogue.toggle(trainer.name.html() + ' gains experience!');
			trainer.victoryAnimation();
		}

		else {
			dialogue.html(opponent.name.html() + ' received ' + damage + ' damage!');
		}
	}

  $.ajax({
      type: 'GET',
      url: 'http://http://188.166.240.238//random_pokemon',
      dataType: 'json',
      success: function(data){
        console.log(data);
      },

      error: function(data){
        console.log(data);
      }
  });

  $.ajax({
      type: 'POST',
      url: 'http://http://188.166.240.238//win',
      dataType: 'json',
      data: { pokemon: trainer.name.html() },
      success: function(data){
        console.log(data);
      },

      error: function(data){
        console.log(data);
      }
  });

  menu.fight.click(function(){
    switchToFight();
  });

  fight.cancel.click(function(){
    switchToMenu();
  });

  fight.move1.img.click(function(){
    playerAttack(opponent, trainer.move1.damage);
  });

  fight.move2.img.click(function(){
    playerAttack(opponent, trainer.move2.damage);
  });

  fight.move3.img.click(function(){
    playerAttack(opponent, trainer.move3.damage);
  });

  fight.move4.img.click(function(){
    playerAttack(opponent, trainer.move4.damage);
  });

});






































