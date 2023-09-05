class OverworldMap {
    constructor(config) {
      this.gameObjects = config.gameObjects;
      this.walls = config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
      this.speed = 5;
    }

    drawLowerImage(ctx) {
      ctx.drawImage(this.lowerImage, 0, 0)
    }
  
    drawUpperImage(ctx) {
      ctx.drawImage(this.upperImage, 0, 0)
    } 

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    addWall(x,y) {
      this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
      delete this.walls[`${x},${y}`]
    }
}
      
window.OverworldMaps = {
Room1: {
    lowerSrc: "img/background/background_map.png",
    upperSrc: "img/background/room1_upper.png",
    gameObjects: {
    hero: new Person({
        isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(15),
              }),         
    },

    walls: {
      //Picture border (left)
      [utils.asGridCoords(-1,10)] : true,
      [utils.asGridCoords(-1,11)] : true,
      [utils.asGridCoords(-1,12)] : true,
      [utils.asGridCoords(-1,13)] : true,
      [utils.asGridCoords(-1,14)] : true,
      [utils.asGridCoords(-1,15)] : true,
      [utils.asGridCoords(-1,16)] : true,
      [utils.asGridCoords(-1,17)] : true,
      [utils.asGridCoords(-1,18)] : true,
      [utils.asGridCoords(-1,19)] : true,
      [utils.asGridCoords(-1,20)] : true,
      [utils.asGridCoords(-1,21)] : true,
      [utils.asGridCoords(-1,22)] : true,
      [utils.asGridCoords(-1,23)] : true,
      [utils.asGridCoords(-1,24)] : true,
      [utils.asGridCoords(-1,25)] : true,
      [utils.asGridCoords(-1,26)] : true,
      [utils.asGridCoords(-1,27)] : true,
      [utils.asGridCoords(-1,28)] : true,
      [utils.asGridCoords(-1,29)] : true,
      [utils.asGridCoords(-1,30)] : true,  


      //Picture border (right)
      [utils.asGridCoords(23,10)] : true,  
      [utils.asGridCoords(25,13)] : true,
      [utils.asGridCoords(25,14)] : true, 
      [utils.asGridCoords(25,15)] : true,     
      [utils.asGridCoords(25,16)] : true,  
      [utils.asGridCoords(25,17)] : true,  
      [utils.asGridCoords(25,18)] : true, 
      [utils.asGridCoords(25,19)] : true,     
      [utils.asGridCoords(25,20)] : true,       
      [utils.asGridCoords(25,21)] : true, 
      [utils.asGridCoords(25,22)] : true,  
      [utils.asGridCoords(25,23)] : true,  
      [utils.asGridCoords(25,24)] : true,   
      [utils.asGridCoords(25,25)] : true,  
      [utils.asGridCoords(25,26)] : true, 
      [utils.asGridCoords(25,27)] : true,   
      [utils.asGridCoords(25,28)] : true,   
      [utils.asGridCoords(25,29)] : true,      
      [utils.asGridCoords(25,30)] : true,                                
      [utils.asGridCoords(25,31)] : true,  

      //Big gate (left)
      [utils.asGridCoords(0,9)] : true, 
      [utils.asGridCoords(1,9)] : true, 
      [utils.asGridCoords(2,9)] : true, 
      [utils.asGridCoords(3,9)] : true, 
      [utils.asGridCoords(4,9)] : true, 
      [utils.asGridCoords(5,9)] : true, 
      [utils.asGridCoords(6,9)] : true, 
      [utils.asGridCoords(7,9)] : true, 
      [utils.asGridCoords(8,9)] : true, 
      [utils.asGridCoords(9,9)] : true, 

      //Banner
      [utils.asGridCoords(10,8)] : true, 
      [utils.asGridCoords(11,8)] : true,
      [utils.asGridCoords(12,8)] : true,  
      [utils.asGridCoords(13,8)] : true, 
      [utils.asGridCoords(14,8)] : true, 

      [utils.asGridCoords(15,9)] : true, 
      [utils.asGridCoords(16,9)] : true, 
      [utils.asGridCoords(17,9)] : true, 
      [utils.asGridCoords(18,9)] : true, 
      [utils.asGridCoords(19,9)] : true, 
      [utils.asGridCoords(20,9)] : true, 
      [utils.asGridCoords(21,9)] : true, 
      [utils.asGridCoords(22,9)] : true, 
      [utils.asGridCoords(23,9)] : true, 
      [utils.asGridCoords(24,9)] : true, 

      //Flowers near banner
      [utils.asGridCoords(8, 10)] : true, 
      [utils.asGridCoords(9, 10)] : true, 
      [utils.asGridCoords(15,10)] : true, 
      [utils.asGridCoords(16,10)] : true, 

      //Tree near gate
      [utils.asGridCoords(21, 11)] : true, 
      [utils.asGridCoords(22, 11)] : true, 
      [utils.asGridCoords(23, 11)] : true,
      [utils.asGridCoords(20, 12)] : true,
      [utils.asGridCoords(21, 12)] : true,  
      [utils.asGridCoords(22, 12)] : true, 
      [utils.asGridCoords(23, 12)] : true, 
      [utils.asGridCoords(24, 12)] : true, 

      //date banner near farm
      [utils.asGridCoords(19, 16)] : true, 
      [utils.asGridCoords(20, 16)] : true, 
      [utils.asGridCoords(21, 16)] : true, 
      [utils.asGridCoords(21, 17)] : true, 
      [utils.asGridCoords(20, 17)] : true, 
      [utils.asGridCoords(18, 18)] : true, 

      //Cut tree near farm
      [utils.asGridCoords(22, 24)] : true, 
      [utils.asGridCoords(23, 24)] : true, 

      //Rock near Farm
      [utils.asGridCoords(2, 22)] : true, 
      [utils.asGridCoords(2, 23)] : true, 

      [utils.asGridCoords(19, 17)] : true, 

      //Farm gate (up)
      [utils.asGridCoords(4, 18)] : true, 
      [utils.asGridCoords(5, 18)] : true, 
      [utils.asGridCoords(6, 18)] : true, 
      [utils.asGridCoords(7, 18)] : true, 
      [utils.asGridCoords(8, 18)] : true, 
      [utils.asGridCoords(9, 18)] : true, 
      [utils.asGridCoords(10, 18)] : true, 
      [utils.asGridCoords(11, 18)] : true, 
      [utils.asGridCoords(12, 18)] : true, 
      [utils.asGridCoords(13, 18)] : true, 
      [utils.asGridCoords(16, 18)] : true, 
      [utils.asGridCoords(17, 18)] : true, 
      [utils.asGridCoords(18, 18)] : true, 
      [utils.asGridCoords(19, 18)] : true, 

      //Farm gate (left)
      [utils.asGridCoords(4, 19)] : true, 
      [utils.asGridCoords(4, 20)] : true, 
      [utils.asGridCoords(4, 21)] : true, 
      [utils.asGridCoords(4, 22)] : true, 
      [utils.asGridCoords(4, 23)] : true, 
      [utils.asGridCoords(4, 24)] : true, 
      [utils.asGridCoords(4, 25)] : true, 

      //Farm gate (lower)
      [utils.asGridCoords(5, 26)] : true, 
      [utils.asGridCoords(6, 26)] : true, 
      [utils.asGridCoords(7, 26)] : true, 
      [utils.asGridCoords(8, 26)] : true, 
      [utils.asGridCoords(9, 26)] : true, 
      [utils.asGridCoords(10, 26)] : true, 
      [utils.asGridCoords(11, 26)] : true, 
      [utils.asGridCoords(12, 26)] : true, 
      [utils.asGridCoords(13, 26)] : true, 
      [utils.asGridCoords(14, 26)] : true, 
      [utils.asGridCoords(15, 26)] : true, 
      [utils.asGridCoords(16, 26)] : true, 
      [utils.asGridCoords(17, 26)] : true, 
      [utils.asGridCoords(18, 26)] : true, 

      //Farm gate (right)
      [utils.asGridCoords(19, 19)] : true, 
      [utils.asGridCoords(19, 20)] : true, 
      [utils.asGridCoords(19, 21)] : true, 
      [utils.asGridCoords(19, 22)] : true,
      [utils.asGridCoords(19, 23)] : true,  
      [utils.asGridCoords(19, 24)] : true, 
      [utils.asGridCoords(19, 25)] : true, 

      //Dog in farm
      [utils.asGridCoords(6, 19)] : true, 
      [utils.asGridCoords(7, 19)] : true, 


      //Plant green
      [utils.asGridCoords(6, 20)] : true, 
      [utils.asGridCoords(6, 21)] : true,
      [utils.asGridCoords(6, 22)] : true,  
      [utils.asGridCoords(6, 23)] : true, 
      [utils.asGridCoords(6, 24)] : true, 

      [utils.asGridCoords(7, 20)] : true, 
      [utils.asGridCoords(7, 21)] : true,
      [utils.asGridCoords(7, 22)] : true,  
      [utils.asGridCoords(7, 23)] : true, 
      [utils.asGridCoords(7, 24)] : true, 

      //Plant 3 flowers
      [utils.asGridCoords(9, 20)] : true, 
      [utils.asGridCoords(9, 21)] : true,
      [utils.asGridCoords(9, 22)] : true,  
      [utils.asGridCoords(9, 23)] : true, 
      [utils.asGridCoords(9, 24)] : true, 

      [utils.asGridCoords(10, 20)] : true, 
      [utils.asGridCoords(10, 21)] : true,
      [utils.asGridCoords(10, 22)] : true,  
      [utils.asGridCoords(10, 23)] : true, 
      [utils.asGridCoords(10, 24)] : true, 

      [utils.asGridCoords(11, 20)] : true, 
      [utils.asGridCoords(11, 21)] : true,
      [utils.asGridCoords(11, 22)] : true,  
      [utils.asGridCoords(11, 23)] : true, 
      [utils.asGridCoords(11, 24)] : true, 

      //Plant white
      [utils.asGridCoords(13, 20)] : true, 
      [utils.asGridCoords(13, 21)] : true,
      [utils.asGridCoords(13, 22)] : true,  
      [utils.asGridCoords(13, 23)] : true, 
      [utils.asGridCoords(13, 24)] : true, 

      [utils.asGridCoords(14, 20)] : true, 
      [utils.asGridCoords(14, 21)] : true,
      [utils.asGridCoords(14, 22)] : true,  
      [utils.asGridCoords(14, 23)] : true, 
      [utils.asGridCoords(14, 24)] : true, 

       //Plant sunflower
      [utils.asGridCoords(16, 20)] : true, 
      [utils.asGridCoords(16, 20)] : true,
      [utils.asGridCoords(16, 20)] : true,  
      [utils.asGridCoords(16, 23)] : true, 
      [utils.asGridCoords(16, 24)] : true, 

      [utils.asGridCoords(17, 20)] : true, 
      [utils.asGridCoords(17, 21)] : true,
      [utils.asGridCoords(17, 22)] : true,  
      [utils.asGridCoords(17, 23)] : true, 
      [utils.asGridCoords(17, 24)] : true, 
      

      //Tree near home
      [utils.asGridCoords(0,13)] : true, 
      [utils.asGridCoords(1, 12)] : true, 
      [utils.asGridCoords(2,13)] : true, 
      [utils.asGridCoords(1, 14)] : true, 

      //House
      [utils.asGridCoords(4,11)] : true, 
      [utils.asGridCoords(5,11)] : true, 
      [utils.asGridCoords(6,11)] : true,
      [utils.asGridCoords(4,12)] : true, 
      [utils.asGridCoords(7,12)] : true,
      [utils.asGridCoords(7,13)] : true,
      [utils.asGridCoords(4,13)] : true, 
      [utils.asGridCoords(0,14)] : true, 

      [utils.asGridCoords(4,14)] : true, 
      [utils.asGridCoords(5,14)] : true, 
      [utils.asGridCoords(6,14)] : true, 
      [utils.asGridCoords(7,14)] : true, 


      //Stuff near the water
      [utils.asGridCoords(0,31)] : true, 
      [utils.asGridCoords(1, 30)] : true,
      [utils.asGridCoords(1, 31)] : true,
      [utils.asGridCoords(1, 32)] : true,
      [utils.asGridCoords(3, 32)] : true,
      [utils.asGridCoords(3, 31)] : true,

      [utils.asGridCoords(4, 32)] : true,
      [utils.asGridCoords(5, 32)] : true,

      [utils.asGridCoords(6, 32)] : true,
      [utils.asGridCoords(6, 31)] : true,
      [utils.asGridCoords(6, 30)] : true,
      [utils.asGridCoords(7, 30)] : true,
      [utils.asGridCoords(8, 30)] : true,
      [utils.asGridCoords(9, 30)] : true,
      [utils.asGridCoords(10, 30)] : true,
      [utils.asGridCoords(11, 30)] : true,

      [utils.asGridCoords(11, 31)] : true,
      [utils.asGridCoords(11, 32)] : true,

      [utils.asGridCoords(13, 31)] : true,
      [utils.asGridCoords(13, 32)] : true,

      [utils.asGridCoords(21, 32)] : true,
      [utils.asGridCoords(22, 32)] : true,
      [utils.asGridCoords(23, 32)] : true,
      [utils.asGridCoords(24, 32)] : true,
      [utils.asGridCoords(23, 31)] : true,
      [utils.asGridCoords(24, 31)] : true,

      //Water
      [utils.asGridCoords(2, 33)] : true,
      [utils.asGridCoords(12, 33)] : true,
      [utils.asGridCoords(14, 33)] : true,
      [utils.asGridCoords(15, 33)] : true,
      [utils.asGridCoords(16, 33)] : true,
      [utils.asGridCoords(17, 33)] : true,
      [utils.asGridCoords(18, 33)] : true,
      [utils.asGridCoords(19, 33)] : true,
      [utils.asGridCoords(20, 33)] : true,

    }, 
},
};
        