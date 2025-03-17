// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    setupThemeToggle();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Highlight active navigation link based on scroll position
    highlightNavOnScroll();

    // Quotes functionality
    setupQuoteModal();

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Set progress bar widths dynamically
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.setProperty('--progress-width', width);
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            workItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const formStatus = document.getElementById('form-status');
            
            // Reset form status
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            formStatus.textContent = '';
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill in all fields';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Create form data for sending
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                to_email: 'amiyanayak3105@gmail.com',
                time: new Date().toLocaleString()
            };
            
            // Show sending indicator
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send the form data using EmailJS
            // Replace "YOUR_SERVICE_ID" with your actual EmailJS service ID
            // Replace "YOUR_TEMPLATE_ID" with your actual EmailJS template ID
            // You can find these in your EmailJS dashboard
            emailjs.send('service_qsid2nd', 'template_c4z4gla', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later or contact me directly via email.';
                    formStatus.className = 'form-status error';
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.skill-item, .work-item, .contact-item, .about-image, .about-text, .hero-content, .hero-image');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Add animation classes to elements
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
    
    document.querySelectorAll('.work-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
    
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });

    // Animate skill bars
    animateSkillBars();
    
    // Add colorful particles
    addParticleStyles();
    addColorfulParticles();
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-per');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.getAttribute('per');
                skillBar.style.width = percentage + '%';
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(skillBar => {
        observer.observe(skillBar);
    });
}

// Add random colorful particles
function addColorfulParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    const colors = [
        'rgba(67, 97, 238, 0.7)',
        'rgba(76, 201, 240, 0.7)',
        'rgba(247, 37, 133, 0.7)',
        'rgba(251, 133, 0, 0.7)',
        'rgba(6, 214, 160, 0.7)'
    ];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 15 + 5;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set styles
        particle.style.cssText = `
            position: fixed;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            filter: blur(${size / 3}px);
            opacity: ${Math.random() * 0.5 + 0.1};
            z-index: -1;
            pointer-events: none;
            animation: floatParticle ${duration}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add CSS for particle animation
function addParticleStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Setup quote modal functionality
function setupQuoteModal() {
    const logo = document.getElementById('logo');
    const quoteModal = document.getElementById('quoteModal');
    const quoteText = document.getElementById('quoteText');
    const closeQuote = document.querySelector('.close-quote');
    
    // Array of positive quotes
    const quotes = [
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "It always seems impossible until it's done.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "You are never too old to set another goal or to dream a new dream.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Strive not to be a success, but rather to be of value.",
        "The best way to predict the future is to create it.",
        "Everything you've ever wanted is on the other side of fear.",
        "The only person you are destined to become is the person you decide to be.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Your time is limited, don't waste it living someone else's life.",
        "Life is 10% what happens to us and 90% how we react to it."
    ];
    
    // Add circuit and glow elements to quote content
    const quoteContent = document.querySelector('.quote-content');
    const quoteGlow = document.createElement('div');
    quoteGlow.className = 'quote-glow';
    
    const quoteCircuit = document.createElement('div');
    quoteCircuit.className = 'quote-circuit';
    
    quoteContent.appendChild(quoteGlow);
    quoteContent.appendChild(quoteCircuit);
    
    // Function to get a random quote
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }
    
    // Show quote modal with animation
    function showQuoteModal() {
        quoteText.textContent = getRandomQuote();
        quoteModal.style.display = 'block';
        
        // Trigger reflow for animation to work
        void quoteModal.offsetWidth;
        
        quoteModal.classList.add('show');
    }
    
    // Hide quote modal
    function hideQuoteModal() {
        quoteModal.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            quoteModal.style.display = 'none';
        }, 300);
    }
    
    // Event listeners
    logo.addEventListener('click', showQuoteModal);
    closeQuote.addEventListener('click', hideQuoteModal);
    
    // Close modal when clicking outside the content
    quoteModal.addEventListener('click', function(event) {
        if (event.target === quoteModal) {
            hideQuoteModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && quoteModal.classList.contains('show')) {
            hideQuoteModal();
        }
    });
}

// Highlight active navigation link based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on saved preference or device preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme;
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            newTheme = 'light';
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for changes in device color scheme preference
    prefersDarkScheme.addEventListener('change', function(e) {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            if (newTheme === 'dark') {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });
} 
