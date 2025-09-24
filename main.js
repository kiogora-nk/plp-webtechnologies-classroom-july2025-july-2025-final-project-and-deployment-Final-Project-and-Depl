// js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // =========================
  // Footer Year
  // =========================
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // =========================
  // Mobile Navigation
  // =========================
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      const isVisible = nav.getAttribute('data-visible') === 'true';
      nav.setAttribute('data-visible', !isVisible);
      navToggle.setAttribute('aria-expanded', !isVisible);
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // =========================
  // Scroll Animations
  // =========================
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const animateOnScroll = function() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  };
  
  // Check on load
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // =========================
  // Newsletter Form
  // =========================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button');
      
      if (emailInput.value) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          showModal('Thank you for subscribing to our newsletter!');
          emailInput.value = '';
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }
  
  // =========================
  // Contact Form Validation
  // =========================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');
      let isValid = true;
      
      // Reset previous errors
      document.querySelectorAll('.error').forEach(error => error.remove());
      document.querySelectorAll('input, textarea').forEach(field => {
        field.style.borderColor = '';
      });
      
      if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
      }
      
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      }
      
      if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          showModal('Thank you for your message! We will get back to you soon.');
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }
  
  // =========================
  // Gallery Lightbox
  // =========================
  const galleryImages = document.querySelectorAll('.gallery img');
  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.background = 'rgba(0,0,0,0.9)';
    lightbox.style.display = 'none';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '1000';
    
    const img = document.createElement('img');
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    lightbox.appendChild(img);
    
    document.body.appendChild(lightbox);
    
    galleryImages.forEach(image => {
      image.addEventListener('click', () => {
        img.src = image.src;
        lightbox.style.display = 'flex';
      });
    });
    
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }
  
  // =========================
  // Helpers
  // =========================
  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    
    input.parentNode.appendChild(error);
    input.style.borderColor = '#e74c3c';
    
    input.addEventListener('input', function() {
      error.remove();
      input.style.borderColor = '';
    }, { once: true });
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Simple modal for confirmations
  function showModal(message) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#fff';
    modal.style.padding = '1.5rem';
    modal.style.borderRadius = '10px';
    modal.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    modal.style.zIndex = '2000';
    modal.style.maxWidth = '90%';
    modal.style.textAlign = 'center';
    
    const text = document.createElement('p');
    text.textContent = message;
    text.style.marginBottom = '1rem';
    modal.appendChild(text);
    
    const button = document.createElement('button');
    button.textContent = 'OK';
    button.style.padding = '0.5rem 1rem';
    button.style.background = '#27ae60';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => modal.remove());
    
    modal.appendChild(button);
    document.body.appendChild(modal);
  }
});
