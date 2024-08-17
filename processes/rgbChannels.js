// RGBChannels class for separating the RGB channels of an image
class RGBChannels {
  constructor() {}

  applyFilter(snapshot) {
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

        // Set the red channel only
        redImg.pixels[pixelIndex + 0] = pixelRed; // Red
        redImg.pixels[pixelIndex + 1] = 0; // Green
        redImg.pixels[pixelIndex + 2] = 0; // Blue
        redImg.pixels[pixelIndex + 3] = 255; // Alpha

        // Set the green channel only
        greenImg.pixels[pixelIndex + 0] = 0; // Red
        greenImg.pixels[pixelIndex + 1] = pixelGreen; // Green
        greenImg.pixels[pixelIndex + 2] = 0; // Blue
        greenImg.pixels[pixelIndex + 3] = 255; // Alpha

        // Set the blue channel only
        blueImg.pixels[pixelIndex + 0] = 0; // Red
        blueImg.pixels[pixelIndex + 1] = 0; // Green
        blueImg.pixels[pixelIndex + 2] = pixelBlue; // Blue
        blueImg.pixels[pixelIndex + 3] = 255; // Alpha
      }
    }

    // Update pixel data for each channel image
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();

    // Display each channel image
    image(redImg, 25, 160);
    image(greenImg, 225, 160);
    image(blueImg, 425, 160);

    // Label each channel
    text("Red Channel", 105, 295);
    text("Green Channel", 305, 295);
    text("Blue Channel", 505, 295);
  }
}
