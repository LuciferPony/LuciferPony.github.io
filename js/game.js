var Game = function(n=50, m=50, selector='.game', speed=0.1, initial_length=3) {
this.n = n;
this.m = m;
this.selector = selector;
this.speed = speed;
this.last_timestamp = 0;
this.state = 'game';
this.initial_length = initial_length;
this.move_keys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];
this.key = '';
this.score = 0;
this.highscore = 0;
this.game_over = [ 
    '111111111000000010000000110000000110011111111',
    '110000000000000010000000101000001010010000000',
    '110000000000000101000000100100010010010000000',
    '110000000000000101000000100010100010010000000',
    '110000000000001000100000100001000010010000000',
    '110000000000010000010000100001000010010000000',
    '110011111000010000010000100001000010011111111',
    '110010001000100000001000100001000010010000000',
    '110111001000111111111000100001000010010000000',
    '110000001001000000000100100001000010010000000',
    '110000001001000000000100100001000010010000000',
    '111111111001000000000100100001000010011111111',
    '000000000000000000000000000000000000000000000',
    '111111111001000000000100111111111110011111110',
    '110000001001000000000100100000000000010000001',
    '110000001001000000000100100000000000010000001',
    '110000001000100000001000100000000000010000001',
    '110000001000100000001000100000000000010000001',
    '110000001000010000010000100000000000010000001',
    '110000001000010000010000111111111110011111110',
    '110000001000001000100000100000000000010000010',
    '110000001000000101000000100000000000010000010',
    '110000001000000101000000100000000000010000001',
    '110000001000000010000000100000000000010000001',
    '111111111000000010000000111111111110010000001',
];

this.music = {
game: new Audio('media/gameMusic.mp3'),
pause: new Audio('media/pauseMusic.mp3'),
screamer: new Audio('media/screamSound.mp3'),
gameover: new Audio('media/gameOverMusic.mp3')
}

this.music.game.loop = true;
this.music.pause.loop = true;

this.musicChange = function() {
    for(sound in this.music) {
        if(sound == this.state) {
            this.music[sound].play();
        } else {
            this.music[sound].pause();
        }
    }
}

this.gameScore = function() {
this.score += 1;
$('.score').html(this.score);
   if(this.score > this.highscore) {
     this.highscore = this.score;
      $('.highscore').html(this.highscore);
      localStorage.setItem('snake_highscore', this.highscore);
        }
    }

this.createBoard = function() {
    var s = '<table>';
    for(i=0; i<n; i++) {
      s+= '<tr>';
      for(j=0; j<m; j++) {
        s+= '<td class="item_' + i + '_' + j + '"></td>';
      }  
      s+= '</tr>';
    }

    s+= '</table>';

    $(this.selector).html(s);
}

this.screamer = function() {
this.state = 'screamer';
$('.demogorgon').toggleClass('nowyouseeme');
this.musicChange();
}

this.screamerEnd = function(){
    this.state = 'game';
    $('.demogorgon').removeClass('nowyouseeme');
    this.musicChange();
}

this.music.screamer.addEventListener('ended', this.screamerEnd.bind(this));

this.gameOver = function() {
  toggleArrayCell(this.game_over, 'gameOver', 13, 3);
}


this.stageChange = function(stage) {
  toggleArrayCell(this.stage, 'black-block', 0, 0);
  toggleArrayCell(this.stage, 'green-block', 0, 0, 2);
  this.stage = stages[stage];
  toggleArrayCell(this.stage, 'black-block', 0, 0);
  toggleArrayCell(this.stage, 'green-block', 0, 0, 2);
}

this.checkStagesCollision = function() {
    if(this.stage[this.snake.x[0]][this.snake.y[0]] === '1') {
      this.state = 'gameover';
      this.musicChange();
    }
  }

this.gameOverEnd = function() {
 if($('.gameOver').length !=0){
  toggleArrayCell(this.game_over, 'gameOver', 13, 3);
}
  this.snake.restart();
  this.snake.dir = '';
  this.apple.set(this.snake, this.stage);
  this.score = 0;
  this.state = 'game';
  this.musicChange();    
}

this.music.gameover.addEventListener('ended', this.gameOverEnd.bind(this));

this.init = function() {
this.createBoard();
this.stage = stages['clean'];
this.snake = new Snake(initial_length, this.n, this.m);
this.apple = new Apple(this.n, this.m);
this.apple.set(this.snake, this.stage);
this.highscore = Number(localStorage.getItem('snake_highscore'));
$('.highscore').html(this.highscore);
document.addEventListener('keydown', this.keyListener.bind(this));
this.music.game.play();
this.loop();
}

this.keyListener = function(event) {
  this.key = event.code;
}

this.update = function() {
  if(this.state =='pause'){
    if((this.key == 'KeyP') || (this.key == 'Space')) {
        this.state = 'game';
        this.musicChange();
        this.key = '';
    } 
} else if(this.state == 'game') {
  if(this.screamer_await != -1) {
    this.screamer_await --;
    if(this.screamer_await == 0) {
          this.screamer_await = -1;
          this.screamer();
        }
  }

if((this.key == 'KeyP') || (this.key == 'Space')) {
    this.state = 'pause';
    this.musicChange();
    this.key = '';
    return;
} 
if(this.move_keys.includes(this.key)) {
    if(!(
      ((this.snake.dir == 'KeyW') && (this.key == 'KeyS')) ||
      ((this.snake.dir == 'KeyS') && (this.key == 'KeyW')) ||
      ((this.snake.dir == 'KeyA') && (this.key == 'KeyD')) ||
      ((this.snake.dir == 'KeyD') && (this.key == 'KeyA'))
      )) {
      this.snake.dir = this.key;
      this.key = '';
     }
     }else if(this.key == 'ArrowRight') {
        this.screamer_await = 25;
        this.key = '';
     } 
if(this.key == 'ArrowLeft') {
  this.stageChange('zalupa');
  this.key = '';
} 
if (this.key == 'ArrowUp') {
  this.stageChange('box');
  this.key = '';
}
if (this.key == 'ArrowDown') {
  this.stageChange('clean');
  this.key = '';
}

if(this.snake.move(this)) {
this.state = 'gameover';
this.musicChange();
} else if(this.snake.eatApple(this.apple)){
    this.gameScore();
    this.apple.set(this.snake, this.stage);
} else {
  this.checkStagesCollision();
}

} else if(this.state == 'gameover') {
    this.gameOver();
} else if(this.state == 'screamer') {
    this.screamer();
}
}

this.loop = function() {
    timestamp = Date.now();
    if(timestamp < this.last_timestamp + 1000 * this.speed) {
      requestAnimationFrame(this.loop.bind(this)); 
      return; 
    }
    this.last_timestamp = timestamp;
    this.update();
    requestAnimationFrame(this.loop.bind(this));
}

this.init();
}
