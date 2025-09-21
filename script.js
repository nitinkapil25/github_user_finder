
let searchbtn = document.querySelector("#searchBtn")
let usernameval = document.querySelector("#username")
let cardui = document.querySelector("#card")


function fetchUserProfile(username){
   return  fetch(`https://api.github.com/users/${username}`)
   .then(raw => {
    if(! raw.ok) throw new Error("user not found")

       return  raw.json()
   })
}


function op(details){
    console.log(details);
    
   let data =  `
  <div class="flex items-center space-x-6">
    
    <!-- Avatar -->
    <img src="${details.avatar_url}" 
         alt="octocat"
         class="w-24 h-24 rounded-full border-2 border-gray-600 shadow-md">
    
    <!-- Info -->
    <div class="flex-1">
      <h2 class="text-2xl font-bold text-white">${details.name}</h2>
      <p class="text-gray-400 text-sm mb-2">${details.bio}</p>

      <!-- Company + Location -->
      <div class="flex items-center space-x-4 text-sm text-gray-400">
        <span>🏢 ${details.company}</span>
        <span>📍${details.location}</span>
      </div>

      <!-- Stats -->
      <div class="flex space-x-6 mt-4 text-sm text-gray-300">
        <span>📂 Repos: <span class="font-semibold">${details.public_repos
}</span></span>
        <span>👥 Followers: <span class="font-semibold">${details.followers}</span></span>
        <span>➡️ Following: <span class="font-semibold">${details.following}</span></span>
      </div>

      <!-- Profile Link -->
      <a href="https://github.com/${details.login}" target="_blank"
         class="inline-block mt-5 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition shadow-md">
        🔗 View Profile
      </a>
    </div>
  </div>
</div>
      `;
       card.classList.remove("animate-pulse");
      card.innerHTML = data

}

// fetchUserProfile("nitinkapil25")
// .then((data)=>{
//     console.log(data);
    
// })

searchbtn.addEventListener('click', function(){
    
    let username = usernameval.value.trim();

    if(username.length > 0){
        fetchUserProfile(username).then((data)=>{
           op(data)
            
        })
       .catch((err) => {
        // ❌ error → card me dikhana
        cardui.innerHTML = `
          <div class="w-full p-6 bg-[#161b22] border border-red-600 rounded-2xl shadow-xl text-center">
            <h2 class="text-xl font-bold text-red-500">⚠️ ${err.message}</h2>
            <p class="text-gray-400 mt-2">
              The username "<span class="text-white">${username}</span>" was not found on GitHub.
            </p>
          </div>
        `;
      });
  } else {
    alert("⚠️ Please enter a username");
  }
});
