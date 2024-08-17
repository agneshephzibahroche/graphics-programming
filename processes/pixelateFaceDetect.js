// PixelateFaceDetection class for detecting faces and applying pixelation effect to the detected face regions
class PixelateFaceDetection {
  // Constructor to initialize the PixelateFaceDetection with a face detector
  constructor(detector) {
    this.detector = detector; // Face detector object
  }

  // Method to detect faces in the given snapshot and apply pixelation effect to the detected face regions
  detectAndPixelate(snapshot) {
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
        // Apply pixelation effect to the face region
        this.pixelatePixels(
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
    // Display the resulting image with pixelated face regions
    image(faceImg, 25, 600);
  }

  // Method to apply pixelation effect to a region of an image
  pixelatePixels(startX, startY, dWidth, dHeight, faceImg) {
    let pixelatedSize = 5; // Size of each pixelated block

    // Iterate over each block in the face region
    for (let y = startY; y < startY + dHeight; y += pixelatedSize) {
      for (let x = startX; x < startX + dWidth; x += pixelatedSize) {
        let sumRed = 0;
        let sumGreen = 0;
        let sumBlue = 0;

        // Calculate the sum of RGB values of pixels in the block
        for (let i = 0; i < pixelatedSize; i++) {
          for (let j = 0; j < pixelatedSize; j++) {
            // Ensure the coordinates are within the image boundaries
            if (x + i < faceImg.width && y + j < faceImg.height) {
              let pixelIndex = (faceImg.width * (y + j) + (x + i)) * 4;
              sumRed += faceImg.pixels[pixelIndex + 0];
              sumGreen += faceImg.pixels[pixelIndex + 1];
              sumBlue += faceImg.pixels[pixelIndex + 2];
            }
          }
        }

        // Calculate the average RGB values of the block
        let aveRed = sumRed / (pixelatedSize * pixelatedSize);
        let aveGreen = sumGreen / (pixelatedSize * pixelatedSize);
        let aveBlue = sumBlue / (pixelatedSize * pixelatedSize);

        // Paint the block with the average RGB values
        for (let i = 0; i < pixelatedSize; i++) {
          for (let j = 0; j < pixelatedSize; j++) {
            let pixelIndex = (faceImg.width * (y + j) + (x + i)) * 4;
            faceImg.pixels[pixelIndex + 0] = aveRed; // Red
            faceImg.pixels[pixelIndex + 1] = aveGreen; // Green
            faceImg.pixels[pixelIndex + 2] = aveBlue; // Blue
          }
        }
      }
    }
  }
}
