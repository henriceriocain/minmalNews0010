// index.html variables
const cardDiv = document.querySelector("#article-div");
const articles = document.querySelectorAll(".card");
// article.html variables
const articleHeaderDiv = document.querySelector("#article-header-div");
const articleContentsDiv = document.querySelector("article-contents-div");
// seach.html variables
const resultsDiv = document.querySelector("#results");
// register.html variables

// Populates the page with elements
async function populateCardDiv(){

  const response = await fetch("http://localhost:8000/articles");
  const articles = await response.json();

  // Successful so far
  // console.log(articles);
  // console.log(articles[0].a_content);

  for(let i = 0; i < articles.length; i++){
    // console.log(articles[i]);
    createArticle(cardDiv, articles[i].a_content, articles[i].a_slug, articles[i].a_teaser, articles[i].a_title, articles[i].is_premium);
  }

}

function createArticle(container, a_content, a_slug, a_teaser, a_title, is_premium){

  // Creates the element
  let parentDiv = document.createElement("div");
  let div = document.createElement("div");
  let h5 = document.createElement("h5");
  let p = document.createElement("p");
  h5.textContent = a_title;
  p.textContent = a_teaser;
  h5.classList.add("card-title");
  p.classList.add("card-text");
  div.appendChild(h5);
  div.appendChild(p);
  div.classList.add("card-body");
  div.style.width = "18em";
  parentDiv.classList.add("card");
  parentDiv.appendChild(div);
  container.appendChild(parentDiv);

  // The event lister logic
  parentDiv.addEventListener("click", () => {
    window.location.href = "http://localhost:8000/article?" + a_slug;
  });

}

// Upon loading in
document.addEventListener("DOMContentLoaded", () => {
  let page = document.body.dataset.page;
  if(page == "index"){
    populateCardDiv();
  } else if (page == "results"){
    loadResults();
  }
});

// For /Search
async function loadResults(){

  const url = new URL(window.location.href);
  let query = url.search.replace("?query=", "");

  let response = await fetch("http://localhost:8000/results?" + query);
  let articles = await response.json();

  console.log(articles);

  if(articles && articles.length > 0){
    for(let i = 0; i < articles.length; i++){
      createArticle(resultsDiv, articles[i].a_content, articles[i].a_slug, articles[i].a_teaser, articles[i].a_title, articles[i].is_premium);
    }
  } else {
    let p = document.createElement("p");
    p.textContent = "No results found";
    resultsDiv.appendChild(p);
  }

}





