const API_KEY = "2080de39-8ab0-4399-ba2c-cfd65faa4508";
const BASE_URL = "https://holidayapi.com/v1";
const DEFAULT_YEAR = "2021";
const DEFAULT_DAY = "";
const DEFAULT_MONTH = "";
const DEFAULT_COUNTRY_CODE = "VN";
const DEFAULT_LANGUAGE = "en";
const SEARCH_VALUE_MIN_LENGTH = 5;

// Spinner
const spinner = document.getElementById("spinner");

// function to check search parameter is valid
const checkValidSearchParameter = (searchValue) => {
  return searchValue.trim().length >= SEARCH_VALUE_MIN_LENGTH ? true : false;
};

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
    console.log(`Error message: ${error.message}`);
    return [];
  }
};

// getCountriesList().then((result) => console.log(result));

// function to get country data based on country code
const getCountryBasedOnCountryCode = async (countryCode) => {
  try {
    const response = await fetch(
      `${BASE_URL}/countries?pretty&key=${API_KEY}&country=${countryCode}`
    );

    if (response.ok) {
      const data = await response.json();
      const countries = data["countries"];
      return countries;
    }
  } catch (error) {
    console.log(`Error message: ${error.message}`);
    return [];
  }
};
// getCountryBasedOnCountryCode("VN").then((result) => console.log(result));

// function to get languages list from api
const getLanguagesList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/languages?pretty&key=${API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      const languages = data["languages"];
      return languages;
    }
  } catch (error) {
    console.log(`Error message: ${error.message}`);
    return [];
  }
};

// getLanguagesList().then((result) => console.log(result));

// query input
const inputSearchQuery = document.querySelector("#search-query");
const inputYearQuery = document.querySelector("#year-query");
const inputMonthQuery = document.querySelector("#month-query");
const inputDayQuery = document.querySelector("#day-query");
const inputCountryQuery = document.querySelector("#country-query");
const inputLanguageQuery = document.querySelector("#language-query");

let inputCountryQueryValue;
let inputSearchQueryValue;
let inputYearQueryValue;
let inputMonthQueryValue;
let inputDayQueryValue;
let inputLanguageQueryValue;

// function to get holidates list from api (default country is VN if empty)
const getHolidatesList = async () => {
  inputCountryQueryValue = inputCountryQuery.value.trim() || "";
  inputSearchQueryValue = inputSearchQuery.value.trim() || "";
  inputYearQueryValue = inputYearQuery.value.trim() || "";
  inputMonthQueryValue = inputMonthQuery.value.trim() || "";
  inputDayQueryValue = inputDayQuery.value.trim() || "";
  inputLanguageQueryValue = inputLanguageQuery.value.trim() || "";

  try {
    let queryParameters = "";

    if (inputYearQueryValue) {
      queryParameters += `&year=${inputYearQueryValue}`;
    } else {
      queryParameters += `&year=${DEFAULT_YEAR}`;
    }

    if (inputMonthQueryValue) {
      queryParameters += `&month=${inputMonthQueryValue}`;
    }

    if (inputDayQueryValue) {
      queryParameters += `&day=${inputDayQueryValue}`;
    }

    if (
      inputSearchQueryValue &&
      checkValidSearchParameter(inputSearchQueryValue)
    ) {
      if (inputCountryQueryValue) {
        queryParameters += `&search=${inputSearchQueryValue}&country=${inputCountryQueryValue}`;
      } else {
        queryParameters += `&search=${inputSearchQueryValue}`;
      }
    }

    if (
      !inputSearchQueryValue ||
      !checkValidSearchParameter(inputSearchQueryValue)
    ) {
      if (inputCountryQueryValue) {
        queryParameters += `&country=${inputCountryQueryValue}`;
      } else {
        queryParameters += `&country=${DEFAULT_COUNTRY_CODE}`;
      }
    }

    if (inputLanguageQueryValue) {
      queryParameters += `&language=${inputLanguageQueryValue}`;
    } else {
      queryParameters += `&language=${DEFAULT_LANGUAGE}`;
    }

    const url = `${BASE_URL}/holidays?pretty&key=${API_KEY}${queryParameters}`;
    console.log(`Url request is: ${url}`);
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const holidates = data["holidays"];
      return holidates;
    }
  } catch (error) {
    console.log(`Error message: ${error.message}`);
    return [];
  }
};

// getHolidatesList("ZW").then((result) => console.log(result));

