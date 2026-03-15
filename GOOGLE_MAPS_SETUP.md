# Google Maps API Setup Guide

## Where to Replace Your API Key

You need to replace `YOUR_GOOGLE_MAPS_API_KEY` in **TWO** locations:

### **1. In `index.html` (Line ~470)**
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places,directions,distancematrix"></script>
```

**Replace with:**
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-XXXXXXXXXXXXXXX&libraries=places,directions,distancematrix"></script>
```

### **2. In `script.js` (Line ~2)**
```javascript
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
```

**Replace with:**
```javascript
const GOOGLE_MAPS_API_KEY = 'AIzaSyD-XXXXXXXXXXXXXXX';
```

---

## How to Get Your API Key

### **Step 1: Create Google Cloud Project**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Create Project**
3. Enter project name: `Tere App`
4. Click **Create**

### **Step 2: Enable Required APIs**
In the Cloud Console, search and enable:
- ✅ Maps Embed API
- ✅ Maps JavaScript API
- ✅ Directions API
- ✅ Distance Matrix API
- ✅ Places API (optional, for autocomplete)

### **Step 3: Create API Key**
1. Go to **Credentials** menu
2. Click **Create Credentials** → **API Key**
3. Copy the key (it will look like: `AIzaSyD-xxxxxxxxxxxxx`)
4. (Optional) Restrict the key to HTTP/HTTPS only

### **Step 4: Replace in Code**
Replace `YOUR_GOOGLE_MAPS_API_KEY` in both files with your actual key

---

## How to Use Google Maps in Your App

### **1. Show Directions Map**
```javascript
// In your HTML button:
<button onclick="showMapToLocation('Railway Station', 'Gol Building')">Show Route</button>

// Function automatically displays embedded map
showMapToLocation('pickup location', 'drop location');
```

### **2. Calculate Distance Automatically**
```javascript
// Automatically calculates distance and fare
calculateDistanceWithMaps('Railway Station', 'Gol Building');
```

### **3. Display Basic Map**
```html
<iframe id="mapFrame" width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

---

## Features Available After Setup

After adding your API key, you get:

| Feature | Enabled |
|---------|---------|
| Show map directions | ✅ Yes |
| Calculate distance | ✅ Yes |
| Estimate travel time | ✅ Yes |
| Show route on map | ✅ Yes |
| Multiple routing modes | ✅ Yes |
| Place autocomplete | ✅ Yes |

---

## Code Reference

### **Function: `showMapToLocation(pickup, dropoff)`**
```javascript
showMapToLocation('Railway Station', 'Gol Building');
// Shows embedded Google Map with directions between two locations
```

### **Function: `calculateDistanceWithMaps(pickup, dropoff)`**
```javascript
calculateDistanceWithMaps('Railway Station', 'Gol Building');
// Calculates distance, updates fare, and shows map
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Map not showing | Check if API key is correct |
| "Error: APIRejectedError" | Verify key is enabled in Cloud Console |
| Distance not calculating | Make sure "Distance Matrix API" is enabled |
| Map appears blank | Check browser console for errors |

---

## Cost Information

**Google Maps API Pricing (as of 2025):**
- First **$200/month** = FREE
- Maps Embed API: Free
- Maps JavaScript API: ~$7 per 1000 requests
- Directions API: ~$5 per 1000 requests
- Distance Matrix API: ~$5 per 1000 requests

For a small app, you'll likely stay within the free tier!

---

## Security Best Practices

1. **Restrict API Key:**
   - Go to Google Cloud Console → API key settings
   - Set "Application restrictions" → HTTP Referrers
   - Add only your domain(s)

2. **Monitor Usage:**
   - Track API calls in [Google Cloud Console](https://console.cloud.google.com/)
   - Set up billing alerts

3. **Environment Variables (Optional):**
   For production, use environment variables instead of hardcoding:
   ```javascript
   const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
   ```

---

## Completion Checklist

- [ ] Created Google Cloud Project
- [ ] Enabled required APIs
- [ ] Generated API Key
- [ ] Added key to `index.html`
- [ ] Added key to `script.js`
- [ ] Tested map display
- [ ] Tested distance calculation
- [ ] (Optional) Restricted API key to your domain

---

**Your Tere app is now ready with full Google Maps integration!** 🗺️
