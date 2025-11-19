# Network Failure Simulator - Product Catalog

## What I Built

A single-page web application that simulates real-world network failures in a product catalog system. This app demonstrates **Option D — Network Failure (Timeout / 503)** from the assignment requirements.

The application fetches product data from a simulated API endpoint (`/api/products`) and allows users to deterministically inject two types of network failures:
1. **Request Timeout** - Simulates a 3-second delay that exceeds the timeout threshold
2. **503 Service Unavailable** - Simulates a server being down or overloaded

## Technologies Used

- Pure HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript (ES6+)
- No external libraries or frameworks

## How to Run

1. Download all files (`index.html`, `styles.css`, `script.js`) to the same directory
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, or Edge)
3. No build process or server required - runs completely client-side

## How to Trigger the Failure

### Happy Path (Normal Operation):
1. Keep the "Failure Toggle" checkbox **unchecked**
2. Click the "Fetch Products" button
3. Products load successfully after ~500ms
4. Success log appears in the log panel and browser console

### Inject Network Failure:
1. **Check** the "Failure Toggle" checkbox
2. Select a failure type:
   - **Timeout**: Delays response for 3 seconds then fails
   - **503**: Returns service unavailable error after 800ms
3. Click "Fetch Products"
4. Error banner appears with the failure message
5. Structured error log is printed to both the log panel and browser console

### Viewing Logs:
- **On-page**: Scroll to "Last Request Log" panel to see pretty-printed JSON
- **Console**: Press F12 → Console tab to see all logs prefixed with "SIMLOG:"

## Sample Log Examples

### Success Log (Happy Path):
```json
{
  "timestamp": "2025-11-19T14:32:15.423Z",
  "url": "/api/products",
  "method": "GET",
  "latencyMs": 503,
  "statusOrReason": 200,
  "errorCode": null
}
```

### Timeout Failure Log:
```json
{
  "timestamp": "2025-11-19T14:33:22.817Z",
  "url": "/api/products",
  "method": "GET",
  "latencyMs": 3002,
  "statusOrReason": "Request timeout after 3000ms",
  "errorCode": "NET_TIMEOUT"
}
```

### 503 Service Unavailable Log:
```json
{
  "timestamp": "2025-11-19T14:34:10.192Z",
  "url": "/api/products",
  "method": "GET",
  "latencyMs": 801,
  "statusOrReason": "503 Service Unavailable",
  "errorCode": "NET_503"
}
```

## Option Implemented

**Option D — Network Failure (Timeout / 503)**

This implementation simulates network-level failures commonly encountered in distributed systems:
- **Timeouts** occur when servers are overloaded or network latency is too high
- **503 errors** happen when servers are temporarily unavailable (maintenance, crashes, or overload)

## Key Features

✅ Working happy path with 6 mock products  
✅ Deterministic failure injection via UI toggle  
✅ Visual error banner with user-friendly messages  
✅ Structured JSON logging with all required fields  
✅ Real-time latency tracking  
✅ Responsive design with modern dark theme  
✅ No external dependencies (pure HTML/CSS/JS)

## Log Fields (as per assignment requirements)

All logs include these exact fields:
- `timestamp` - ISO 8601 formatted timestamp
- `url` - Request URL
- `method` - HTTP method (GET)
- `latencyMs` - Request duration in milliseconds
- `statusOrReason` - HTTP status code or failure reason
- `errorCode` - Error code (null for success, NET_TIMEOUT or NET_503 for failures)

## Author Notes

This simulator helps developers understand how to handle network failures gracefully in real-world applications. The timeout threshold (3 seconds) and 503 error scenarios are common failure modes in microservices architectures.
```

--- begin file: narration.txt ---
```
Hello everyone. Today I'm presenting a Network Failure Simulator built as a product catalog web app. This demonstrates Option D from our assignment: simulating timeout and 503 Service Unavailable errors.

In normal operation with the failure toggle off, clicking Fetch Products loads six mock products successfully in about 500 milliseconds. The app logs structured JSON data to the console showing the request URL, method, latency, and status code.

When I enable the failure toggle and select timeout, the app simulates a 3-second network delay. This exceeds our timeout threshold and triggers a failure. You'll see a red error banner stating "request timed out" and a detailed log with error code NET_TIMEOUT and the 3000+ millisecond latency.

Alternatively, selecting 503 Service Unavailable simulates a server being down. After 800 milliseconds, it fails with error code NET_503, mimicking what happens when backend services crash or undergo maintenance.

This simulation helps developers understand how to handle network failures gracefully with proper error messages, structured logging, and user-friendly interfaces. All code is pure HTML, CSS, and JavaScript with no external dependencies. Thank you.