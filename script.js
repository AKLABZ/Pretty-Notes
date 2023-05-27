document.addEventListener('DOMContentLoaded', () => {
    const redPointer = document.getElementById('redPointer');
    document.addEventListener('mousemove', handleMouseMove);
  
    function handleMouseMove(event) {
      const pointerSize = redPointer.offsetWidth; // Get the size of the red pointer element
      const pointerHalfSize = pointerSize / 2; // Calculate half the size of the red pointer
  
      // Calculate the position of the red pointer to center it on the mouse pointer
      const pointerX = event.pageX - pointerHalfSize;
      const pointerY = event.pageY - pointerHalfSize;
  
      redPointer.style.left = pointerX + 'px';
      redPointer.style.top = pointerY + 'px';
    }
  
    document.getElementById('userInput').addEventListener('input', updateOutput);
  
    function updateOutput() {
      const userInput = document.getElementById('userInput').value;
      const outputDiv = document.getElementById('output');
      outputDiv.textContent = userInput;
    }
  
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', clearOutput);
  
    function clearOutput() {
      const userInput = document.getElementById('userInput');
      const outputDiv = document.getElementById('output');
      userInput.value = '';
      outputDiv.innerHTML = '';
    }
  
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveScreenshot);
  
    function saveScreenshot() {
      const body = document.body;
      const excludedElementsList = ['userInput', 'clearButton', 'saveButton'];
  
      // Hide the excluded elements
      excludedElementsList.forEach((elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.style.display = 'none';
        }
      });
  
      // Capture the screenshot using html2canvas
      html2canvas(body).then((canvas) => {
        // Restore the visibility of the excluded elements
        excludedElementsList.forEach((elementId) => {
          const element = document.getElementById(elementId);
          if (element) {
            element.style.display = '';
          }
        });
  
        // Convert the canvas to a data URL with compression
        const dataURL = canvas.toDataURL('image/jpeg', 0.8); // Adjust the quality value (0.0 - 1.0) as desired
  
        // Create a temporary link element and trigger a download of the screenshot
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'screenshot.jpg'; // Use .jpg extension for JPEG format
        link.click();
      });
    }
  
    const changeGradientButton = document.getElementById('changeGradientButton');
    changeGradientButton.addEventListener('click', changeGradients);
    
        function changeGradients() {
          const gradients = [
            'radial-gradient(circle, red, yellow, blue, white)',
            'radial-gradient(circle, green, purple, orange, white)',
            'radial-gradient(circle, pink, cyan, magenta, white)'
          ];
      
          const elementsWithGradient = document.querySelectorAll('.gradient-element');
      
          Array.from(elementsWithGradient).forEach((element) => {
            const randomIndex = Math.floor(Math.random() * gradients.length);
            element.style.background = gradients[randomIndex];
          });
        }
      });
      