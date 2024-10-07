document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredResources = resources.filter(resource => 
        resource.name.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query)
    );
    
    displayResources(filteredResources);
});

function displayResources(resources) {
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = ''; // Clear previous data

    if (resources.length === 0) {
        resourcesList.innerHTML = '<p>No resources found.</p>';
        return;
    }

    resources.forEach(resource => {
        const resourceDiv = document.createElement('div');
        resourceDiv.className = 'resource';
        resourceDiv.innerHTML = `<h3>${resource.name}</h3><p>${resource.description}</p><p><strong>Location:</strong> ${resource.location}</p>`;
        resourcesList.appendChild(resourceDiv);
    });
}

// Display all data
window.onload = () => displayResources(resources);
