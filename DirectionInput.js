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
  }
}
const directionInput = new DirectionInput();
directionInput.init();
