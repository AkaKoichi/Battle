class Button {
  
    constructor(x, y, image,image_over) {
      this.x = x;
      this.y = y;
      this.image = image;
      this.image_over = image_over;
    }
    
    display() {
      stroke(0);
      
      // tint the image on mouse hover
      if (this.over()) {
        image(this.image_over, this.x, this.y);
      } else {
        image(this.image, this.x, this.y);
      }
      
      
    }
    
    over() {
      if (mouseX > this.x && mouseX < this.x + this.image.width && mouseY > this.y && mouseY < this.y + this.image.height) {
        return true;
      } else {
        return false;
      }
    }
  }