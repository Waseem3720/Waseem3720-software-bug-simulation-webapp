// DOM Elements
const failureToggle = document.getElementById('failureToggle');
const failureTypeSection = document.getElementById('failureTypeSection');
const fetchBtn = document.getElementById('fetchBtn');
const errorBanner = document.getElementById('errorBanner');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const productsGrid = document.getElementById('productsGrid');
const logDisplay = document.getElementById('logDisplay');

// Mock product data
const MOCK_PRODUCTS = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, stock: 45, emoji: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, stock: 23, emoji: '⌚' },
    { id: 3, name: 'USB-C Cable', price: 12.99, stock: 150, emoji: '🔌' },
    { id: 4, name: 'Laptop Stand', price: 49.99, stock: 67, emoji: '💻' },
    { id: 5, name: 'Mechanical Keyboard', price: 129.99, stock: 34, emoji: '⌨️' },
    { id: 6, name: 'Webcam HD', price: 89.99, stock: 18, emoji: '📷' }
];

// Toggle visibility of failure type selector
failureToggle.addEventListener('change', function() {
    if (this.checked) {
        failureTypeSection.classList.add('visible');
    } else {
        failureTypeSection.classList.remove('visible');
    }
});

// Main fetch button handler
fetchBtn.addEventListener('click', handleFetchProducts);

/**
 * Main function to fetch products
 * Simulates API call with optional failure injection
 */
async function handleFetchProducts() {
    // Clear previous state
    hideError();
    productsGrid.innerHTML = '';
    
    // Show loading indicator
    showLoading();
    fetchBtn.disabled = true;
    
    const startTime = Date.now();
    const url = '/api/products';
    const method = 'GET';
    
    try {
        // Check if failure should be injected
        const shouldInjectFailure = failureToggle.checked;
        const failureType = document.querySelector('input[name="failureType"]:checked').value;
        
        if (shouldInjectFailure) {
            // FAILURE INJECTION POINT
            await injectNetworkFailure(failureType, startTime, url, method);
        } else {
            // HAPPY PATH - Normal successful operation
            await simulateSuccessfulFetch(startTime, url, method);
        }
        
    } catch (error) {
        // Error is already logged in the injection function
        // Just display it to the user
        showError(error.message);
    } finally {
        hideLoading();
        fetchBtn.disabled = false;
    }
}

/**
 * Simulates successful product fetch (Happy Path)
 */
async function simulateSuccessfulFetch(startTime, url, method) {
    // Simulate normal network delay (500ms)
    await delay(500);
    
    const latencyMs = Date.now() - startTime;
    
    // Create success log with required fields
    const logData = {
        timestamp: new Date().toISOString(),
        url: url,
        method: method,
        latencyMs: latencyMs,
        statusOrReason: 200,
        errorCode: null
    };
    
    // Log to console with SIMLOG prefix
    console.log('SIMLOG:', JSON.stringify(logData));
    
    // Display log on page
    displayLog(logData);
    
    // Render products
    renderProducts(MOCK_PRODUCTS);
}

/**
 * FAILURE INJECTION FUNCTION
 * Injects network failures based on selected type
 */
async function injectNetworkFailure(failureType, startTime, url, method) {
    if (failureType === 'timeout') {
        // INJECT TIMEOUT FAILURE
        // Simulate a long delay (3 seconds) that exceeds timeout threshold
        await delay(3000);
        
        const latencyMs = Date.now() - startTime;
        
        // Create failure log with required fields
        const logData = {
            timestamp: new Date().toISOString(),
            url: url,
            method: method,
            latencyMs: latencyMs,
            statusOrReason: 'Request timeout after 3000ms',
            errorCode: 'NET_TIMEOUT'
        };
        
        // Log to console with SIMLOG prefix
        console.log('SIMLOG:', JSON.stringify(logData));
        
        // Display log on page
        displayLog(logData);
        
        // Throw error to trigger error banner
        throw new Error('Network failure: request timed out');
        
    } else if (failureType === '503') {
        // INJECT 503 SERVICE UNAVAILABLE FAILURE
        // Simulate slight delay before service returns 503
        await delay(800);
        
        const latencyMs = Date.now() - startTime;
        
        // Create failure log with required fields
        const logData = {
            timestamp: new Date().toISOString(),
            url: url,
            method: method,
            latencyMs: latencyMs,
            statusOrReason: '503 Service Unavailable',
            errorCode: 'NET_503'
        };
        
        // Log to console with SIMLOG prefix
        console.log('SIMLOG:', JSON.stringify(logData));
        
        // Display log on page
        displayLog(logData);
        
        // Throw error to trigger error banner
        throw new Error('Network failure: 503 Service Unavailable');
    }
}

/**
 * Renders products to the grid
 */
function renderProducts(products) {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-stock">Stock: ${product.stock} units</div>
        `;
        productsGrid.appendChild(card);
    });
}

/**
 * Displays log data on the page (pretty-printed JSON)
 */
function displayLog(logData) {
    logDisplay.textContent = JSON.stringify(logData, null, 2);
}

/**
 * Shows error banner with message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorBanner.classList.remove('hidden');
}

/**
 * Hides error banner
 */
function hideError() {
    errorBanner.classList.add('hidden');
}

/**
 * Shows loading indicator
 */
function showLoading() {
    loadingIndicator.classList.remove('hidden');
}

/**
 * Hides loading indicator
 */
function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

/**
 * Utility function to create delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize: Load products on page load (happy path demo)
window.addEventListener('DOMContentLoaded', () => {
    console.log('Network Failure Simulator initialized');
    console.log('Keep toggle OFF for normal operation, turn ON to inject failures');
});