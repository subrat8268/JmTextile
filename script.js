const navbarLinks = document.querySelectorAll('.navbar-items a');
const mainContent = document.getElementById('main-content');
const sidebarContent = document.querySelector('.news-sidebar');

// Function to load content from sidebar.html
function loadSidebarContent() {
    loadContent('./pages/sidebar.html', sidebarContent);
}

// Function to load content from a URL into the main content area
function loadContent(url, target) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            target.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

// Add click event listeners to the navbar links
navbarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const pageURL = link.getAttribute('href');

        // Remove the "active" class from all links
        navbarLinks.forEach(item => item.classList.remove('active'));

        // Add the "active" class to the clicked link
        link.classList.add('active');

        loadContent(pageURL, mainContent);
    });
});

// Load the initial content when the page loads (e.g., "home.html")
loadContent(navbarLinks[0].getAttribute('href'), mainContent);
navbarLinks[0].classList.add('active');

// Load the sidebar content
loadSidebarContent();

// WhatsApp Redirect Function
function redirectToWhatsApp() {
    // Define the WhatsApp number (with the country code) and the message
    const phoneNumber = '8268017431'; // Replace with your actual WhatsApp number
    const message = 'Hello, I have a question.';

    // Create the WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab or window
    window.open(whatsappURL, '_blank');
}

// Attach a click event to the WhatsApp button
document.getElementById('whatsappButton').addEventListener('click', redirectToWhatsApp);

// Function to reload the page
function reloadPage() {
    location.reload();
}

// Add an event listener for the visibility change
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        // Tab has become visible, so reload the page
        reloadPage();
    }
});

// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const contentContainers = document.querySelectorAll("#main-content");
const notFoundMessage = document.getElementById("not-found-message");

// Function to perform search
const performSearch = () => {
    const searchText = searchInput.value.toLowerCase().trim();
    let resultFound = false;

    contentContainers.forEach(container => {
        const sectionName = container.getAttribute("data-section");
        const paragraphs = container.querySelectorAll("p");

        for (let i = 0; i < paragraphs.length; i++) {
            const text = paragraphs[i].textContent.toLowerCase();

            if (text.includes(searchText)) {
                paragraphs[i].scrollIntoView({ behavior: "smooth" });

                const regex = new RegExp(searchText, "gi");
                const highlightedText = paragraphs[i].innerHTML.replace(
                    regex,
                    (match) => `<span class="highlighted">${match}</span>`
                );
                paragraphs[i].innerHTML = highlightedText;
                resultFound = true;
            }
        }
    });

    notFoundMessage.style.display = resultFound ? "none" : "block";
    if (!resultFound) {
        setTimeout(() => {
            notFoundMessage.style.display = "none";
        }, 3000);
    }
};

// Event listener for the search button click
searchButton.addEventListener("click", performSearch);

// Event listener for Enter key press in the search input
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        performSearch();
    }
});
