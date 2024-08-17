class ColorSpace1Threshold {
  // Method to apply thresholding to an image in Colour Space 1
  applyThreshold(snapshot, thresholdValue) {
    // Create a new image to store the thresholded result
    let hsbImg = createImage(snapshot.width, snapshot.height);
    // Load pixel data for the new image
    hsbImg.loadPixels();

    // Load pixel data for the original image
    snapshot.loadPixels();

    // Iterate over each pixel in the image
    for (let y = 0; y < snapshot.height; y++) {
      for (let x = 0; x < snapshot.width; x++) {
        // Calculate the index of the current pixel in the pixel array
        let pixelIndex = (snapshot.width * y + x) * 4;
        // Retrieve the RGB values of the current pixel
        let pixelRed = snapshot.pixels[pixelIndex + 0];
        let pixelGreen = snapshot.pixels[pixelIndex + 1];
        let pixelBlue = snapshot.pixels[pixelIndex + 2];

        // Convert RGB values to HSB color space
        let hsb = this.rgbToHsb(pixelRed, pixelGreen, pixelBlue);

        // Set hue and saturation values from the original image
        hsbImg.pixels[pixelIndex + 0] = hsb[0] * 1.5; // Hue
        hsbImg.pixels[pixelIndex + 1] = hsb[1] * 1.5; // Saturation

        // Apply thresholding based on the brightness value
        let scaledBrightness;
        if (hsb[2] <= thresholdValue) {
          // Scale brightness value based on the threshold
          scaledBrightness = map(hsb[2], 0, thresholdValue, 0, 100);
        } else {
          // Apply color as threshold value increases
          scaledBrightness = map(hsb[2], thresholdValue, 100, 100, 200);
        }
        // Set the brightness value in the thresholded image
        hsbImg.pixels[pixelIndex + 2] = scaledBrightness * 2; // Scale to match the range in ColourSpace1 function

        // Set alpha value to fully opaque
        hsbImg.pixels[pixelIndex + 3] = 255;
      }
    }

    // Update pixel data for the thresholded image
    hsbImg.updatePixels();

    image(hsbImg, 225, 600);
    // Add text label indicating the thresholded color space
    text("Colour Space 1 Threshold", 305, 755);
  }

  // Method to convert RGB color to HSB color space
  rgbToHsb(r, g, b) {
    // Use the p5.js color() function to create a color object from RGB values
    let rgbColor = color(r, g, b);

    // Extract HSB values from the color object
    // Need to implement the algorithm for extracting HSB value from RGB for coursework
    let h = hue(rgbColor);
    let s = saturation(rgbColor);
    let br = brightness(rgbColor);

    // Return the HSB values as an array
    return [h, s, br];
  }
}
