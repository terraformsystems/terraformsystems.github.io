// Click handler for images on the page. Shows the modal with the
// clicked image and its alt text.
function onClick(element) {
    console.log('onClick called with element:', element);
    const img01 = document.getElementById("img01"); // The image element in the modal
    const modal01 = document.getElementById("modal01"); // The modal element itself
    const caption = document.getElementById("caption"); // The alt text of the image

    img01.src = element.src; // Set the image in the modal to the clicked image
    modal01.style.display = "block"; // Show the modal
    caption.innerHTML = element.alt; // Set the alt text of the image in the modal
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

  // Get the elements for the cookie banner
  const cookieBanner = document.getElementById('cookie-banner'); // The banner element
  const acceptCookiesButton = document.getElementById('accept-cookies'); // The accept button
  const declineCookiesButton = document.getElementById('decline-cookies'); // The decline button

  console.log('cookieBanner:', cookieBanner);
  console.log('acceptCookiesButton:', acceptCookiesButton);
  console.log('declineCookiesButton:', declineCookiesButton);

  // cookieBanner.style.position = 'sticky';

  // If the user clicks the accept button, set the cookie to "true" and hide the banner
  acceptCookiesButton.addEventListener('click', () => {
    console.log('acceptCookiesButton clicked');
    // Set cookies here
    document.cookie = 'cookie-consent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    cookieBanner.style.display = 'none'; // Hide the banner
  });

  // If the user clicks the decline button, set the cookie to "false" and hide the banner
  declineCookiesButton.addEventListener('click', () => {
    console.log('declineCookiesButton clicked');
    // Remove cookies here
    document.cookie = 'cookie-consent=false; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    cookieBanner.style.display = 'none'; // Hide the banner
  });

