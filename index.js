// ! Finished from Scrimba clone on September 12, 2020.  Practice with using an API.

// variables

const urlBase = "https://api.punkapi.com/v2/beers?page="; //# He said that pagination is built into the url by including it in the query string at the end.
const beerDiv = document.querySelector(".beers");
const filterABV = document.getElementById("filterABV");
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let optionsABV = "";
const filterIBU = document.getElementById("filterIBU");
let optionsIBU = "";
let page = 1;

//filters

filterABV.addEventListener("change", (event) => {
  const value = event.target.value;

  //? This switch statment modifies url (in async function below) by modifying options. I'm not sure how he knew the api would let a person filter in this way though.  I guess read api docs.
  switch (value) {
    case "all":
      optionsABV = "";
      break;
    case "weak":
      optionsABV = "&abv_lt=4.6";
      break;
    case "medium":
      optionsABV = "&abv_gt=4.5&abv_lt=7.6";
      break;
    case "strong":
      optionsABV = "&abv_gt=7.5";
      break;
  }
  page = 1; //so that if we filter it resets to page 1
getBeers()

});

filterIBU.addEventListener("change", (event) => {
	const value = event.target.value;
	switch (value) {
	  case "all":
		optionsIBU = "";
		break;
	  case "weak":
		optionsIBU = "&ibu_lt=35";
		break;
	  case "medium":
		optionsIBU = "&ibu_gt=34&ibu_lt=75";
		break;
	  case "strong":
		optionsIBU = "&ibu_gt=74";
		break;
	}
	page = 1;
  getBeers()
  
  });

// Create an async function called "getBeers" that uses fetch to get our beer data from the urlBase.
// Render each beer name inside the div with the class of beers that currently exists in the HTML file.

async function getBeers() {
	//fetching
	const url = urlBase + page + optionsABV + optionsIBU;
	console.log(url);
  const beersResponse = await fetch(url);
  const beers = await beersResponse.json();
  console.log(beers);

  //paginations
  pageText.innerText = page;
  if (page === 1) {
	  prevPage.disabled = true;
  } else {
	  prevPage.disable = false;
  }

  if (beers.length < 25) {
	  nextPage.disabled = true;
  } else {
	  nextPage.disabled = false;
  }

  //render data
  let beerHtml = "";
  const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

  beers.forEach((beer) => {
    beerHtml += `
		<div class='beer-wrapper card'>
			<div class='beer'>
				<img class='beer__img' src="${beer.image_url ? beer.image_url : genericBottle}">
				<h3>${beer.name}</h3>
				<span class='beer__info'>
					<span>ABV: ${beer.abv}%</span>
					<span>IBU: ${beer.ibu}</span>
				</span>
			</div>
			<div class='beer__content'>
				<div class='beer__name'> ${beer.name}</div>
				<div class='beer__tagline'> ${beer.tagline}</div>
				<div class='beer__description'> ${beer.description}</div>
				<div class='beer__food-pairing'>
					Pair with:  ${beer.food_pairing.join(",")}
				</div>
			</div>
		</div>
		`;
  });
  beerDiv.innerHTML = beerHtml;
}

prevPage.addEventListener('click', () => {
	page--;
	getBeers();
} )
nextPage.addEventListener('click', () => {
	page++;
	getBeers();
} )

//initial get
getBeers();
