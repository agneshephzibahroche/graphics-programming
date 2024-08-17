// DogFilter class for applying a dog filter effect to an image
class DogFilter {
  // Constructor to initialize the DogFilter with a face detector and a dog image
  constructor(detector, dogImage) {
    this.detector = detector; // Face detector object
    this.dogImage = dogImage; // Dog image used for the filter effect
  }

  // Method to apply the dog filter effect to the given snapshot
  apply(snapshot) {
    // Create a new image to store the filtered result
    let faceImg = createImage(snapshot.width, snapshot.height);
    faceImg.loadPixels();

    // Load pixel data for the snapshot
    snapshot.loadPixels();
    // Detect faces in the snapshot using the face detector
    let faces = this.detector.detect(snapshot.canvas);

    // Copy pixel data from the snapshot to the face image
    for (let i = 0; i < snapshot.pixels.length; i++) {
      faceImg.pixels[i] = snapshot.pixels[i];
    }

    // Iterate over each detected face
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      // If the detected face has sufficient confidence
      if (face[4] > 4) {
        // Apply the dog filter overlay to the face region
        this.overlayImage(
          int(face[0]) - 10,
          int(face[1]) - 10,
          int(face[2]),
          int(face[3]),
          faceImg
        );
      }
    }

    // Update pixel data for the face image
    faceImg.updatePixels();
    // Display the filtered image with the dog filter overlay
    image(faceImg, 425, 20);
    // Add text label indicating the applied filter
    text("Dog Filter", 505, 155);
  }

  // Method to overlay the dog image onto a specified region of another image
  overlayImage(startX, startY, dWidth, dHeight, faceImg) {
    this.dogImage.loadPixels();
    this.dogImage.resize(dWidth, dHeight);

    // Iterate over each pixel in the dog image
    for (let y = 0; y < dHeight; y++) {
      for (let x = 0; x < dWidth; x++) {
        // Calculate pixel indices for the dog image and the face image
        let dogPixelIndex = (y * this.dogImage.width + x) * 4;
        let facePixelIndex = ((startY + y) * faceImg.width + (startX + x)) * 4;

        // Retrieve color components from the dog image
        let dogR = this.dogImage.pixels[dogPixelIndex];
        let dogG = this.dogImage.pixels[dogPixelIndex + 1];
        let dogB = this.dogImage.pixels[dogPixelIndex + 2];
        let dogA = this.dogImage.pixels[dogPixelIndex + 3] / 255; // Normalize alpha

        // Blend the dog image pixel with the face image pixel using alpha compositing
        faceImg.pixels[facePixelIndex] = lerp(
          faceImg.pixels[facePixelIndex],
          dogR,
          dogA
        );
        faceImg.pixels[facePixelIndex + 1] = lerp(
          faceImg.pixels[facePixelIndex + 1],
          dogG,
          dogA
        );
        faceImg.pixels[facePixelIndex + 2] = lerp(
          faceImg.pixels[facePixelIndex + 2],
          dogB,
          dogA
        );
        // Update the alpha channel of the face image pixel
        faceImg.pixels[facePixelIndex + 3] = max(
          faceImg.pixels[facePixelIndex + 3],
          dogA * 255
        );
      }
    }
  }
}
