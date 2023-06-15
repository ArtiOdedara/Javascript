//Fetch posts data 
const api = fetch('https://jsonplaceholder.typicode.com/posts');
api.then(response => response.json())
.then(json => myFun(json))

//show username and post data 
function myFun(json){
  json.forEach(element => {
    let newDiv = document.createElement('div');
    newDiv.className = "elements";

    let postElements = document.createElement('div');
    
    const users = fetch("https://jsonplaceholder.typicode.com/users");
    users.then(response => response.json())
    .then(users => findUser(users, element, postElements));
    
    
    newDiv.append(postElements);
    document.getElementById("allPosts").append(newDiv);
    
    
    const comments = fetch(`https://jsonplaceholder.typicode.com/posts/${element.id}/comments`);
    comments.then(response => response.json())
    .then(comments => myComments(comments, element.id, newDiv))
  });
}

//finding user from perticular posts
function findUser(users, element, postElements){
  users.forEach(user => {
    if(user.id === element.userId){   
      postElements.innerHTML += `<div class="headerDiv"><h5><i class="fa-solid fa-user me-2"></i> ${user.name}</h5></div><hr><div class="p-4"><h6>${element.title}</h6><p>${element.body}</P></div><hr>`;  
    }
  });
}

//Showing comments of perticular posts
function myComments(comments, id, newDiv){
  let newSubDiv = document.createElement('div');
  newSubDiv.className = "subElements";

  let html = `<ul class="commentsUl">`;
  comments.forEach(comment => {
    html += `<li class="mt-4"><h6><i class="fa-solid fa-comment-dots me-2"></i>${comment.email}</h6><p>${comment.body}</p></li><hr>`
  })
  html += `</ul>`;

  comments.forEach(comment => {
    newSubDiv.innerHTML = `<div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#comment${comment.id}" aria-expanded="false" aria-controls="flush-collapseOne">
          Comments
        </button>
      </h2>
      <div id="comment${comment.id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">${html}</div>
      </div>
    </div>
  </div>`;
  })
  newDiv.append(newSubDiv);
}