// countries
const countriesListButton = document.querySelector("#countries-list-btn");
const countriesList = document.querySelector("#countries-list");
const ulCountriesList = countriesList.children[2]; // get ul which is children of div countries-list

// languages
const languagesListButton = document.querySelector("#languages-list-btn");
const languagesList = document.querySelector("#languages-list");
const ulLanguagesList = languagesList.children[2]; // get ul which is children of div languages-list

// holidates
const holidaysButton = document.querySelector("#holidays-btn");
const holidatesList = document.querySelector("#holidays-list");
const ulHolidatesList = holidatesList.children[1]; // get ul which is children of div holidays-list
const h3HolidatesList = holidatesList.children[0]; // get h3 which is children of div holidays-list

let countriesListArray = [];
// function is used to render country list into ui
const renderCountries = async () => {
  try {
    // loading spinner
    spinner.removeAttribute("hidden");

    // fetch all the countries by using function getCountriesList
    countriesListArray = await getCountriesList();

    // remove spinner
    spinner.setAttribute("hidden", "");

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

let languagesListArray = [];
// function is used to render language list into ui
const renderLanguages = async () => {
  try {
    // loading spinner
    spinner.removeAttribute("hidden");

    // fetch all languages by using function getLanguagesList
    languagesListArray = await getLanguagesList();

    // remove spinner
    spinner.setAttribute("hidden", "");

    if (!languagesListArray.length) {
      console.log("Cannot get languages list from API.");
      return;
    }

    // remove all samples from ul
    ulLanguagesList.innerHTML = "";

    languagesListArray.forEach((language, index) => {
      liElement = document.createElement("li");
      liElement.innerHTML = `<div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${language.name}</div>
        <div class="li-text">Code: ${language.code}</div>
      </div>`;

      ulLanguagesList.appendChild(liElement);
    });
  } catch (error) {
    console.log(`Error message: ${error}`);
  }
};

let holidatesListArray = [];
// function to render holidates list into ui
const renderHolidates = async () => {
  try {
    // loading spinner
    spinner.removeAttribute("hidden");

    // fetch all holidates list by using function getHolidatesList
    holidatesListArray = await getHolidatesList();

    // remove spinner
    spinner.setAttribute("hidden", "");

    if (!holidatesListArray.length) {
      console.log("No Holidates Found.");
      return;
    }

    // remove all samples from ul
    ulHolidatesList.innerHTML = "";

    holidatesListArray.forEach((holiday, index) => {
      liElement = document.createElement("li");
      liElement.innerHTML = `<div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${holiday.name}</div>
        <div class="li-text">${holiday.weekday.date.name} - ${
        holiday.date
      }</div>
      </div>`;

      ulHolidatesList.appendChild(liElement);
    });
  } catch (error) {
    console.log(`Error message: ${error}`);
  }
};

let countryName = "";
// function to update country name when user click render holiday
const updateCountryName = async (countryCode = DEFAULT_COUNTRY_CODE) => {
  try {
    let countriesArray = await getCountryBasedOnCountryCode(countryCode);
    if (!countriesArray.length) {
      console.log("No Country Found.");
      return "";
    }

    countryName = countriesArray[0].name;
    if (countryName) {
      // reset h3 text content
      h3HolidatesList.textContent = `Holidays of ${countryName}`;
    }
  } catch (error) {
    console.log(`Error message: ${error}`);
  }
};

// add event listener when user click on 'Render Countries List'
countriesListButton.addEventListener("click", () => {
  renderCountries();
});

// add event listener when user click on 'Render Countries List'
languagesListButton.addEventListener("click", () => {
  renderLanguages();
});

// add event listener when user click on 'Render Holidays'
holidaysButton.addEventListener("click", () => {
  // todo todo todo todo todo todo
  renderHolidates();

  inputCountryQueryValue = inputCountryQuery.value.trim() || "";
  inputSearchQueryValue = inputSearchQuery.value.trim() || "";

  if (
    inputSearchQueryValue &&
    checkValidSearchParameter(inputSearchQueryValue)
  ) {
    if (inputCountryQueryValue) {
      updateCountryName(inputCountryQueryValue);
    } else {
      h3HolidatesList.textContent = `Holidays of all countries`;
    }
  }

  if (
    !inputSearchQueryValue ||
    !checkValidSearchParameter(inputSearchQueryValue)
  ) {
    if (inputCountryQueryValue) {
      updateCountryName(inputCountryQueryValue);
    } else {
      updateCountryName();
    }
  }
});
