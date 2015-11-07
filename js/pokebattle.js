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
		move1: new move('TACKLE', 20, 20, 2),
		move2: new move('SCRATCH', 15, 15, 3),
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
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/win',
          dataType: 'json',
          data: { pokemon: trainer.name.html() },
          success: function(data){
            console.log(data);
          },

          error: function(data){
            console.log(data);
          }
      });
		}

		else {
			dialogue.html(opponent.name.html() + ' received ' + damage + ' damage!');
		}
	}

  $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/random_pokemon',
      dataType: 'json',
      success: function(data){
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

  $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/random_opponent',
      dataType: 'json',
      success: function(data){
        pokemon = data.pokemon;
        opponent.hpRemaining = pokemon.hp;
        opponent.hpTotal = pokemon.hp;
        opponent.level.html(pokemon.level);
        opponent.img = 'assets/front/' + pokemon.name + '.png';
        opponent.altImg = 'assets/front/' + pokemon.name + '2.png';
        opponent.sprite.attr('src', opponent.img);
        opponent.name.html(pokemon.name.toUpperCase());
        dialogue.html('A wild ' + pokemon.name.toUpperCase() + ' appeared!');
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
    trainer.move1.remaining--;
    fight.move1.pp.html(trainer.move1.remaining + '/' + trainer.move1.total);
  });

  fight.move2.img.click(function(){
    playerAttack(opponent, trainer.move2.damage);
    trainer.move2.remaining--;
    fight.move2.pp.html(trainer.move2.remaining + '/' + trainer.move2.total);
  });

  fight.move3.img.click(function(){
    playerAttack(opponent, trainer.move3.damage);
    trainer.move3.remaining--;
    fight.move3.pp.html(trainer.move3.remaining + '/' + trainer.move3.total);
  });

  fight.move4.img.click(function(){
    playerAttack(opponent, trainer.move4.damage);
    trainer.move4.remaining--;
    fight.move4.pp.html(trainer.move4.remaining + '/' + trainer.move4.total);
  });

});






































