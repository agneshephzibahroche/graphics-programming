// GreyscaleAndBrightness class for converting an image to grayscale and adjusting brightness
class GreyscaleAndBrightness {
  constructor() {}

  applyFilter(snapshot) {
    // Create a new image to store the result
    let img = createImage(snapshot.width, snapshot.height);

    // Load pixel data for the original snapshot
    snapshot.loadPixels();
    // Load pixel data for the new image
    img.loadPixels();

    // Iterate through each pixel and convert to grayscale
    for (let y = 0; y < snapshot.height; y++) {
      for (let x = 0; x < snapshot.width; x++) {
        let pixelIndex = (snapshot.width * y + x) * 4;
        let pixelRed = snapshot.pixels[pixelIndex];
        let pixelGreen = snapshot.pixels[pixelIndex + 1];
        let pixelBlue = snapshot.pixels[pixelIndex + 2];

        // Calculate average of RGB values and adjust brightness
        let ave =
          (constrain(pixelRed * 1.2, 0, 255) +
            constrain(pixelGreen * 1.2, 0, 255) +
            constrain(pixelBlue * 1.2, 0, 255)) /
          3;

        // Set RGB values to average
        img.pixels[pixelIndex] = ave;
        img.pixels[pixelIndex + 1] = ave;
        img.pixels[pixelIndex + 2] = ave;
        img.pixels[pixelIndex + 3] = 255; // Set alpha value to 255 (opaque)
      }
    }

    // Update pixels for grayscale image
    img.updatePixels();

    // Display grayscale image
    image(img, 225, 20);
    // Add text label indicating the applied filter
    text("Greyscale Image", 305, 155);
  }
}
