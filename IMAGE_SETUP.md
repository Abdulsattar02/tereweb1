# Image Setup Guide for Tere App

## Current Image References
All image paths in the project currently use placeholder references. Replace them with your actual project images.

### Images to Add

#### 1. **Logo** 
- **Path:** `./assets/images/logo.png`
- **Dimensions:** 150px × auto (will scale)
- **Usage:** Footer, navigation
- **Recommended:** Your Tere app logo (PNG with transparency)

#### 2. **How It Works - Step Icons** (Already using Font Awesome - No change needed)
- Download icon
- User circle icon  
- Search/location icon
- Handshake icon

#### 3. **Safety & Security Images**
- **Path:** `./assets/images/` 
- **Used in:** Safety section cards
- **Recommended images:**
  - verified-driver.png (600×400px)
  - sos-button.png (600×400px)
  - gps-tracking.png (600×400px)

#### 4. **Feature Icons** (Currently using Font Awesome - No change needed)
- Calculator icon
- Map icon
- Star/rating icon
- Wallet icon
- Bell/notification icon
- Headset/support icon

#### 5. **Newsletter Section Background** (Optional)
- **Path:** Add to CSS as background-image
- **Recommended:** Subtle gradient or pattern

#### 6. **Hero Slider Images**
- **Path:** `./assets/images/slide1.jpg`, `slide2.jpg`, `slide3.jpg`
- **Dimensions:** 1920×600px (for desktop), mobile responsive
- **Recommended:**
  - slide1.jpg: Happy riders in a car
  - slide2.jpg: Green/eco-friendly concept
  - slide3.jpg: Safe & reliable service

## Steps to Add Images

### Step 1: Prepare Images
1. Optimize images (compress without losing quality)
2. Use proper formats: PNG for logos, JPG for photos
3. Ensure dimensions match recommendations

### Step 2: Create Image Folder Structure
```
assets/
├── images/
│   ├── logo.png
│   ├── slide1.jpg
│   ├── slide2.jpg
│   ├── slide3.jpg
│   ├── verified-driver.png
│   ├── sos-button.png
│   └── gps-tracking.png
```

### Step 3: Update HTML References
Search and replace placeholder paths in `index.html`:

```html
<!-- Current -->
<img src="./assets/images/logo.png" alt="Tere Logo">

<!-- Add your images with proper src paths -->
```

### Step 4: Add Hero Slider Images to CSS (Optional)
Edit `styles.css` if you want background images for slides:

```css
.slide {
    position: relative;
    background-size: cover;
    background-position: center;
}

.slide:nth-child(1) {
    background-image: url('./assets/images/slide1.jpg');
}

.slide:nth-child(2) {
    background-image: url('./assets/images/slide2.jpg');
}

.slide:nth-child(3) {
    background-image: url('./assets/images/slide3.jpg');
}
```

## Image Optimization Tips

1. **Use WebP Format** (Modern browsers)
   - Smaller file size
   - Better quality
   - Fallback to JPG via `<picture>` tag

2. **Compression Tools**
   - TinyPNG (tinypng.com)
   - ImageOptim (Mac)
   - FileOptimizer (Windows)

3. **Standard Sizes**
   - Logo: 150×50px (or auto height)
   - Hero slides: 1920×600px (desktop), 1000×400px (tablet), 600×400px (mobile)
   - Feature images: 400×300px
   - Icons: 64×64px

## Responsive Images (Advanced)

Use `<picture>` tag for responsive images:

```html
<picture>
    <source media="(min-width: 1024px)" srcset="./assets/images/slide1-large.jpg">
    <source media="(min-width: 768px)" srcset="./assets/images/slide1-medium.jpg">
    <img src="./assets/images/slide1-small.jpg" alt="Slide 1">
</picture>
```

## Current SVG Icons (No Images Needed)
The following elements use Font Awesome icons and don't need images:
- Navigation icons
- Feature card icons  
- Social media icons
- Step indicators
- FAQ toggle arrows

## SEO Image Tips

Include descriptive alt text:
```html
<img src="./assets/images/verified-driver.png" alt="Verified driver with ID check badge">
```

## Testing Your Images

1. Check all image paths in browser (F12 > Network tab)
2. Test on mobile devices
3. Verify images load quickly
4. Check accessibility (alt text present)

---

**When ready with your images, simply replace the placeholder paths with your actual image files.**
