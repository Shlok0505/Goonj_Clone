// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Modal functionality
function openDonationModal() {
    document.getElementById('donationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openVolunteerModal() {
    document.getElementById('volunteerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const donationModal = document.getElementById('donationModal');
    const volunteerModal = document.getElementById('volunteerModal');
    
    if (event.target === donationModal) {
        closeModal('donationModal');
    }
    if (event.target === volunteerModal) {
        closeModal('volunteerModal');
    }
});

// Close modal when clicking X button
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Form validation and submission
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function showMessage(formId, message, isSuccess = true) {
    const form = document.getElementById(formId);
    const existingMessage = form.querySelector('.success-message, .error-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isSuccess ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    form.insertBefore(messageDiv, form.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Donation form submission
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        phone: document.getElementById('donorPhone').value,
        materialType: document.getElementById('materialType').value,
        quantity: document.getElementById('quantity').value,
        address: document.getElementById('pickupAddress').value,
        date: document.getElementById('preferredDate').value
    };
    
    // Validation
    if (!formData.name.trim()) {
        showMessage('donationForm', 'Please enter your full name.', false);
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showMessage('donationForm', 'Please enter a valid email address.', false);
        return;
    }
    
    if (!validatePhone(formData.phone)) {
        showMessage('donationForm', 'Please enter a valid phone number.', false);
        return;
    }
    
    if (!formData.materialType) {
        showMessage('donationForm', 'Please select the type of materials.', false);
        return;
    }
    
    if (!formData.quantity.trim()) {
        showMessage('donationForm', 'Please specify the estimated quantity.', false);
        return;
    }
    
    if (!formData.address.trim()) {
        showMessage('donationForm', 'Please provide your pickup address.', false);
        return;
    }
    
    if (!formData.date) {
        showMessage('donationForm', 'Please select your preferred pickup date.', false);
        return;
    }
    
    // Check if date is in the future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showMessage('donationForm', 'Please select a future date for pickup.', false);
        return;
    }
    
    // Simulate form submission
    showMessage('donationForm', 'Thank you! Your donation request has been submitted. We will contact you within 24 hours to confirm the pickup details.', true);
    
    // Reset form
    this.reset();
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeModal('donationModal');
    }, 3000);
    
    // Store donation data (in real implementation, this would be sent to a server)
    console.log('Donation request submitted:', formData);
});

// Volunteer form submission
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('volunteerName').value,
        email: document.getElementById('volunteerEmail').value,
        phone: document.getElementById('volunteerPhone').value,
        age: document.getElementById('volunteerAge').value,
        location: document.getElementById('volunteerLocation').value,
        skills: document.getElementById('volunteerSkills').value,
        availability: document.getElementById('availability').value,
        motivation: document.getElementById('motivation').value
    };
    
    // Validation
    if (!formData.name.trim()) {
        showMessage('volunteerForm', 'Please enter your full name.', false);
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showMessage('volunteerForm', 'Please enter a valid email address.', false);
        return;
    }
    
    if (!validatePhone(formData.phone)) {
        showMessage('volunteerForm', 'Please enter a valid phone number.', false);
        return;
    }
    
    if (!formData.age || formData.age < 16 || formData.age > 80) {
        showMessage('volunteerForm', 'Please enter a valid age between 16 and 80.', false);
        return;
    }
    
    if (!formData.location.trim()) {
        showMessage('volunteerForm', 'Please enter your location.', false);
        return;
    }
    
    if (!formData.skills.trim()) {
        showMessage('volunteerForm', 'Please describe your skills and interests.', false);
        return;
    }
    
    if (!formData.availability) {
        showMessage('volunteerForm', 'Please select your availability.', false);
        return;
    }
    
    if (!formData.motivation.trim()) {
        showMessage('volunteerForm', 'Please tell us why you want to volunteer.', false);
        return;
    }
    
    // Simulate form submission
    showMessage('volunteerForm', 'Thank you for your interest in volunteering! We will review your application and contact you within 5-7 business days.', true);
    
    // Reset form
    this.reset();
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeModal('volunteerModal');
    }, 3000);
    
    // Store volunteer data (in real implementation, this would be sent to a server)
    console.log('Volunteer application submitted:', formData);
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        inquiryType: document.getElementById('inquiryType').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validation
    if (!formData.inquiryType) {
        alert('Please select an inquiry type.');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!formData.message.trim()) {
        alert('Please enter your message.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you within 24 hours.');
    
    // Reset form
    this.reset();
    
    // Store contact data (in real implementation, this would be sent to a server)
    console.log('Contact form submitted:', formData);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.involvement-card, .story-card, .problem-category, .stat');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for impact stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number) {
                    stat.textContent = '0';
                    animateCounter(stat, number);
                }
            });
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic content loading for stories
const impactStories = [
    {
        title: "Transforming Lives Through Cloth for Work",
        content: "In remote villages of Rajasthan, Goonj's Cloth for Work initiative has empowered communities to build infrastructure while earning dignity through their labor. Families receive essential clothing and household items in exchange for community development work.",
        date: "March 2024",
        image: "assets/get_involved_hero.jpeg"
    },
    {
        title: "Disaster Relief in Flood-Affected Areas",
        content: "When floods devastated parts of Bihar, Goonj's rapid response team provided immediate relief materials and supported long-term rehabilitation efforts, helping thousands of families rebuild their lives with dignity.",
        date: "August 2023",
        image: "assets/disaster_relief.png"
    },
    {
        title: "Women's Empowerment Through Livelihood",
        content: "Through our livelihood programs, women in urban slums have found sustainable income opportunities by creating beautiful products from recycled materials, fostering both economic independence and environmental consciousness.",
        date: "January 2024",
        image: "assets/balthak.png"
    }
];

// Function to load more stories (for future expansion)
function loadMoreStories() {
    // This function can be expanded to load more stories dynamically
    console.log('Loading more stories...');
}

// Search functionality (for future expansion)
function searchContent(query) {
    // This function can be expanded to search through content
    console.log('Searching for:', query);
}

// Newsletter subscription (for future expansion)
function subscribeNewsletter(email) {
    if (validateEmail(email)) {
        console.log('Newsletter subscription for:', email);
        return true;
    }
    return false;
}

// Social media sharing (for future expansion)
function shareOnSocialMedia(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Add focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Performance optimization - lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contributeBtn = document.querySelector('.contribute-btn');
    const donationModal = document.getElementById('donationModal');
    const closeDonationModal = document.getElementById('closeDonationModal');
    const donationForm = document.getElementById('donationForm');

    if (contributeBtn && donationModal && closeDonationModal) {
        contributeBtn.addEventListener('click', function() {
            donationModal.style.display = 'block';
        });
        closeDonationModal.addEventListener('click', function() {
            donationModal.style.display = 'none';
        });
        window.addEventListener('click', function(event) {
            if (event.target === donationModal) {
                donationModal.style.display = 'none';
            }
        });
    }

    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your contribution!');
            donationModal.style.display = 'none';
            donationForm.reset();
        });
    }
});

