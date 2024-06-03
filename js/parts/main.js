// Get the navigation element
const navbar = document.getElementById('navbar');

// Function to add class when scrolling down
function handleScroll() {
  if (window.scrollY > 0) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

function calculateTimeSinceMarch1st() {
    // Set March 1st as the start date
    const startDate = new Date('2022-03-01');
    
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const timeDiff = currentDate - startDate;
    
    // Convert milliseconds to days
    const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Calculate years
    const yearsElapsed = Math.floor(daysElapsed / 365);

    
    // Calculate total months by adding months after years
    // const totalMonths = timeElapsed.years * 12 + timeElapsed.months;

    // Calculate months
    const monthsElapsed = Math.floor(daysElapsed / 30); 

    // Calculate weeks
    const weeksElapsed = Math.floor((daysElapsed % 30) / 7);

    
    // Calculate remaining days
    const remainingDays = (daysElapsed % 30) % 7;
    
    return {
        years: yearsElapsed,
        months: monthsElapsed,
        weeks: weeksElapsed,
        days: remainingDays
    };
}

// Call the function and display the result in the HTML page
const timeElapsed = calculateTimeSinceMarch1st();

document.getElementById('months').textContent = timeElapsed.months;
document.getElementById('weeks').textContent = timeElapsed.weeks;
document.getElementById('days').textContent = timeElapsed.days;

const totalMonths = timeElapsed.years * 12 + timeElapsed.months;

// Additional display for mobile
document.getElementById('years-mobile').textContent = timeElapsed.years;
document.getElementById('months-mobile').textContent = totalMonths % 12;