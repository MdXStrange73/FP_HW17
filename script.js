document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const usernameInput = document.getElementById("usernameInput");
    const userInfoDiv = document.getElementById("userInfo");

    searchButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username === "") {
            return;
        }

        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            })
            .then(userData => {
                const avatarUrl = userData.avatar_url;
                const publicRepos = userData.public_repos;
                const followers = userData.followers;
                const following = userData.following;

                userInfoDiv.innerHTML = `
                    <img src="${avatarUrl}" alt="User Avatar" style="width: 100px; height: 100px;">
                    <p>Public Repositories: ${publicRepos}</p>
                    <p>Followers: ${followers}</p>
                    <p>Following: ${following}</p>
                `;
            })
            .catch(error => {
                userInfoDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    });
});