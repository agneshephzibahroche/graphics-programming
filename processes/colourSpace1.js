class ColorSpace1Converter {
  // Constructor to initialize the color space converter
  constructor() {}

  // Method to convert RGB image to another color space
  convertToColorSpace1(snapshot) {
    // Create a new image to store the result in the desired color space
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
        // Modify the color components to display hue as red, saturation as green, and brightness as blue
        hsbImg.pixels[pixelIndex + 0] = hsb[0] * 1.5; // Red component
        hsbImg.pixels[pixelIndex + 1] = hsb[1] * 1.5; // Green component
        hsbImg.pixels[pixelIndex + 2] = hsb[2] * 2; // Blue component
        hsbImg.pixels[pixelIndex + 3] = 255; // Alpha component (fully opaque)
      }
    }
    // Update pixel data for the new image
    hsbImg.updatePixels();
    // Display the converted image
    image(hsbImg, 225, 460);
    // Add text label indicating the color space
    text("Colour Space 1", 305, 595);
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
