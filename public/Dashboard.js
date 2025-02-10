const API_BASE_URL = 'http://localhost:3000'; 

// DOM Elements
const userInitial = document.getElementById('userInitial');
const username = document.getElementById('name');
const college = document.getElementById('college_name');
const sportsCount = document.getElementById('sportsCount');
const sportsGrid = document.getElementById('sportsGrid');
const errorToast = document.getElementById('errorToast');

// Data structure for sports
const sports = [
    { id: 1, name: 'Athletics(M)', icon: '🏃‍♂️' },
    { id: 2, name: 'Athletics(W)', icon: '🏃‍♀️' },
    { id: 3, name: 'Badminton(M)', icon: '🏸', link: 'sports/badminton.html' },
    { id: 4, name: 'Badminton(W)', icon: '🏸' },
    { id: 5, name: 'Basketball(M)', icon: '🏀' },
    { id: 6, name: 'Athletics(W)', icon: '🏃‍♀️' },
    { id: 7, name: 'Badminton(M)', icon: '🏸' },
    { id: 8, name: 'Badminton(W)', icon: '🏸' },
    { id: 9, name: 'Basketball(M)', icon: '🏀' },
];

// Fetch user data from API
async function fetchUserData() {
    try {
        const response = await fetch(`${API_BASE_URL}/user/getUser`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Update UI with user data
        updateUserInfo(data);
    } catch (error) {
        showError('Error loading user data');
        console.error('Error fetching user data:', error);
    }
}

// Fetch sports data
async function fetchSports() {
    try {
        const response = await fetch(`${API_BASE_URL}/sports`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Update UI with sports data
        updateSportsGrid(data);
    } catch (error) {
        showError('Error loading sports data');
        console.error('Error fetching sports data:', error.message);
    }
}

// Update user information in the UI
function updateUserInfo(data) {
    userInitial.textContent = data.username.charAt(0).toUpperCase();
    username.textContent = data.username;
    college.textContent = data.college;
    sportsCount.textContent = data.registeredSports;

    document.getElementById('loadingUser').style.display = 'none';
    document.getElementById('loadingInstitution').style.display = 'none';
}

// Update sports grid in the UI
function updateSportsGrid(sports) {
    sportsGrid.innerHTML = '';
    
    sports.forEach(sport => {
        const sportCard = document.createElement('div');
        sportCard.className = 'sport-card';
        sportCard.innerHTML = `
            <div class="sport-icon">${sport.icon}</div>
            <span>${sport.name}</span>
        `;
        
        sportCard.addEventListener('click', () => selectSport(sport));
        sportsGrid.appendChild(sportCard);
    });
}

// Handle sport selection
function selectSport(sport) {
    if (sport.link) {
        window.location.href = sport.link;
    } else {
        console.log(`Selected sport: ${sport.name}`);
    }
}

// Show error toast
function showError(message) {
    errorToast.querySelector('.toast-message').textContent = message;
    errorToast.classList.add('show');
    
    setTimeout(() => {
        errorToast.classList.remove('show');
    }, 3000);
}

// Update step progress bar
function updateStepProgress(currentStep) {
    const steps = document.querySelectorAll('.progress-bar .step');
    steps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('completed');
        } else if (index === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Example function to simulate step progression
function goToNextStep() {
    const currentStep = document.querySelector('.progress-bar .step.active');
    const nextStep = currentStep.nextElementSibling;
    if (nextStep) {
        currentStep.classList.remove('active');
        currentStep.classList.add('completed');
        nextStep.classList.add('active');
    }
}

// Initialize the dashboard
async function initDashboard() {
    await Promise.all([fetchUserData(), fetchSports()]);
    updateStepProgress(0); // Initialize the first step as active
}

// Example event listener to simulate step progression
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    document.querySelector('.next-step-button').addEventListener('click', goToNextStep);
});
