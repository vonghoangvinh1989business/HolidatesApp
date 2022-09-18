const API_KEY = "2080de39-8ab0-4399-ba2c-cfd65faa4508";
const BASE_URL = "https://holidayapi.com/v1";

// function to get countries list from api
const getCountriesList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/countries?pretty&key=${API_KEY}`);

    if (response.ok) {
      const data = await response.json();
      const countries = data["countries"];
      return countries;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getCountriesList().then((result) => console.log(result));

const countriesListButton = document.querySelector("#countries-list-btn");
const countriesList = document.querySelector("#countries-list");
const ulCountriesList = countriesList.children[2]; // get ul which is children of div countries-list

let countriesListArray = [];
// function is used to render country list into ui
const renderCountries = async () => {
  try {
    // fetch all the countries by using function getCountriesList
    const countriesListArray = await getCountriesList();
    if (!countriesListArray.length) {
      console.log("Cannot get countries list from API.");
      return;
    }

    // remove all samples from ul
    ulCountriesList.innerHTML = "";

    countriesListArray.forEach((country, index) => {
      liElement = document.createElement("li");
      liElement.innerHTML = `<div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${country.name}</div>
        <div class="li-text">Code: ${country.code}</div>
      </div>`;
      ulCountriesList.appendChild(liElement);
    });
  } catch (error) {
    console.log(`Error message: ${error}`);
  }
};

// add event when user click on 'Render Countries List'
countriesListButton.addEventListener("click", () => {
  renderCountries();
});
