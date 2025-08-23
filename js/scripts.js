document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // Typing Effect
    const typingText = document.getElementById("typing-text");
    const phrases = [
        "Innovating for a brighter digital future.",
        "Empowering your business with technology.",
        "Your trusted IT solutions partner."
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && letterIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect after loading
    setTimeout(typeEffect, 2000);

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const count = +stat.innerText;
            const increment = target / speed;

            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                stat.innerText = target;
            }
        });
    }

    // Start counter when section is in view
    const aboutSection = document.querySelector('#about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function showTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
    nextBtn.addEventListener('click', () => showTestimonial(currentTestimonial + 1));

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonials');
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            if (name.value.trim() === '') {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }

            if (email.value.trim() === '' || !email.value.includes('@')) {
                isValid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }

            if (message.value.trim() === '') {
                isValid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize elements as hidden
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
});
 // ========== WHATSAPP INTEGRATION ==========
  const whatsappBtn = document.getElementById('whatsappBtn');
  const whatsappNumber = "08031806660"; // Replace with your number
  
  whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello! I'm interested in your services from your website."
  )}`;