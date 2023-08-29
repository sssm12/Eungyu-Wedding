class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.joystick = this.element.querySelector(".joystick");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.joystick = null; // New property for the joystick
  }
  
 
   startGameLoop() {
     const step = () => {
       //Clear off the canvas
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 
 
       //Draw Game Objects -> update all objects video 6 (but we are not doing that)
       Object.values(this.map.gameObjects).forEach(object => {
         object.update({
           arrow: this.directionInput.direction,
           map: this.map, 
         })
       })

       //Draw Lower layer
       this.map.drawLowerImage(this.ctx);

       //Draw Game Objects
       Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx);
      })

 
       //Draw Upper layer
       this.map.drawUpperImage(this.ctx);
       
       requestAnimationFrame(() => {
         step();   
       })
     }
     step();
  }
 
  init() {
   this.map = new OverworldMap(window.OverworldMaps.Room1);
   console.log(this.map.walls);
 
   this.directionInput = new DirectionInput();
   this.directionInput.init();
   //console.log(this.map.walls);
 
   this.startGameLoop();
  }
 }