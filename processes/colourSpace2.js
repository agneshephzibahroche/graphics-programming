class ColorSpace2Converter {
  // Method to convert RGB image to Colour Space 2 (YCbCr)
  convertToColorSpace2(snapshot) {
    // Create a new image to store the result in Colour Space 2
    let ycbcrImg = createImage(snapshot.width, snapshot.height);
    // Load pixel data for the new image
    ycbcrImg.loadPixels();

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

        // Convert RGB values to YCbCr color space
        let ycbcr = this.rgbToYCbCr(pixelRed, pixelGreen, pixelBlue);
        // Modify the color components to display Y component as red, Cb as green, and Cr as blue
        ycbcrImg.pixels[pixelIndex + 0] = ycbcr[0]; // Y component (Red)
        ycbcrImg.pixels[pixelIndex + 1] = ycbcr[1] + 128; // Cb component (Green)
        ycbcrImg.pixels[pixelIndex + 2] = ycbcr[2] + 128; // Cr component (Blue)
        ycbcrImg.pixels[pixelIndex + 3] = 255; // Alpha component (fully opaque)
      }
    }
    // Update pixel data for the new image
    ycbcrImg.updatePixels();
    // Display the image in Colour Space 2
    image(ycbcrImg, 425, 460);
    // Add text label indicating the color space
    text("Colour Space 2", 505, 595);
  }

  // Method to convert RGB color to YCbCr color space
  rgbToYCbCr(r, g, b) {
    // Calculate YCbCr components from RGB values
    let y = 0.299 * r + 0.587 * g + 0.114 * b;
    let cb = -0.169 * r - 0.331 * g + 0.5 * b;
    let cr = 0.5 * r - 0.419 * g - 0.081 * b;

    // Return the YCbCr values as an array
    return [y, cb, cr];
  }
}
