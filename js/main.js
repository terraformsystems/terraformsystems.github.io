// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenuButton.click();
        }

        // Smooth scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // Intersection Observer for scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize animations
  animateOnScroll();

  // Re-run animations when window is resized
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      animateOnScroll();
    }, 250);
  });

  // Cookie consent functionality
  const cookieBanner = document.getElementById('cookie-consent');
  const acceptCookiesButton = document.getElementById('accept-cookies');
  const declineCookiesButton = document.getElementById('decline-cookies');

  // Check if user has already made a choice
  const hasConsented = localStorage.getItem('cookie-consent');

  if (!hasConsented && cookieBanner) {
    // Show cookie banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }

  // Handle accept cookies
  if (acceptCookiesButton) {
    acceptCookiesButton.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'accepted');
      cookieBanner.classList.remove('show');
      // Initialize analytics or other tracking here
      console.log('Cookies accepted');
    });
  }

  // Handle decline cookies
  if (declineCookiesButton) {
    declineCookiesButton.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'declined');
      cookieBanner.classList.remove('show');
      console.log('Cookies declined');
    });
  }

  // Add animation to elements with the animate-on-scroll class
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });

  // Back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
    </svg>
  `;
  backToTopButton.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-blue-700';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopButton);

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.remove('opacity-100', 'visible');
      backToTopButton.classList.add('opacity-0', 'invisible');
    }
  });

  // Scroll to top on click
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize tooltips if using any UI library that requires it
  if (typeof tippy === 'function') {
    tippy('[data-tippy-content]');
  }
});

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Form submission handling
const forms = document.querySelectorAll('form[data-netlify="true"], form[data-netlify]');
forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    try {
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';

      // Submit form data
      const response = await fetch(form.action || '/', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'mt-4 p-4 bg-green-100 text-green-800 rounded';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        form.reset();
        form.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'mt-4 p-4 bg-red-100 text-red-800 rounded';
      errorMessage.textContent = 'There was a problem sending your message. Please try again later.';
      form.appendChild(errorMessage);

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
});
