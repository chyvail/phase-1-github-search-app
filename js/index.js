document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#github-form");
  let userDetails = document.querySelector("#user-details");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formInput = e.target.querySelector("#search").value;

    fetch(`https://api.github.com/users/${formInput}`, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); 
        } else {
          console.log("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        userDetails.innerHTML = `
        <div class="user-data">
            <p>Name: ${data.name}</p>
            <p>Folowers: ${data.followers}</p>
            <p>Public Repos: ${data.public_repos}</p>
        </div>
        <div><img src="${data.avatar_url}"></img></div>
        `;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
