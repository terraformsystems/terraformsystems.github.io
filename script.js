// Click handler for images on the page. Shows the modal with the
// clicked image and its alt text.
function onClick(element) {
  if (!element || !element.src) {
    console.error('Invalid element or element.src is missing');
    return;
  }

  const img01 = document.getElementById("img01");
  const modal01 = document.getElementById("modal01");
  const caption = document.getElementById("caption");

  if (!img01 || !modal01 || !caption) {
    console.error('Required modal elements not found');
    return;
  }

  img01.src = element.src;
  img01.alt = element.alt || ''; // Ensure alt text is set
  modal01.style.display = "block";
  caption.textContent = element.alt || ''; // Use textContent for security
}


// Toggle between showing and hiding the sidebar when clicking the menu icon
const mySidebar = document.getElementById("mySidebar"); // The sidebar element

// Shows the sidebar if it's hidden, hides it if it's shown
function w3_open() {
  console.log('w3_open called');
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

// Close the sidebar with the close button
function w3_close() {
  console.log('w3_close called');
  mySidebar.style.display = "none"; // Hide the sidebar
}

// Try to set a cookie with the name "myCookie" and the value "Hello, World!"
// expiring in 7 days. If the cookie is not set, log an error.
try {
  console.log('Setting cookie...');
  const cookieOptions = { expires: 7 };
  const cookieName = 'myCookie';
  const cookieValue = 'Hello, World!';
  document.cookie = `${cookieName}=${cookieValue}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
  console.log('Cookie set:', document.cookie);
} catch (error) {
  console.error('Error setting cookie:', error);
}

// Function to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Function to show cookie banner if consent not given
function showCookieBannerIfNeeded() {
  const cookieConsent = getCookie('cookie-consent');
  if (cookieConsent === null) {
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
      cookieBanner.style.display = 'block';
    }
  }
}

// Initialize cookie consent
function initCookieConsent() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesButton = document.getElementById('accept-cookies');
  const declineCookiesButton = document.getElementById('decline-cookies');

  if (!cookieBanner || !acceptCookiesButton || !declineCookiesButton) {
    console.error('Cookie consent elements not found');
    return;
  }

  // Show banner if consent not given
  showCookieBannerIfNeeded();

  // Handle accept button click
  acceptCookiesButton.addEventListener('click', () => {
    document.cookie = 'cookie-consent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
    cookieBanner.style.display = 'none';
    console.log('Cookies accepted');
  });

  // Handle decline button click
  declineCookiesButton.addEventListener('click', () => {
    document.cookie = 'cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    cookieBanner.style.display = 'none';
    console.log('Cookies declined');
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();

  // Add click handlers to all images with onclick="onClick(this)"
  document.querySelectorAll('img[onclick*="onClick"]').forEach(img => {
    img.style.cursor = 'pointer';
  });
});
