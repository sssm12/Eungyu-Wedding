class Person extends GameObject {
    constructor(config, directionInput) {
  
      super(config);
  
      this.movingProgressRemaining = 0;
      this.isInfoBoxOpen = false; // Add this property
  
      this.isPlayerControlled = config.isPlayerControlled || false;
  
      this.directionUpdate = {
        "up": ["y", -1],
        "down": ["y", 1],
        "left": ["x", -1],
        "right": ["x", 1],
      };
  
      this.directionInput = directionInput; // Store the directionInput instance
  
      this.walls = config.walls || {}; // Add walls property and initialize it with the walls object
  
      // Add touch position property
      this.touchPosition = { x: 0, y: 0 };
  
    }
  
    update(state) {
      if (this.movingProgressRemaining > 0) {
        this.updatePosition();
      } else {
        // More cases for starting to walk will come here
        // ...
  
        if (this.x === 12 * 16 && this.y === 9* 16) {
          this.showPhotoSlideshow();
        } else {
          this.hidePhotoSlideshow();
          
        }
  
        if (this.x === 5 * 16 && this.y === 15 * 16 && !this.isInfoBoxOpen) {
          this.showText("장소 안내", "결혼식은 신라호텔에서 진행합니다.");
          this.isInfoBoxOpen = true;
        }
        
        // Check if the character has moved away from the position, then allow reopening the info box
        if ((this.x !== 5 * 16 || this.y !== 15 * 16) && this.isInfoBoxOpen) {
          this.isInfoBoxOpen = false;
        }
  
  
        // Case: We're keyboard ready and have an arrow pressed
        if (this.isPlayerControlled && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow,
          });
        }
        
        // Case: We're touch ready and have a touch position
        if (this.isPlayerControlled && state.touchPosition) {
          const touchDirection = this.calculateTouchDirection(state.touchPosition);
          this.startBehavior(state, {
            type: "walk",
            direction: touchDirection,
          });
        }
  
        
        this.updateSprite(state);
      }
  
    } 
  
    showPhotoSlideshow() {
      const slideshow = document.getElementById("photo-slideshow");
      if (slideshow) {
        slideshow.style.display = "block";
      }
    }
  
    
    hidePhotoSlideshow() {
      const slideshow = document.getElementById("photo-slideshow");
      if (slideshow) {
        slideshow.style.display = "none";
      }
    }
  
    showText(title, text) {
      const infoBox = document.querySelector('#info-box');
      const infoTitle = infoBox.querySelector('.title');
      const infoText = infoBox.querySelector('.info-text');
    
      // Display the info-box with the provided title and text
      infoTitle.textContent = title;
      infoText.textContent = text; 
      infoBox.style.display = 'block';
      this.isInfoBoxOpen = true;
      
    }
    
  
    startBehavior(state, behavior) {
      // Set character direction to whatever behavior has
      this.direction = behavior.direction;
      if (behavior.type === "walk") {
        // Stop here if space is not free
        if(state.map.isSpaceTaken(this.x, this.y, this.direction)){
          return;
        }
        this.movingProgressRemaining = 16;
      }
    }
  
    updatePosition() {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  
    updateSprite() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-" + this.direction);
        return;
      } 
        this.sprite.setAnimation("idle-" + this.direction);
    }
  
    isSpaceTaken(direction) {
      const { x, y } = utils.nextPosition(this.x, this.y, direction);
      const gridCoords = utils.asGridCoords(x, y);
      return this.walls[gridCoords] || false;
    }
  }
  
  