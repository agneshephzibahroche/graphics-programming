// Class for detecting faces in an image and blurring them
class BlurFaceDetect {
  constructor(detector) {
    this.detector = detector;
  }

  // Detect faces in the image and apply blur
  detectAndBlurFaces(snapshot) {
    let faceImg = createImage(snapshot.width, snapshot.height);
    faceImg.loadPixels();
    let faces = this.detector.detect(snapshot.canvas);
    snapshot.loadPixels();

    // Copy original pixels to the face image
    for (let i = 0; i < snapshot.pixels.length; i++) {
      faceImg.pixels[i] = snapshot.pixels[i];
    }

    // Iterate over detected faces
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      if (face[4] > 4) {
        this.blurPixels(
          int(face[0]) - 10,
          int(face[1]),
          int(face[2]),
          int(face[3]),
          faceImg
        );
      }
    }

    faceImg.updatePixels();
    image(faceImg, 25, 600);
  }

  // Apply blur effect to the specified region of the image
  blurPixels(startX, startY, dWidth, dHeight, faceImg) {
    let matrix = this.getSimpleBlurKernel(20);
    for (let y = startY; y < startY + dHeight; y++) {
      for (let x = startX; x < startX + dWidth; x++) {
        let pixelIndex = (faceImg.width * y + x) * 4;
        let c = this.convolution(x, y, matrix, faceImg);
        faceImg.pixels[pixelIndex + 0] = c[0];
        faceImg.pixels[pixelIndex + 1] = c[1];
        faceImg.pixels[pixelIndex + 2] = c[2];
      }
    }
  }

  // Generate a simple blur kernel
  getSimpleBlurKernel(size) {
    let m = [];
    for (let i = 0; i < size; i++) {
      let n = [];
      for (let j = 0; j < size; j++) {
        n.push(1 / (size * size));
      }
      m.push(n);
    }
    return m;
  }

  // Apply convolution on a pixel using a kernel
  convolution(x, y, matrix, img) {
    let matrixSize = matrix.length;
    let totalRed = 0.0;
    let totalGreen = 0.0;
    let totalBlue = 0.0;
    let offset = floor(matrixSize / 2);

    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        let xloc = x + i - offset;
        let yloc = y + j - offset;
        let index = (xloc + img.width * yloc) * 4;
        index = constrain(index, 0, img.pixels.length - 1);

        totalRed += img.pixels[index + 0] * matrix[i][j];
        totalGreen += img.pixels[index + 1] * matrix[i][j];
        totalBlue += img.pixels[index + 2] * matrix[i][j];
      }
    }
    return [totalRed, totalGreen, totalBlue];
  }
}
