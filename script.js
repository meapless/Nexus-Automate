// Initial JavaScript file
console.log("Script loaded.");
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const visitCount = document.getElementById('visitCount');
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize visitor counter
function initVisitorCounter() {
    let count = localStorage.getItem('visitCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitCount', count);
    visitCount.textContent = count;
}

// Theme toggle functionality
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Mobile menu toggle
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Audience toggle switch
function initAudienceToggle() {
    const toggleInputs = document.querySelectorAll('input[name="audience"]');
    const contentBlocks = document.querySelectorAll('.content-block');
    
    toggleInputs.forEach(input => {
        input.addEventListener('change', () => {
            const targetId = input.value + '-content';
            
            contentBlocks.forEach(block => {
                block.classList.remove('active');
            });
            
            const targetBlock = document.getElementById(targetId);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
        });
    });
}

// Product carousel
function initCarousel() {
    let currentIndex = 0;
    const cards = document.querySelectorAll('.product-card');
    const totalCards = cards.length;
    const cardWidth = 380; // Card width + gap
    
    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % (totalCards - 2); // Show 3 cards at once
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 3;
        updateCarousel();
    });
    
    // Auto-play carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % (totalCards - 2);
        updateCarousel();
    }, 5000);
}

// Contact form validation and submission
function initContactForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        input.classList.add('error');
        let errorDiv = input.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
    
    function clearError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
    }
    
    function showSuccess(message) {
        let successDiv = contactForm.querySelector('.success-message');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            contactForm.insertBefore(successDiv, contactForm.firstChild);
        }
        successDiv.textContent = message;
        successDiv.classList.add('show');
        
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 5000);
    }
    
    // Real-time validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) {
            clearError(nameInput);
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (validateEmail(emailInput.value)) {
            clearError(emailInput);
        }
    });
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim()) {
            clearError(messageInput);
        }
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showSuccess('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Chatbot functionality with Puter.js
async function initChatbot() {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const questionButtons = document.querySelectorAll('.question-btn');
    
    // Load context from file
    let context = '';
    try {
        const response = await fetch('context.txt');
        if (response.ok) {
            context = await response.text();
        } else {
            console.error('Failed to load context file');
            // Fallback context in case file loading fails
            context = 'Nexus Automate is a leading AI automation platform for Kenyan businesses, founded in 2023 by Samuel Mwangi and Amina Ochieng. We help businesses streamline operations, reduce costs, and accelerate growth through AI automation solutions.';
        }
    } catch (error) {
        console.error('Error loading context:', error);
        // Fallback context
        context = 'Nexus Automate is a leading AI automation platform for Kenyan businesses, founded in 2023 by Samuel Mwangi and Amina Ochieng. We help businesses streamline operations, reduce costs, and accelerate growth through AI automation solutions.';
    }
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message bot-message typing-indicator-container';
        indicatorDiv.id = 'typingIndicator';
        
        indicatorDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatMessages.appendChild(indicatorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Function to show error message
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-bubble';
        errorDiv.textContent = message;
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Function to send message to Puter.js AI using Gemini 2.0
    async function sendToPuter(message) {
        try {
            showTypingIndicator();
            
            const systemPrompt = `You are an AI assistant for Nexus Automate, a Kenyan AI automation company. 
            Answer questions based on this context about the company: ${context}
            
            Keep your responses friendly, professional, and concise (under 150 words). 
            If asked about something not in the context, politely explain you can only answer questions about Nexus Automate.`;
            
            // Using Gemini 2.0 with streaming - correct model name format
            const response = await puter.ai.chat(
                [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                {
                    model: "google/gemini-2.0-flash-lite-001",
                    stream: true
                }
            );
            
            // Remove typing indicator before starting to stream
            removeTypingIndicator();
            
            // Create a message container for the streaming response
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p id="streaming-response"></p>
                </div>
            `;
            
            chatMessages.appendChild(messageDiv);
            const streamingElement = messageDiv.querySelector('#streaming-response');
            
            // Stream the response
            let fullResponse = '';
            for await (const part of response) {
                if (part?.text) {
                    fullResponse += part.text;
                    streamingElement.innerHTML = fullResponse.replaceAll('\n', '<br>');
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }
            
            // If no response was received, show an error
            if (!fullResponse) {
                streamingElement.textContent = "I'm sorry, I couldn't process your request. Please try again.";
            }
            
        } catch (error) {
            console.error('Error with Puter.js AI:', error);
            removeTypingIndicator();
            addMessage("I'm sorry, there was an error processing your request. Please try again later.");
        }
    }
    
    // Function to handle sending a message
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (!message) {
            showErrorMessage("Please enter a question");
            return;
        }
        
        addMessage(message, true);
        chatInput.value = '';
        
        // Send to Puter.js AI
        sendToPuter(message);
    }
    
    // Event listeners
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Sample question buttons
    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .product-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initVisitorCounter();
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initBackToTop();
    initFAQ();
    initAudienceToggle();
    initCarousel();
    initContactForm();
    initChatbot();
    initScrollAnimations();
    initNavbarScroll();
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    console.log('Nexus Automate website initialized successfully! 🚀');
});

// Handle window resize for carousel
window.addEventListener('resize', () => {
    // Reset carousel position on resize
    if (window.innerWidth <= 768) {
        carouselTrack.style.transform = 'translateX(0)';
    }
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        '/placeholder.svg?height=400&width=600',
        '/placeholder.svg?height=400&width=500',
        '/placeholder.svg?height=200&width=300'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);
