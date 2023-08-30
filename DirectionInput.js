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

    this.init();
    this.currentIndex = 0;

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


    // Add references to carousel elements
    this.prevButton = document.querySelector('#prev-button');
    this.nextButton = document.querySelector('#next-button');
    // this.closeButton = document.querySelector('#close-button');
    this.carouselContent = document.querySelector('.carousel-content');

    // // Add click event listeners for carousel buttons
    this.prevButton.addEventListener('click', () => this.updateSlide(this.currentIndex - 1));
    this.nextButton.addEventListener('click', () => this.updateSlide(this.currentIndex + 1));
    // this.closeButton.addEventListener('click', () => this.handleCloseButtonClick());
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

  handleCloseButtonClick() {
    console.log("Close button clicked");
  
    const carousel = document.querySelector('.carousel');
    carousel.style.display = 'none';
  }


  updateSlide(index) {
    if (index >= 0 && index < 6) {
      this.currentIndex = index;
      console.log("currentIndex : ", this.currentIndex)
      const translateX = -this.currentIndex * 100 + "%";
      this.carouselContent.style.transform = `translateX(${translateX})`;
  
      // Update images based on the index
      const imagePaths = [
        "img/wedding-photos/pic1.jpeg",
        "img/wedding-photos/pic2.jpeg",
        "img/wedding-photos/pic3.jpeg",
        "img/wedding-photos/pic4.jpeg",
        "img/wedding-photos/pic5.jpeg",
        // Add more image paths for pic3, pic4, etc.
      ];
      const nextIndex = (this.currentIndex + 1) % imagePaths.length;

    // Create and set the image element
    const imageElement = document.createElement("img");
    imageElement.src = imagePaths[nextIndex];

    // Clear previous content and add the new image
    this.carouselContent.innerHTML = "";
    this.carouselContent.appendChild(imageElement);

    this.currentImageElement = imageElement; // Store the reference
  }
  const checkImagePathButton = document.querySelector('#check-image-path-button');
    checkImagePathButton.addEventListener('click', () => {
      if (this.currentImageElement) {
        console.log("Current Image Path:", this.currentImageElement.src);
      } else {
        console.log("No current image element.");
      }
    });

  }

    
  


  init() {

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

    const closePhotoButton = document.querySelector('#photo-carousel .close-button');
     closePhotoButton.addEventListener('click', () => {
       this.handleCloseButtonClick();
     });

     // Add a click event listener to the close button globally
     const closeTextButton = document.querySelector('#info-box .close-button');
     closeTextButton.addEventListener('click', () => {
       this.handlecloseTextButtonClick();
     });
  }
}

// const directionInput = new DirectionInput();
