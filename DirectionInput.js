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

    this.images = ["img/wedding-photos/pic1.jpeg", "img/wedding-photos/pic2.jpeg", "img/wedding-photos/pic3.jpeg", 
      "img/wedding-photos/pic4.jpeg", "img/wedding-photos/pic5.jpeg", "img/wedding-photos/pic6.jpeg"];
    this.currentSlide = 0;

    // Initialize carousel canvas and context
    this.carouselCanvas = document.getElementById("carousel-canvas");
    this.carouselCtx = this.carouselCanvas.getContext("2d");

    window.addEventListener("resize", () => this.handleResize());

    // Load the initial slide
    this.loadSlide(this.currentSlide);

    // Add event listeners for carousel buttons

    // Add event listeners for carousel buttons
    document.querySelector(".prev-btn").addEventListener("click", () => this.changeSlide(-1));
    document.querySelector(".next-btn").addEventListener("click", () => this.changeSlide(1));
    document.querySelector(".close-btn").addEventListener("click", () => this.closeCarousel());


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

  loadSlide(slideIndex) {
    const img = new Image();
    img.src = this.images[slideIndex];
    img.onload = () => {
      const canvas = this.carouselCanvas;
      const ctx = this.carouselCtx;
  
      // Calculate the aspect ratio of the image and canvas
      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvas.width / canvas.height;
  
      let width, height, x, y;
  
      if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider, fit to canvas width
        width = canvas.width;
        height = width / imgAspectRatio;
        x = 0;  // Center horizontally
        y = (canvas.height - height) / 2;  // Center vertically
      } else {
        // Image is taller, fit to canvas height
        height = canvas.height;
        width = height * imgAspectRatio;
        y = 0;  // Center vertically
        x = (canvas.width - width) / 2;  // Center horizontally
      }
  
      // Clear the canvas and draw the image with the calculated size and position
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, width, height);
    };
  }
  
  handleResize() {
    // Update the canvas size when the window is resized
    this.loadSlide(this.currentSlide);
  }


  changeSlide(direction) {
    this.currentSlide += direction;
    if (this.currentSlide < 0) {
      this.currentSlide = this.images.length - 1;
    } else if (this.currentSlide >= this.images.length) {
      this.currentSlide = 0;
    }
    this.loadSlide(this.currentSlide);
  }

  closeCarousel() {
    const carouselContainer = document.querySelector(".carousel-container");
    carouselContainer.style.display = "none";
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
    console.log("Close button clicked");
    // Hide the entire info-box when the close button is clicked
    const infoBox = document.querySelector('.info-box');
    infoBox.style.display = 'none';
  }

  handleCloseButtonClick() {
    console.log("Close button clicked");
    const carouselContainer = document.querySelector(".carousel-container");
    carouselContainer.style.display = "none";
  
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
     // Add a click event listener to the close button globally
     const closeTextButton = document.querySelector('#info-box .close-button');
     closeTextButton.addEventListener('click', () => {
       this.handlecloseTextButtonClick();
     });
     closeTextButton.addEventListener('touchstart', () => {
      this.handlecloseTextButtonClick();
    });
  }
}

const directionInput = new DirectionInput();
