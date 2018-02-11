var Apple = function(n, m) {
this.apple_x = -1;
this.apple_y = -1;
this.n = n;
this.m = m;

this.set = function(snake, stage) {
toggleCell(this.apple_x, this.apple_y, 'apple');
    while(true){
            var x = Math.floor(Math.random() * n);
            var y = Math.floor(Math.random() * m);
            var flag = false;
            for(i=0; i < snake.x.length; i++) {
                if((snake.x[i] == x) && (snake.y[i] == y)) {
                    flag = true;
                }
            }
            if(stage[x][y] === '1') {
                flag = true;
            }

            if(!flag){
                this.apple_x = x;
                this.apple_y = y;
                break;
            }
            }
    toggleCell(this.apple_x, this.apple_y, 'apple');
}
}