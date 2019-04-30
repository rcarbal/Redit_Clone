function setupToggleAndClicklistener(){
  console.log("CALLED setupToggleAndClickListener");
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  
  $(document).ready(function () {
    $('#side-menu-btn').on('click', function () {
      toggleSidebar();
      $(this).blur();
      console.log('tooltips setup')
    });
  
  });
  
  $(document).ready(function () {
    $('#side-close').on('click', function () {
      toggleSidebar();
      console.log("tooltip for sidebar clicklistener setup")
    });
  
  });
  
  function toggleSidebar() {
    $('.sidebar').toggleClass('sidebar--not_active');
    $('.content').toggleClass('content--active_sidebar');
  }
}


// GET THE REDDIT RESPONSE
function loadDoc() {
  console.log("CALLED JSON")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      convertToJSON(this.responseText);
    }
  };
  xhttp.open("GET", "https://www.reddit.com/r/popular/top/.json?count=100", true);
  xhttp.send();
}

//CONVERT RESPONSE TO JSON
function convertToJSON(response){
  let json = JSON.parse(response);
  parseJsonToArray(json);

}

//RETRIVES THE POST OBJECT FROM JSON RESPONSE
function parseJsonToArray(jsonObject){
  console.log("CALLED parseJsonToArray");
  let arr =jsonObject["data"]["children"];
  let returnArr = [];
  for(let i = 0; i < arr.length; i++){
    let post ={};
    post.author = arr[i]["data"]["author"];
    post.crated = arr[i]["data"]["created"];
    post.subreddit_name_prefixed = arr[i]["data"]["subreddit_name_prefixed"];
    post.url = arr[i]["data"]["url"];
    post.title = arr[i]["data"]["title"];

    returnArr.push(post);
  }

  appendPostToList(arr);
}

function appendPostToList(arr){
  console.log("INSIDE APPEND");
  let list = document.querySelector(".post-list");
  for(let i=0; i < arr.length; i++){
    let post = createPostElement();
    let vote = createPostVote()
    let postInfo = createPostInfoSection(arr[i]) 
    let postBody = createPostBody(arr[i]);

    post.appendChild(vote);
    post.appendChild(postInfo);
    postInfo.appendChild(postBody);
    list.appendChild(post);
  }
  

}

function createPostElement(){
  //FULL Container
  let postCont = document.createElement("li");
  postCont.className = "post-list__post";

  return postCont;
}

function createPostVote(){
  //Vote container
  let vote = document.createElement("div");
  vote.className = "post-list__post__post-vote";

  //Vote up
  let voteUp = document.createElement("div");
  voteUp.className ="post-list__post__post-vote__up-vote";
  let upImg = document.createElement("li");
  upImg.className = "fas fa-arrow-up";

  voteUp.appendChild(upImg);
  vote.appendChild(voteUp);

  //Vote count
  let voteCount = document.createElement("div");
  voteCount.className = "post-list__post__post-vote__up-vote";
  voteCount.innerText =" 20.4K";

  vote.appendChild(voteCount);
  
  //Vote down
  let voteDown = document.createElement("div");
  voteDown.className = "post-list__post__post-vote__down-vote";
  let downImg = document.createElement("li");
  downImg.className = "fas fa-arrow-down";
  voteDown.append(downImg);

  vote.appendChild(voteDown);

  return vote;
}

function createPostInfoSection(postInfo){
  
  //Post Section
  let postSection = document.createElement("div");
  postSection.className = "post-list_post__post-container"

  // Post Header
  let header = createPostHeader(postInfo);
  postSection.appendChild(header);
  //post body

  //post footer
  return postSection;

}

function createPostHeader(postInfo){
  let header = document.createElement("div");
  header.className ="post-list_post__post-container__header post-list_post__post-container--padding";

  //Reddit image
  let reditPic = document.createElement("span");
  let reditImg = document.createElement("img");
  reditImg.src = "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png";
  reditImg.className = "post-list_post__post-container__header__img";
  reditPic.appendChild(reditImg);
  header.appendChild(reditPic);

  //Reddit Section
  let redditSection = document.createElement("span");
  redditSection.className = "font-weight-bold";
  redditSection.innerText = postInfo["data"]["subreddit_name_prefixed"];
  header.appendChild(redditSection);

  // Posted Text
  let redditPostedText = document.createElement("span");
  redditPostedText.innerText = "Posted by";
  header.appendChild(redditPostedText);

  //Post Author
  let postAuthor = document.createElement("span");
  postAuthor.innerText = postInfo["data"]["author"];
  header.appendChild(postAuthor);

  //Posted time
  let redditPostedTime = document.createElement("span");
  redditPostedTime.innerText = postInfo["data"]["created"];
  header.appendChild(redditPostedTime);

  //Join Button
  let joinButton = document.createElement("button");
  joinButton.className = "btn btn-primary btn-sm float-right pr-3";
  joinButton.innerText =" + JOIN";
  header.appendChild(joinButton);

  return header;  
}

function createPostBody(postInfo){
  let textContainer = document.createElement("div");
  textContainer.className ="post-list_post__post-container__body post-list_post__post-container--padding";
  let text = document.createElement("span");
  text.innerText = postInfo["data"]["title"];
  text.className = "font-weight-bold";
  textContainer.appendChild(text);

  //URL 
  let img = document.createElement("img");
  img.src = postInfo = postInfo["data"]["url"];
  img.className ="img-fluid";
  img.alt = "Responsive image";

  textContainer.appendChild(img);
  
  return textContainer;

}

function createPostFooter(){

}

setupToggleAndClicklistener();
loadDoc();



