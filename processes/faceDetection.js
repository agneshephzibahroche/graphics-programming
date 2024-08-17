// FaceDetection class for detecting faces in an image and applying processing based on user input
class FaceDetection {
  // Constructor to initialize the FaceDetection with a face detector
  constructor(detector) {
    this.detector = detector; // Face detector object
  }

  // Method to detect faces in the given snapshot and process them
  detectAndProcess(snapshot) {
    // Create a new image to store the processed result
    let faceImg = createImage(snapshot.width, snapshot.height);
    faceImg.loadPixels();

    // Load pixel data for the snapshot
    snapshot.loadPixels();
    // Detect faces in the snapshot using the face detector
    let faces = this.detector.detect(snapshot.canvas);

    // Iterate over each detected face
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      // If the detected face has sufficient confidence
      if (face[4] > 4) {
        // Process pixels of the detected face region
        this.processPixels(
          int(face[0]),
          int(face[1]),
          int(face[2]),
          int(face[3]),
          faceImg
        );
      }
    }

    // Update pixel data for the face image
    faceImg.updatePixels();
    // Display both the original snapshot and the processed face image
    image(snapshot, 25, 600);
    image(faceImg, 15, 600);

    // Add text labels indicating the applied filters and instructions for user interaction
    text("Face Detection", 105, 740);
    text("Press 'g' for Greyscale", 105, 755);
    text("Press 'b' for Blur", 105, 770);
    text("Press 'c' for Colour Conversion", 105, 785);
    text("Press 'p' for Pixelation", 105, 800);
  }

  // Method to draw borders around the detected face region
  processPixels(startX, startY, dWidth, dHeight, faceImg) {
    stroke(255);
    strokeWeight(2);

    // Draw top border
    for (let x = startX; x < startX + dWidth; x++) {
      let pixelIndex = (faceImg.width * startY + x) * 4;
      this.setPixelToWhite(faceImg, pixelIndex);
    }

    // Draw bottom border
    for (let x = startX; x < startX + dWidth; x++) {
      let pixelIndex = (faceImg.width * (startY + dHeight - 1) + x) * 4;
      this.setPixelToWhite(faceImg, pixelIndex);
    }

    // Draw left border
    for (let y = startY; y < startY + dHeight; y++) {
      let pixelIndex = (faceImg.width * y + startX) * 4;
      this.setPixelToWhite(faceImg, pixelIndex);
    }

    // Draw right border
    for (let y = startY; y < startY + dHeight; y++) {
      let pixelIndex = (faceImg.width * y + (startX + dWidth - 1)) * 4;
      this.setPixelToWhite(faceImg, pixelIndex);
    }
  }

  // Method to set pixel values to white (255) in an image
  setPixelToWhite(image, pixelIndex) {
    image.pixels[pixelIndex + 0] = 255; // Red
    image.pixels[pixelIndex + 1] = 255; // Green
    image.pixels[pixelIndex + 2] = 255; // Blue
    image.pixels[pixelIndex + 3] = 255; // Alpha
  }
}
