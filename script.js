// Initial JavaScript file
console.log("Script loaded.");

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Close all other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle the clicked answer
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Audience Toggle Switch Logic
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const audienceContents = document.querySelectorAll('.audience-content');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and content
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            audienceContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Show the corresponding content
            const targetAudience = button.dataset.audience;
            document.getElementById(`${targetAudience}-content`).classList.add('active');
        });
    });

    // Set initial active state for audience toggle
    if (toggleButtons.length > 0 && audienceContents.length > 0) {
        toggleButtons[0].classList.add('active');
        audienceContents[0].classList.add('active');
    }

    // Visitor Counter Logic
    const visitorCounter = document.getElementById('visitor-counter');
    let visitCount = localStorage.getItem('page_visit_count');

    if (visitCount) {
        visitCount = parseInt(visitCount) + 1;
    } else {
        visitCount = 1;
    }

    localStorage.setItem('page_visit_count', visitCount);
    visitorCounter.textContent = `You've visited this page ${visitCount} times.`;

    // Contact Form Validation Logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Name validation
            if (nameInput.value.trim() === '') {
                alert('Name is required.');
                isValid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                isValid = false;
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                alert('Message is required.');
                isValid = false;
            }

            if (isValid) {
                alert('Form submitted successfully!');
                contactForm.reset(); // Clear the form
            }
        });
    }
});
