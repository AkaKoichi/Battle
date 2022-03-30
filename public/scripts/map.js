function setup(){
    createCanvas(width,height)
    canvas.parent("game")
}

function draw(){
    background("black")
    let tilesize = width/20;

    for(let y = 0 ; y < height;y += tilesize){
        for(let x = 0 ; x < width;x += tilesize){
            rect(x,y,tilesize,tilesize)
        }
    }
}