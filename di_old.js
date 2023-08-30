class DirectionInput {
    constructor() {
      this.heldDirections = [];
  
      this.keys = [];
      this.map = {
        "ArrowUp": "up",
        "KeyW": "up",
        "ArrowDown": "down",
        "KeyS": "down",
        "ArrowLeft": "left",
        "KeyA": "left",
        "ArrowRight": "right",
        "KeyD": "right",
      }
  
      // this.prevButton = document.getElementById("prev-slide");
      // this.nextButton = document.getElementById("next-slide");
      // this.closeButton = document.getElementById("close-slide");
  
  
  
      this.init();
  
      // Add the close button reference
      this.closeTextButton = document.querySelector('#info-box .close-button'); // Updated selector
      
      // Add a click event listener to the close button
      this.closeTextButton.addEventListener('click', () => {
      this.handlecloseTextButtonClick();
      });
      // Add a touchstart event listener to the close button for mobile devices
      this.closeTextButton.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent the default touch behavior
        this.handlecloseTextButtonClick();
  
      });
  
  
  
      // Add touch event listeners
      document.addEventListener("touchstart", e => this.handleTouchStart(e));
      document.addEventListener("touchmove", e => this.handleTouchMove(e));
      document.addEventListener("touchend", () => this.handleTouchEnd());
  
       // Prevent zooming and dragging by adding event listeners to the document
      document.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
      document.addEventListener("gesturestart", e => e.preventDefault());
  
      // Prevent context menu on long press
      document.addEventListener("contextmenu", e => e.preventDefault());
    }
  
    get direction() {
      return this.heldDirections[0];
    }
  
    // Handle the touch start event
    handleTouchStart(event) {
      const touch = event.touches[0];
      this.touchPosition = { x: touch.clientX, y: touch.clientY };
    }
  
    // Handle the touch move event
    handleTouchMove(event) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.touchPosition.x;
      const deltaY = touch.clientY - this.touchPosition.y;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        this.heldDirections[0] = deltaX > 0 ? "right" : "left";
      } else {
        this.heldDirections[0] = deltaY > 0 ? "down" : "up";
      }
  
      this.touchPosition = { x: touch.clientX, y: touch.clientY };
    }
  
    handleTouchEnd() {
      this.heldDirections = []; // Clear the heldDirections array when touch is released
    }
  
    handlecloseTextButtonClick() {
      // Hide the entire info-box when the close button is clicked
      const infoBox = document.querySelector('#info-box');
      infoBox.style.display = 'none';
    }
  
    // handleNavClick(direction) {
    //   const slideshowImages = document.querySelectorAll(".slideshow-image");
    //   let currentSlideIndex = Array.from(slideshowImages).findIndex(image => image.classList.contains("active"));
  
    //   if (direction === "prev") {
    //     currentSlideIndex = (currentSlideIndex - 1 + slideshowImages.length) % slideshowImages.length;
    //   } else if (direction === "next") {
    //     currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
    //   }
  
    //   slideshowImages.forEach((image, idx) => {
    //     if (idx === currentSlideIndex) {
    //       image.classList.add("active");
    //     } else {
    //       image.classList.remove("active");
    //     }
    //   });
    // }
  
  
    // handleCloseClick() {
    //   const slideshow = document.querySelector('#photo-slideshow');
    //   slideshow.style.display = "none";
      
    //   // Hide individual photos
    //   const photos = slideshow.querySelectorAll('.slideshow-image');
    //   photos.forEach(photo => {
    //     photo.style.display = "none";
    //   });
      
    //   // Hide navigation buttons (prev and next)
    //   const prevButton = slideshow.querySelector('.slideshow-nav.prev');
    //   const nextButton = slideshow.querySelector('.slideshow-nav.next');
    //   prevButton.style.display = "none";
    //   nextButton.style.display = "none";
      
    //   // Hide the close button
    //   const closeButton = slideshow.querySelector('.slideshow-close');
    //   closeButton.style.display = "none";
    // }
    
    
  
    init() {
      // this.prevButton.addEventListener("click", () => this.handleNavClick("prev"));
      // this.nextButton.addEventListener("click", () => this.handleNavClick("next"));
      // this.closeButton.addEventListener("click", () => this.handleCloseClick());
  
      // this.prevButton.addEventListener("touchstart", () => this.handleNavClick("prev"));
      // this.nextButton.addEventListener("touchstart", () => this.handleNavClick("next"));
      // this.closeButton.addEventListener("touchstart", () => this.handleCloseClick());
  
  
      document.addEventListener("keydown", e => {
        const dir = this.map[e.code];
        if (dir && this.heldDirections.indexOf(dir) === -1) {
          this.heldDirections.unshift(dir);
        }
      });
  
      document.addEventListener("keyup", e => {
        const dir = this.map[e.code];
        const index = this.heldDirections.indexOf(dir);
        if (index > -1) {
          this.heldDirections.splice(index, 1);
        }
      });
  
       // Add a click event listener to the close button globally
       const closeTextButton = document.querySelector('#info-box .close-button');
       closeTextButton.addEventListener('click', () => {
         this.handlecloseTextButtonClick();
       });
    }
  }
  
  const directionInput = new DirectionInput();
  directionInput.init();
  