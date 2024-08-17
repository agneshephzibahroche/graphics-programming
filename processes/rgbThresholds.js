// RGBThresholds class for applying thresholds to RGB channels of an image
class RGBThresholds {
  constructor() {}

  applyFilter(snapshot, redThreshold, greenThreshold, blueThreshold) {
    // Create new images to hold the processed snapshot for each channel
    let redImg = createImage(snapshot.width, snapshot.height);
    let greenImg = createImage(snapshot.width, snapshot.height);
    let blueImg = createImage(snapshot.width, snapshot.height);

    // Load pixel data for each new image
    redImg.loadPixels();
    greenImg.loadPixels();
    blueImg.loadPixels();

    // Load pixel data for the original snapshot
    snapshot.loadPixels();

    // Iterate through each pixel in the snapshot
    for (let y = 0; y < snapshot.height; y++) {
      for (let x = 0; x < snapshot.width; x++) {
        let pixelIndex = (snapshot.width * y + x) * 4;
        let pixelRed = snapshot.pixels[pixelIndex + 0];
        let pixelGreen = snapshot.pixels[pixelIndex + 1];
        let pixelBlue = snapshot.pixels[pixelIndex + 2];

        // Apply threshold to red channel
        if (redThreshold > pixelRed) {
          pixelRed = 0;
        }
        redImg.pixels[pixelIndex + 0] = pixelRed;
        redImg.pixels[pixelIndex + 1] = 0;
        redImg.pixels[pixelIndex + 2] = 0;
        redImg.pixels[pixelIndex + 3] = 255;

        // Apply threshold to green channel
        if (greenThreshold > pixelGreen) {
          pixelGreen = 0;
        }
        greenImg.pixels[pixelIndex + 0] = 0;
        greenImg.pixels[pixelIndex + 1] = pixelGreen;
        greenImg.pixels[pixelIndex + 2] = 0;
        greenImg.pixels[pixelIndex + 3] = 255;

        // Apply threshold to blue channel
        if (blueThreshold > pixelBlue) {
          pixelBlue = 0;
        }
        blueImg.pixels[pixelIndex + 0] = 0;
        blueImg.pixels[pixelIndex + 1] = 0;
        blueImg.pixels[pixelIndex + 2] = pixelBlue;
        blueImg.pixels[pixelIndex + 3] = 255;
      }
    }

    // Update pixel data for each channel image
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();

    // Display each channel image
    image(redImg, 25, 300);
    image(greenImg, 225, 300);
    image(blueImg, 425, 300);

    // Label each channel with the applied threshold
    text("Red Channel Threshold", 105, 455);
    text("Green Channel Threshold", 305, 455);
    text("Blue Channel Threshold", 505, 455);
  }
}
