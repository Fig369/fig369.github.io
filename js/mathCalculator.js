// Define math operations
const operations = {
    range: (x, y) => {
        let arr = [];
        for (let i = x; i <= y; i++) arr.push(i);
        return arr;
    },
    sum: (x, y) => x + y,
    fibonacci: (n) => {
        if (n <= 1) return n;
        return operations.fibonacci(n - 1) + operations.fibonacci(n - 2);
    },
    reverseArray: (arr) => arr.slice().reverse(),
    reverseArrayInPlace: (arr) => {
        for (let i = 0; i < arr.length / 2; i++) {
            [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
        }
        return arr;
    },
    deepEqual: (x, y) => JSON.stringify(x) === JSON.stringify(y),
    arrayToList: (arr) => arr.reverse().reduce((list, val) => ({ value: val, rest: list }), null),
};

// DOM elements
const filterElement = document.getElementById('filter');
const inputFieldsElement = document.getElementById('inputFields');
const resultsElement = document.getElementById('results');
const addInputButton = document.getElementById('addInput');
const submitButton = document.getElementById('submit');

// Show/hide input fields based on selected operation
const updateInputFields = () => {
    const selectedOperation = filterElement.value;

    // Remove all input fields
    while (inputFieldsElement.firstChild) {
        inputFieldsElement.removeChild(inputFieldsElement.firstChild);
    }

    // Create X input field
    const inputX = document.createElement('input');
    inputX.type = 'text';
    inputX.className = 'form-control mb-2';
    inputX.id = 'x';
    inputX.placeholder = 'X';
    inputFieldsElement.appendChild(inputX);

    if (selectedOperation === 'fibonacci') {
        addInputButton.style.display = 'none';
    } else if (['reverseArray', 'reverseArrayInPlace', 'arrayToList'].includes(selectedOperation)) {
        addInputButton.style.display = 'block';
    } else {
        addInputButton.style.display = 'none';

        // Create Y input field
        const inputY = document.createElement('input');
        inputY.type = 'text';
        inputY.className = 'form-control mb-2';
        inputY.id = 'y';
        inputY.placeholder = 'Y';
        inputFieldsElement.appendChild(inputY);
    }
};

// Gather all input values for array functions
const gatherArrayInputs = () => {
    const inputs = document.querySelectorAll('#inputFields input[type="text"]');
    return Array.from(inputs).map(input => input.value);
};

// Add a new input field for array functions
const addInputField = () => {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'form-control mb-2';
    inputFieldsElement.appendChild(newInput);
};

// Perform the selected operation
const performOperation = () => {
    const selectedOperation = filterElement.value;
    let result;
    
    if (selectedOperation === 'fibonacci') {
        const x = parseInt(document.getElementById('x').value);
        result = `Fibonacci: ${operations.fibonacci(x)}`;
    } else if (['reverseArray', 'reverseArrayInPlace', 'arrayToList'].includes(selectedOperation)) {
        const arr = gatherArrayInputs();
        result = `${selectedOperation}:\n${JSON.stringify(operations[selectedOperation](arr), null, 2)}`;
    } else if (selectedOperation === 'deepEqual') {
        const x = JSON.parse(document.getElementById('x').value);
        const y = JSON.parse(document.getElementById('y').value);
        result = `Deep Equal: ${operations.deepEqual(x, y)}`;
    } else {
        const x = parseInt(document.getElementById('x').value);
        const y = parseInt(document.getElementById('y').value);
        result = `${selectedOperation}: ${JSON.stringify(operations[selectedOperation](x, y), null, 2)}`;
    }

    // Display result
    resultsElement.textContent = result;
};

// Event listeners
filterElement.addEventListener('change', updateInputFields);
submitButton.addEventListener('click', performOperation);
addInputButton.addEventListener('click', addInputField);

// Initial setup
updateInputFields();
