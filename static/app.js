const apiKey = 'ggC2L50GLWuQC0jhJeXaXBloawr0T0ghQ7gW4TAy';

// Function to fetch picture and redirect to result page
async function fetchPicture(date) {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: apiKey,
                date: date
            }
        });

        const data = response.data;
        // Store fetched data in localStorage
        localStorage.setItem('title', data.title);
        localStorage.setItem('description', data.explanation);
        localStorage.setItem('imageUrl', data.url);

        // Redirect to result page
        window.location.href = '/static/result.html';

    } catch (error) {
        console.error('Error fetching picture:', error);
        alert('Failed to fetch the picture.');
    }
}

// Event listener for fetch button on home page
if (document.getElementById('fetchButton')) {
    document.getElementById('fetchButton').addEventListener('click', function() {
        const date = document.getElementById('date').value;
        if (!date) {
            alert('Please enter a valid date');
            return;
        }
        fetchPicture(date);
    });
}

// Function to load data on result page
window.onload = function() {
    if (document.getElementById('title')) {
        const title = localStorage.getItem('title');
        const description = localStorage.getItem('description');
        const imageUrl = localStorage.getItem('imageUrl');

        document.getElementById('title').textContent = title;
        document.getElementById('description').textContent = description;
        document.getElementById('apod-image').src = imageUrl;
        document.getElementById('apod-image').alt = title;
        console.log("Image URL: " + imageUrl);

    }

    // Event listener for back button on result page
    if (document.getElementById('backButton')) {
        document.getElementById('backButton').addEventListener('click', function() {
            window.location.href = '/static/index.html';
        });
    }
};