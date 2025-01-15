let toggleTheme = document.getElementById("toggle-theme");
document.getElementById("toggle-theme").onclick=()=>{
    if(document.body.classList.contains("theme")){
        document.body.classList.remove("theme");
        toggleTheme.src="assets/icons/moon.webp";
    }else{
        document.body.classList.add("theme");
        toggleTheme.src="assets/icons/sun.webp";
    }
}

let userDetails = document.getElementById("user-details");

function getData(){
    let data ="";
        fetch(`https://api.github.com/users/HamdyShehiet`)
        .then((res)=>res.json())
        .then((userData)=>{            
            data = `
                <div class="user-data">
                    <div class="user-image name">
                        <img src="${userData.avatar_url}" alt="User Image">
                        <h1>${userData.name}</h1>
                    </div>
                <div class="user-info">
                    <div class="location">
                        <span class="title">Location:</span>
                        <span class="description">${userData.location || "Not Founded"}</span>
                    </div>
                    <div class="bio">
                            <span class="title">Bio:</span>
                            <p class="description">${userData.bio || "Not Founded"}</p>
                    </div>
                    <div class="username">
                            <span class="title">Username:</span>
                            <p class="description">${userData.login}</p>
                    </div>
                    <a class="show-profile" href="${userData.html_url || "Not Founded"}" target="_blank" >Github Profile</a>
                </div>
                </div>
                <div class="profile-details">
                        <span class="followers">Followers: ${userData.followers}</span>
                        <span class="following">Following: ${userData.following}</span>
                        <span class="repositories">Repositories: ${userData.public_repos}</span>
                </div>
                <div class="repos-data">
                    <ul id="repos-data">
                    </ul>
                </div>
                `
                fetch(`https://api.github.com/users/HamdyShehiet/repos`)
                .then(res=>res.json())
                .then((reposData)=>{
                    let reposOutput = "";
                    for(let i = 0 ; i<reposData.length ; i++ ){
                        reposOutput += `
                        <li><span class="page-name">${reposData[i].name}</span><div class="links"><a href="${reposData[i].html_url}" target="_blank"  class="repo-code">Code</a><a href="${reposData[i].homepage}" target="_blank"  class="home-page">Home Page</a></div></li>
                        `
                        document.getElementById("repos-data").innerHTML=reposOutput;
                    }
                })
            userDetails.innerHTML = data;
        })
    }
getData();
