// here is the final js file from the devcamp session last November 7
// this lets your pokemon attack another pokemon until it faints
// visual feedback is given through dom manipulation (via jquery)
// creating a full game where you take turns with the opponent in attacking requires some gamedev concepts which are outside the scope of this tutorial
// this will be left as an exercise to the interested reader; if curious, you can shoot me a message on how this can be done :)

// first let's create constructors for a few objects we'll be declaring later
// a constructor is just a template for the object
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

    // trainer attacks the victim with the specified damage
		attack: function(victim, dmg){
			victim.hpRemaining = victim.hpRemaining - dmg;
			if(victim.hpRemaining < 0){
				victim.hpRemaining = 0;
			}

      // width is 100px so we can just use the percentage of hp left as the new width of the hp bar
			var hp = victim.hpRemaining/victim.hpTotal*100;

      // animates hp bar; changes the width and changes color depending on how much hp is left
			if(hp < 30){
				victim.hpBar.animate({'width': hp + 'px', 'background-color': '#f85828'}); // red
			}

			else if(hp < 60){
				victim.hpBar.animate({'width': hp + 'px', 'background-color': '#f8b000'}); // orange
			}

			else {
				victim.hpBar.animate({'width': hp + 'px', 'background-color': '#18c020'}); // red
			}
		},

    // changes pokemon sprite to its victory pose
		victoryAnimation: function(){
			this.sprite.attr('src', this.altImg);
		},
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

    // makes the pokemon shake (use when attacked)
    hurtAnimation: function(){
      this.sprite.effect('shake');
    },

    // makes the sprite disappear
    faintedAnimation: function(){
      this.sprite.fadeOut("slow");
    }
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

  // dialogue box element from the html file
	var dialogue = $('#battle-text');

  // okay, now that the we've selected the elements from the html, we can now manipulate them and create the game
  // first, the main menu is set to display: none
  // so let's make the main menu appear using vanilla js
	menu.main.css('display', 'block');

  // refresh the 

  // we'll need to switch frequently between the main menu and the fight menu, so let's create functions for that
	function switchToFight(){
		menu.main.hide(); // here we'll use jquery instead of vanilla js; it sets the display property to none
		fight.main.show(); // this is the jquery equivalent of the code above; it sets the display property to block
	}

  // notice we switched from vanilla js to jquery
  // they both do the same thing, but the code for jquery is shorter and easier to read (it's almost like it's english!)

  // of couse, we also need to be able to switch to the other menu so let's do that
	function switchToMenu(){
		fight.main.hide();
		menu.main.show();
	}

  // now let's actually use these functions using the click() event
  // this means that if we click the fight button in the main menu, we'll switch to the fight menu
  menu.fight.click(function(){
    switchToFight();
  });

  // conversely, if we click the cancel button in the fight menu, we'll switch to the main menu
  fight.cancel.click(function(){
    switchToMenu();
  });

  // refresh the page in your browser and try clicking those buttons. you should be able to switch between them.

  // great! now let's try actually attacking our opponent
  // we'll only be able to attack our opponent if we click a move image (one of the four purple boxes in the fight menu), so let's do that
  fight.move1.img.click(function(){
    // let's create a playerAttack function since we'll be reusing the code for this for moves 2-4
    playerAttack(opponent, trainer.move1.damage);
    trainer.move1.remaining--; // decreases logical pp of the move
    fight.move1.pp.html(trainer.move1.remaining + '/' + trainer.move1.total); // manipulates the html element to show the decrese in pp
  });

  // let's attack some pokemon!
	function playerAttack(opponent, damage) {
		opponent.hurtAnimation();
		trainer.attack(opponent, damage); // you can check the code for this above in the trainer object

    // opponent faints
		if(opponent.hpRemaining <= 0){
			dialogue.html(opponent.name.html() + ' fainted!');
			opponent.faintedAnimation();
			switchToMenu();
			trainer.victoryAnimation();
		}

    // opponent takes damage but is still alive and kicking
		else {
			dialogue.html(opponent.name.html() + ' received ' + damage + ' damage!');
		}
	}

  // refresh the page and attack that pokemon!

  // let's replicate this with the other moves
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

  // great! now you can mercilessly attack a rattata or pidgey at your will, and even have your pokemon do a victory pose! (you sadist you :P)
  // here's one last treat: ajax calls! let's try getting some data from a different server and use that for our game
  // unfortunately the link we used in the devcamp session is no longer available so we won't be able to test it anymore
  $.ajax({
      type: 'GET', // this is for GETTING data; other types include POST, PATCH, and DELETE

      // as an exercise, try returning a json object in flask; it's just a matter of returning a random pokemon with its level and hp
      url: 'http://localhost:3000/random_pokemon', 
      dataType: 'json',

      // data is the json object returned by the server
      // here we'll change our pokemon's sprite, level, and hp according to the server's data
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

      // sometimes our ajax calls won't be succesful because of reasons (e.g. loss of internet connection, server's down, etc.)
      error: function(data){
        console.log(data);
      }
  });
});
