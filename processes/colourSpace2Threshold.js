class ColorSpace2Threshold {
  // Method to apply thresholding to an image in Colour Space 2
  applyThreshold(snapshot, thresholdValue) {
    // Create a new image to store the thresholded result
    let thresholdedImage = createImage(snapshot.width, snapshot.height);
    // Load pixel data for the new image
    thresholdedImage.loadPixels();

    // Load pixel data for the original image
    snapshot.loadPixels();

    // Iterate over each pixel in the image
    for (let y = 0; y < snapshot.height; y++) {
      for (let x = 0; x < snapshot.width; x++) {
        // Calculate the index of the current pixel in the pixel array
        let pixelIndex = (snapshot.width * y + x) * 4;
        // Retrieve the YCbCr values of the current pixel
        let ycbcrY = snapshot.pixels[pixelIndex + 0];
        let ycbcrCb = snapshot.pixels[pixelIndex + 1] - 128;
        let ycbcrCr = snapshot.pixels[pixelIndex + 2] - 128;

        // Apply thresholding based on the Cb component
        let scaledCb = map(ycbcrCb, -128, 128, 0, 255);
        let scaledCr = map(ycbcrCr, -128, 128, 0, 255);
        let thresholdedValue =
          scaledCb * scaledCb + scaledCr * scaledCr <=
          thresholdValue * thresholdValue
            ? 0
            : 255;

        // Set the pixel value in the thresholded image
        thresholdedImage.pixels[pixelIndex + 0] = thresholdedValue; // Red component
        thresholdedImage.pixels[pixelIndex + 1] = thresholdedValue; // Green component
        thresholdedImage.pixels[pixelIndex + 2] = thresholdedValue; // Blue component
        thresholdedImage.pixels[pixelIndex + 3] = 255; // Alpha component (fully opaque)
      }
    }

    // Update pixel data for the thresholded image
    thresholdedImage.updatePixels();

    // Display the thresholded image
    image(thresholdedImage, 425, 600);
    // Add text label indicating the thresholded color space
    text("Colour Space 2 Threshold", 505, 755);
  }
}
