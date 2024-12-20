function getprofile() {
    const username = document.getElementById('username').value;

    if (!username) {
        alert("Please enter a valid GitHub username!");
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Profile not found!');
            }
            return response.json();
        })
        .then((data) => {
            displayprofile(data);
        })
        .catch((err) => {
            console.error("There was a problem: ", err);
            alert("Error fetching profile. Please check the username.");
        });
}

function displayprofile(data) {
    const profile = document.getElementById('profile');

    profile.innerHTML = `
        <img id="Profile_pic" src="${data.avatar_url}" alt="Profile Picture">
        <h2>${data.login}</h2>
        <p><strong>Name:</strong> ${data.name || "N/A"}</p>
        <p><strong>Public Repositories:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Following:</strong> ${data.following}</p>
        <p><strong>Bio:</strong> ${data.bio || "No bio available"}</p>
        <p><a href="${data.html_url}" target="_blank" style="color: #6a11cb; text-decoration: none; font-weight: bold;">View Profile on GitHub</a></p>
    `;
}