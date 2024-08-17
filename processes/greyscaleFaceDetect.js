// GreyscaleFaceDetect class for detecting faces and converting the detected face regions to grayscale
class GreyscaleFaceDetect {
  // Constructor to initialize the GreyscaleFaceDetect with a face detector
  constructor(detector) {
    this.detector = detector; // Face detector object
  }

  // Method to detect faces in the given snapshot and convert the detected face regions to grayscale
  detectAndConvert(snapshot) {
    // Create a new image to store the result
    let faceImg = createImage(snapshot.width, snapshot.height);
    // Load pixel data for the new image
    faceImg.loadPixels();

    // Detect faces in the snapshot using the face detector
    let faces = this.detector.detect(snapshot.canvas);
    // Load pixel data for the original snapshot
    snapshot.loadPixels();

    // Copy pixel data from the original snapshot to the new image
    for (let i = 0; i < snapshot.pixels.length; i++) {
      faceImg.pixels[i] = snapshot.pixels[i];
    }

    // Iterate over each detected face
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      // If the detected face has sufficient confidence
      if (face[4] > 4) {
        // Convert the face region to grayscale
        this.greyscalePixels(
          int(face[0]) - 10,
          int(face[1]),
          int(face[2]),
          int(face[3]),
          faceImg
        );
      }
    }

    // Update pixel data for the new image
    faceImg.updatePixels();
    // Display the resulting image with grayscale face regions
    image(faceImg, 25, 600);
  }

  // Method to convert a region of an image to grayscale
  greyscalePixels(startX, startY, dWidth, dHeight, faceImg) {
    // Convert the face region to grayscale
    for (let y = startY; y < startY + dHeight; y++) {
      for (let x = startX; x < startX + dWidth; x++) {
        let pixelIndex = (faceImg.width * y + x) * 4;
        let pixelRed = faceImg.pixels[pixelIndex + 0];
        let pixelGreen = faceImg.pixels[pixelIndex + 1];
        let pixelBlue = faceImg.pixels[pixelIndex + 2];

        // Calculate grayscale value using weighted average of RGB channels
        let grey = 0.299 * pixelRed + 0.587 * pixelGreen + 0.114 * pixelBlue;

        // Set RGB values to the grayscale value
        faceImg.pixels[pixelIndex + 0] = grey; // Red
        faceImg.pixels[pixelIndex + 1] = grey; // Green
        faceImg.pixels[pixelIndex + 2] = grey; // Blue
      }
    }
  }
}
