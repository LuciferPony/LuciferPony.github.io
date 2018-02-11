var Snake = function(initial_length, n, m) {
this.x = [];
this.y = [];
this.dir = '';
this.n = n;
this.m = m;

this.init = function() {
  this.x = [1, ];
  this.y = [1, ];
for(i = 1; i < initial_length; i++){
 this.x.push(-1); 
 this.y.push(-1);
}
toggleCell(this.x[0], this.y[0], 'head');
}

//используется в гейме
this.restart = function() {
toggleCell(this.x[0], this.y[0], 'head');
for(i=1; i < this.x.length; i++) {
    toggleCell(this.x[i], this.y[i], 'body');
}
this.init();
} 

this.checkCollision = function(){
  var collision = false;
  for(i=1; i<this.x.length; i++) {
    if((this.x[0] == this.x[i]) && (this.y[0] == this.y[i])) {
        collision = true;
    }
  }
  return collision;
}

//используется в гейме
this.eatApple = function(apple) {
  var eat = false;
  if((this.x[0] == apple.apple_x) && (this.y[0] == apple.apple_y)) {
    eat = true;
    this.x.push(-1);
    this.y.push(-1);
   }
   return eat;
}

this.move = function() {
if(!['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(this.dir)) {
    return;
}
toggleCell(this.x[0], this.y[0], 'head');
toggleCell(this.x[0], this.y[0], 'body');
toggleCell(this.x[this.x.length - 1], this.y[this.y.length - 1], 'body'); //уточнить
for(i=this.x.length - 1; i > 0; i--) {
  this.x[i] = this.x[i-1];
  this.y[i] = this.y[i-1];
}

if(this.dir=='KeyW') { 
    this.x[0] -= 1;
    if(this.x[0] < 0) {
        this.x[0] = this.n - 1;
    }
}
if(this.dir=='KeyA'){
    this.y[0] -= 1;
    if(this.y[0] < 0) {
        this.y[0] = this.m - 1;
    }
}
if(this.dir=='KeyS'){
    this.x[0] = (this.x[0] + 1) % this.n;
}
if(this.dir=='KeyD'){
    this.y[0] = (this.y[0] + 1) % this.m;
}

toggleCell(this.x[0], this.y[0], 'head');
return this.checkCollision();
}
this.init();
}