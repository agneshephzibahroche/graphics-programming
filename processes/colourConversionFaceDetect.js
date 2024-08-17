class ColorConversionFaceDetector {
  constructor(detector) {
    this.detector = detector;
  }

  // Method to detect faces in an image and convert their color space
  detectAndConvertColorSpace(snapshot) {
    // Create a new image with the same dimensions as the snapshot
    let faceImg = createImage(snapshot.width, snapshot.height);
    // Load pixel data for the newly created image
    faceImg.loadPixels();
    // Detect faces in the snapshot using a face detection algorithm
    let faces = this.detector.detect(snapshot.canvas);
    // Load pixel data for the original snapshot
    snapshot.loadPixels();

    // Copy pixel data from the original snapshot to the face image
    for (let i = 0; i < snapshot.pixels.length; i++) {
      faceImg.pixels[i] = snapshot.pixels[i];
    }

    // Iterate over each detected face
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      // If the detected face has sufficient confidence
      if (face[4] > 4) {
        // Convert the color space of the pixels within the bounding box of the face
        this.convertColorSpacePixels(
          int(face[0]) - 10,
          int(face[1]),
          int(face[2]),
          int(face[3]),
          faceImg
        );
      }
    }
    // Update pixel data for the face image
    faceImg.updatePixels();
    // Display the modified face image
    image(faceImg, 25, 600);
  }

  // Method to convert the color space of pixels within a specified region of an image
  convertColorSpacePixels(startX, startY, dWidth, dHeight, faceImg) {
    // Loop through each pixel within the specified region
    for (let y = startY; y < startY + dHeight; y++) {
      for (let x = startX; x < startX + dWidth; x++) {
        // Calculate the index of the current pixel in the image pixel array
        let pixelIndex = (faceImg.width * y + x) * 4;
        // Retrieve the RGB values of the pixel
        let pixelRed = faceImg.pixels[pixelIndex + 0];
        let pixelGreen = faceImg.pixels[pixelIndex + 1];
        let pixelBlue = faceImg.pixels[pixelIndex + 2];

        // Convert RGB to HSB color space
        let hsb = this.rgbToHsb(pixelRed, pixelGreen, pixelBlue);
        // Modify the color components to display hue as red, saturation as green, and brightness as blue
        faceImg.pixels[pixelIndex + 0] = hsb[0] * 1.5; // Red component
        faceImg.pixels[pixelIndex + 1] = hsb[1] * 1.5; // Green component
        faceImg.pixels[pixelIndex + 2] = hsb[2] * 2; // Blue component
        faceImg.pixels[pixelIndex + 3] = 255; // Alpha component (fully opaque)
      }
    }
  }

  // Method to convert RGB color to HSB color space
  rgbToHsb(r, g, b) {
    let maxVal = Math.max(r, g, b);
    let minVal = Math.min(r, g, b);
    let delta = maxVal - minVal;
    let hue = 0,
      saturation = 0,
      brightness = 0;

    if (delta !== 0) {
      if (maxVal === r) {
        hue = (g - b) / delta;
      } else if (maxVal === g) {
        hue = 2 + (b - r) / delta;
      } else {
        hue = 4 + (r - g) / delta;
      }
      hue *= 60;
      if (hue < 0) hue += 360;
      saturation = delta / maxVal;
    }
    brightness = maxVal;
    return [hue, saturation, brightness];
  }
}
