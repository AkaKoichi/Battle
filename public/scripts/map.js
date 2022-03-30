function setup(){
    createCanvas(1000,1000)
}

function draw(){
    background("black")
    let tilesize = 1000/20;

    for(let y = 0 ; y < 1000;y += tilesize){
        for(let x = 0 ; x < 1000;x += tilesize){
            rect(x,y,tilesize,tilesize)
        }
    }
}