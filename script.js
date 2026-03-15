// ========================================
// Google Maps API Configuration
// ========================================
// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key from Google Cloud Console
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// ========================================
// Hero Slider Functionality
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        });
    }

    // Start slideshow
    startSlideshow();

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideshow);
        slider.addEventListener('mouseleave', startSlideshow);
    }
});

// ========================================
// Navigation Toggle
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });
}

// Close navbar when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========================================
// Header Scroll Effect
// ========================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// Sticky CTA Visibility
// ========================================
window.addEventListener('scroll', () => {
    const stickyCTA = document.getElementById('stickyCTA');
    if (window.scrollY > 500) {
        stickyCTA.style.display = 'block';
    } else {
        stickyCTA.style.display = 'none';
    }
});

// ========================================
// Dark Mode Toggle
// ========================================
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ========================================
// FAQ Accordion
// ========================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// ========================================
// Language Switcher
// ========================================
const langSwitch = document.getElementById('langSwitch');
if (langSwitch) {
    langSwitch.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`) || el.textContent;
        if (el.placeholder) {
            el.placeholder = el.getAttribute(`data-${lang}`);
        }
    });
}

// ========================================
// Fare Calculator
// ========================================
function calculateFare() {
    const distance = parseFloat(document.getElementById("distance").value);
    const resultDiv = document.getElementById("fareResult");
    const whatsappBtn = document.getElementById("whatsappButton");

    if (distance && distance > 0) {
        const baseFare = 100;
        const perKmRate = 50;
        const fare = baseFare + (distance * perKmRate);
        resultDiv.innerHTML = `<strong>Estimated Fare: Rs. ${fare}</strong><p>Base fare: Rs. 100 + Rs. ${perKmRate}/km</p>`;
        whatsappBtn.style.display = "inline-block";

        whatsappBtn.onclick = () => {
            const message = encodeURIComponent(`Hi, I want to book a ride for ${distance}km. Estimated fare: Rs. ${fare}`);
            window.open(`https://wa.me/923196637570?text=${message}`, '_blank');
        };
    } else {
        resultDiv.innerHTML = "Please enter a valid distance.";
        whatsappBtn.style.display = "none";
    }
}

// ========================================
// Show Map (Using Google Maps Embed)
// ========================================
function showMapToLocation(pickup, dropoff) {
    // Create iFrame element for embedded map
    const mapFrame = document.getElementById('mapFrame');
    if (!mapFrame) {
        console.log('Map container not found');
        return;
    }

    // Construct directions embed URL
    const pickup_encoded = encodeURIComponent(pickup);
    const dropoff_encoded = encodeURIComponent(dropoff);
    
    const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${pickup_encoded}&destination=${dropoff_encoded}&mode=driving`;
    
    mapFrame.src = embedUrl;
    mapFrame.style.display = 'block';
}

// ========================================
// Calculate Distance Using Google Maps API
// ========================================
function calculateDistanceWithMaps(pickup, dropoff) {
    const service = new google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix({
        origins: [pickup],
        destinations: [dropoff],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
        if (status === 'OK') {
            const result = response.rows[0].elements[0];
            if (result.status === 'OK') {
                const distance = result.distance.value / 1000; // Convert to km
                document.getElementById('distance').value = distance.toFixed(2);
                calculateFare();
                showMapToLocation(pickup, dropoff);
            } else {
                alert('Could not calculate distance. Please try again.');
            }
        } else {
            alert('Error: ' + status);
        }
    });
}

// ========================================
// Impact Calculator
// ========================================
function calculateImpact() {
    const ridesPerMonth = parseFloat(document.getElementById('ridesPerMonth').value);
    const kmPerRide = parseFloat(document.getElementById('kmPerRide').value);
    const resultDiv = document.getElementById('impactResult');

    if (ridesPerMonth && kmPerRide && ridesPerMonth > 0 && kmPerRide > 0) {
        const co2PerKm = 0.21; // kg CO2 per km (car average)
        const monthlyCO2 = ridesPerMonth * kmPerRide * co2PerKm;
        const yearlyCO2 = monthlyCO2 * 12;
        const treesNeeded = Math.round(yearlyCO2 / 21); // 1 tree absorbs ~21kg CO2/year

        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #f0fff0; border-radius: 10px;">
                <p><strong style="font-size: 24px; color: #01b075;">${yearlyCO2.toFixed(2)} kg CO2</strong></p>
                <p>CO₂ reduced annually</p>
                <p style="margin-top: 15px;"><strong>${treesNeeded} trees</strong> worth of impact!</p>
                <p style="color: #666; font-size: 14px;">You're saving Rs. ${(yearlyCO2 * 10).toFixed(0)} annually on fuel!</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = '<p style="color: red;">Please enter valid numbers</p>';
    }
}

// ========================================
// Newsletter Signup
// ========================================
function handleNewsletterSignup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const msgDiv = document.getElementById('newsletterMsg');
    
    if (email) {
        msgDiv.innerHTML = '<p style="color: #01b075; font-weight: 600;">✓ Thanks for subscribing!</p>';
        event.target.reset();
        setTimeout(() => {
            msgDiv.innerHTML = '';
        }, 3000);
    }
}

// ========================================
// Driver Application
// ========================================
function handleDriverApplication(event) {
    event.preventDefault();
    const phone = event.target.querySelector('input[type="tel"]').value;
    
    if (phone) {
        alert(`✓ Thanks for applying!\n\nWe'll contact you at ${phone} soon with more details.\n\nExpect a call within 24 hours.`);
        event.target.reset();
    }
}

// ========================================
// Live Rider Count (Simulation)
// ========================================
function updateLiveRiderCount() {
    const riderCountEl = document.getElementById('liveRiderCount');
    if (riderCountEl) {
        setInterval(() => {
            const randomRiders = Math.floor(Math.random() * (2500 - 1000) + 1000);
            riderCountEl.textContent = randomRiders.toLocaleString();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', updateLiveRiderCount);

// ========================================
// Scroll to Top
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const btn = document.createElement('a');
            btn.href = '#home';
            btn.className = 'scroll-to-top';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.style.cssText = `
                position: fixed;
                bottom: 180px;
                right: 30px;
                width: 45px;
                height: 45px;
                background: #75BF7A;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 997;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            btn.addEventListener('mouseover', () => {
                btn.style.background = '#8FD49B';
                btn.style.transform = 'scale(1.1)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.background = '#75BF7A';
                btn.style.transform = 'scale(1)';
            });
            document.body.appendChild(btn);
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
});