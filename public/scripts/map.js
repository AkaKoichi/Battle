var cx = 20
var cy = 20
let tilesize = 900/20;


function setup(){
    createCanvas(900,900)
    tilesize = width/20;
}

function draw(){
    
    background("black")
    for(let y = 0 ; y < 1000;y += tilesize){
        for(let x = 0 ; x < 1000;x += tilesize){
            rect(x,y,tilesize,tilesize);
        }
    }
    circle(cx, cy, 50);
    /*
    var cx = 20
    var cy = 20
    circle(cx, cy, 50);
    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                cx = cx + 1;
                break;
            }
        }*/

}

async function keyPressed() {
  
    switch(key) {
        case 'd':
        case 'D':
            cx = cx +tilesize;
        break;
        
        case 'a':
        case 'A':
            cx = cx -tilesize;
        break;
        
        case 'w':
        case 'W':
            cy = cy -tilesize;
        break;
        
        case 's':
        case 'S': 
            cy = cy +tilesize;
        break;
    }
}

function object(){
    var canvas = document. getElementById('circle');
    if (canvas. getContext){
        var ctx = canvas. getContext('2d');
        var X = canvas.width/2;
        var Y = canvas.height/2;
    }
}

