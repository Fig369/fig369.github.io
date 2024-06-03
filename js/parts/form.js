// Function to populate current date and time
function populateDateTime() {
    // Get current date and time
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var currentDay = ('0' + currentDate.getDate()).slice(-2);
    var currentHour = ('0' + currentDate.getHours()).slice(-2);
    var currentMinute = ('0' + currentDate.getMinutes()).slice(-2);

    // Format current date and time in ISO format
    var isoDateTime = currentYear + '-' + currentMonth + '-' + currentDay + 'T' + currentHour + ':' + currentMinute;

    // Populate Datetime input
    var datetimeInput = document.getElementById('datetime');
    datetimeInput.value = isoDateTime;
}

// Call the function when the page loads
window.onload = function () {
    populateDateTime();
};

// Function to toggle between dark and light mode
function toggleMode() {
    var body = document.body;
    var darkModeRadio = document.getElementById("darkMode");
    var lightModeRadio = document.getElementById("lightMode");

    if (darkModeRadio.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    if (lightModeRadio.checked) {
        body.classList.remove("dark-mode");
    } else {
        body.classList.add("dark-mode");
    }
}

// Add event listeners to radio buttons
document.getElementById("darkMode").addEventListener("change", toggleMode);
document.getElementById("lightMode").addEventListener("change", toggleMode);

// Function to change text color, input borders, form border, and form background color based on selected color
function changeStyles() {
    var colorInput = document.getElementById("color");
    var textColorElements = document.querySelectorAll("label");
    var inputElements = document.querySelectorAll("input, textarea");
    var formElement = document.getElementById("myForm");

    // Get the selected color
    var selectedColor = colorInput.value;

    // Update text color for all elements with the class "text-color"
    textColorElements.forEach(function (element) {
        element.style.color = selectedColor;
    });

    // Update border color for all input elements
    inputElements.forEach(function (element) {
        element.style.borderColor = selectedColor;
    });

    // Update form border color
    formElement.style.borderColor = selectedColor;

    // Update form background color for better accessibility
    var bgColor = getContrastColor(selectedColor);
    formElement.style.backgroundColor = bgColor;

    // Get the opacity value from the range input and convert it to a value between 0 and 1
    var opacityValue = parseFloat(document.getElementById("range").value) / 100;

    // Set the opacity of the form background
    formElement.style.opacity = opacityValue;
}

// Function to get contrast color for background
function getContrastColor(hexColor) {
    // Convert hex color to RGB
    var r = parseInt(hexColor.substring(1, 3), 16);
    var g = parseInt(hexColor.substring(3, 5), 16);
    var b = parseInt(hexColor.substring(5, 7), 16);

    // Calculate the luminance
    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose black or white based on the luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Add event listener to color input
document.getElementById("color").addEventListener("change", changeStyles);

// Add event listener to range input
document.getElementById("range").addEventListener("input", changeStyles);

// Add event listener to form reset button
document.getElementById("myForm").addEventListener("reset", function () {
    // Reset the form to its initial state
    document.getElementById("myForm").reset();
});

// Add event listener to form submission

