document.addEventListener('DOMContentLoaded', () => {
    const redPointer = document.getElementById('redPointer');
    document.addEventListener('mousemove', handleMouseMove);
  
    function handleMouseMove(event) {
      const pointerSize = redPointer.offsetWidth;
      const pointerHalfSize = pointerSize / 2;
  
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
      const excludedElementsList = ['userInput', 'clearButton', 'saveButton', 'changeGradientButton'];
  
      excludedElementsList.forEach((elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.style.display = 'none';
        }
      });
  
      html2canvas(body).then((canvas) => {
        excludedElementsList.forEach((elementId) => {
          const element = document.getElementById(elementId);
          if (element) {
            element.style.display = '';
          }
        });
  
        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
  
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'screenshot.jpg';
        link.click();
      });
    }
  
    const changeGradientButton = document.getElementById('changeGradientButton');
    changeGradientButton.addEventListener('click', changeGradients);
  
    function changeGradients() {
      const colors = [
        'red',
        'yellow',
        'blue',
        'green',
        'purple',
        'orange',
        'pink',
        'cyan',
        'magenta'
      ];
  
      const backgroundGradients = [
        'radial-gradient(circle, ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ', white)',
        'radial-gradient(circle, ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ', white)'
      ];
  
      const elementGradients = [
        'radial-gradient(circle, ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ')',
        'radial-gradient(circle, ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ')',
        'radial-gradient(circle, ' + getRandomColor(colors) + ', ' + getRandomColor(colors) + ')'
      ];
  
      const elementsWithGradient = document.querySelectorAll('.gradient-element');
  
      Array.from(elementsWithGradient).forEach((element, index) => {
        if (element === document.body) {
          element.style.background = backgroundGradients[index % backgroundGradients.length];
        } else {
          element.style.background = elementGradients[index % elementGradients.length];
        }
      });
    }
  
    function getRandomColor(colors) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
  });
  
