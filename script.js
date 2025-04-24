// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const form = document.getElementById('eventForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !phone || !service || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        alert(`Thank you, ${name}! Your inquiry about our ${service} service has been received. We'll contact you soon.`);
        
        // Reset form
        form.reset();
    });
}

// Image gallery modal functionality
const galleryItems = document.querySelectorAll('.gallery-item');

// Create modal elements
const modal = document.createElement('div');
modal.className = 'gallery-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img id="modal-img">
    </div>
`;
document.body.appendChild(modal);

const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

// Add click event to gallery items
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'flex';
        // Get background image URL and set it as the modal image src
        const bgImg = window.getComputedStyle(this).backgroundImage;
        const imgUrl = bgImg.replace('url("', '').replace('")', '');
        modalImg.src = imgUrl;
    });
});

// Close modal when clicking the close button
if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside the image
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add CSS for the modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .gallery-modal {
        display: none;
        position: fixed;
        z-index: 1100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    #modal-img {
        max-width: 100%;
        max-height: 90vh;
        display: block;
        border: 3px solid white;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
    }
`;
document.head.appendChild(modalStyle);

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-item, .about-img, .about-content, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add initial styles for animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .service-item, .about-img, .about-content, .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(animationStyle);

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
window.addEventListener('load', animateOnScroll);