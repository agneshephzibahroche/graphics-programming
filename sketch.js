/*
## Report: Image Processing Project Findings and Reflection

### Overview:

My project focused on image processing techniques, particularly on thresholding RGB channels and applying filters to detected face regions. The main objective was to explore different methods of manipulating images and to implement these techniques using object-oriented programming (OOP) principles.

### Image Thresholding:

Thresholding each color channel individually provided insights into how different channels contribute to the overall image. By applying thresholds to the red, green, and blue channels separately, I could isolate specific features or objects based on their color characteristics. This technique proved useful for segmentation tasks, such as highlighting specific areas of interest or removing unwanted elements from an image.

### Face Detection and Filters:

Implementing face detection and applying filters to detected face regions presented unique challenges. Initially, I encountered difficulties with the accuracy and reliability of the face detection algorithm, which affected the placement and size of the detected face regions. Refactoring the code and fine-tuning the parameters helped improve the detection accuracy and ensure that the filters were applied correctly.

### Challenges and Solutions:

### Face Detection Accuracy:

One of the primary challenges was achieving accurate face detection within the desired regions of the image. Initially, the detection algorithm failed to identify faces consistently, leading to inaccurate results. By adjusting the parameters and optimising the algorithm, I was able to enhance the detection accuracy and ensure that the filters were applied precisely to the detected face regions.

### Project Completion:

### Target Achievement:

Despite facing challenges with face detection, I was able to successfully complete the project within the set timeframe. Through iterative development, I addressed the issues promptly and achieved the objectives. By adhering to a structured development process and maintaining open communication, I stayed on target and met my project goals.

### Project Extension:

### Dog Filter Implementation:

As an extension to the project, I implemented a dog filter similar to popular social media filters. This unique feature involved overlaying a predefined image onto the detected face regions, transforming them into a dog-like appearance. The implementation of this filter added an element of creativity and entertainment to the project, showcasing the versatility of image processing techniques.

### Conclusion:

In conclusion, my project provided valuable insights into image processing techniques and their practical applications. By overcoming challenges and leveraging OOP principles, I successfully implemented various filters and thresholding methods. The project extension further enhanced the functionality and appeal of the application, demonstrating the potential for innovative image processing solutions.
*/

let video; // Video capture variable
let snapshot; // Snapshot variable
let font; // Font variable

// Slider variables
let redSlider;
let greenSlider;
let blueSlider;
let colourSpace1Slider;
let colourSpace2Slider;

// Filter objects
let colorSpace1Converter;
let colorSpace2Converter;
let colorSpace1Threshold;
let colorSpace2Threshold;
let greyscaleAndBrightness;
let rgbChannels;
let rgbThresholds;

// Face detection variables
let detector;
let classifier = objectdetect.frontalface;
let blurFaceDetector;
let colorConversionFaceDetector;
let dogFilter;
let faceDetection;
let greyscaleFaceDetect;
let pixelateFaceDetection;

// Preload function to load assets
function preload() {
  // Load dog image and font
  dogImage = loadImage("assets/dog.png");
  font = loadFont("assets/RobotoCondensed-VariableFont_wght.ttf");
}

// Setup function to initialize the canvas and other components
function setup() {
  // Create canvas
  createCanvas(1200, 810);
  pixelDensity(1);
  textFont(font);
  textSize(12);
  textAlign(CENTER);

  // Create sliders
  redSlider = createSlider(0, 255, 127.5);
  redSlider.position(20, 425);
  redSlider.size(165);

  greenSlider = createSlider(0, 255, 127.5);
  greenSlider.position(220, 425);
  greenSlider.size(165);

  blueSlider = createSlider(0, 255, 127.5);
  blueSlider.position(420, 425);
  blueSlider.size(165);

  colourSpace1Slider = createSlider(0, 255, 70);
  colourSpace1Slider.position(220, 725);
  colourSpace1Slider.size(165);

  colourSpace2Slider = createSlider(0, 255, 70);
  colourSpace2Slider.position(420, 725);
  colourSpace2Slider.size(165);

  // Create video capture
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();

  // Initialize filter objects
  colorSpace1Converter = new ColorSpace1Converter();
  colorSpace2Converter = new ColorSpace2Converter();
  colorSpace1Threshold = new ColorSpace1Threshold();
  colorSpace2Threshold = new ColorSpace2Threshold();
  greyscaleAndBrightness = new GreyscaleAndBrightness();
  rgbChannels = new RGBChannels();
  rgbThresholds = new RGBThresholds(snapshot);

  // Initialize face detector
  var scaleFactor = 1.2;
  detector = new objectdetect.detector(180, 120, scaleFactor, classifier);
  filterImg = createImage(160, 120);

  blurFaceDetector = new BlurFaceDetect(detector);
  colorConversionFaceDetector = new ColorConversionFaceDetector(detector);
  dogFilter = new DogFilter(detector, dogImage);
  faceDetection = new FaceDetection(detector);
  greyscaleFaceDetect = new GreyscaleFaceDetect(detector);
  pixelateFaceDetection = new PixelateFaceDetection(detector);
}

// Function to capture a snapshot from video
function takeSnapshot() {
  snapshot = video.get();
}

// Function to handle key presses
function keyPressed() {
  if (key === " ") {
    takeSnapshot();
  }
}

// Main drawing function
function draw() {
  background(255, 255, 255);
  // Display webcam image
  image(video, 25, 20);
  text("Webcam Image", 105, 155);
  image(video, 25, 460);
  text("Webcam Image", 105, 595);
  textSize(24);
  text("Press space to take a snapshot", 800, 200);
  textSize(12);
  // Process snapshot if available
  if (snapshot) {
    processSnapshot();
  }
}

// Function to process snapshot
function processSnapshot() {
  greyscaleAndBrightness.applyFilter(snapshot);
  rgbChannels.applyFilter(snapshot);
  rgbThresholds.applyFilter(
    snapshot,
    redSlider.value(),
    greenSlider.value(),
    blueSlider.value()
  );
  colorSpace1Converter.convertToColorSpace1(snapshot);
  colorSpace2Converter.convertToColorSpace2(snapshot);
  let ColourSpace1ThresholdsliderValue = colourSpace1Slider.value();
  colorSpace1Threshold.applyThreshold(
    snapshot,
    ColourSpace1ThresholdsliderValue
  );
  let ColourSpace2ThresholdsliderValue = colourSpace2Slider.value();
  colorSpace2Threshold.applyThreshold(
    snapshot,
    ColourSpace2ThresholdsliderValue
  );
  faceDetection.detectAndProcess(snapshot);
  dogFilter.apply(snapshot);
  if (key === "g") {
    greyscaleFaceDetect.detectAndConvert(snapshot);
  } else if (key === "f") {
    Facedetection(snapshot);
  } else if (key === "b") {
    blurFaceDetector.detectAndBlurFaces(snapshot);
  } else if (key === "c") {
    colorConversionFaceDetector.detectAndConvertColorSpace(snapshot);
  } else if (key === "p") {
    pixelateFaceDetection.detectAndPixelate(snapshot);
  }
}
