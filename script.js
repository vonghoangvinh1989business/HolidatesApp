const API_KEY = "2080de39-8ab0-4399-ba2c-cfd65faa4508";
const BASE_URL = "https://holidayapi.com/v1";
const DEFAULT_YEAR = "2021";
const DEFAULT_DAY = "";
const DEFAULT_MONTH = "";
const DEFAULT_COUNTRY_CODE = "VN";
const DEFAULT_LANGUAGE = "vi";
const DEFAULT_SEARCH = "";

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

// function to get holidates list from api (default country is VN if empty)
const getHolidatesList = async (
  countryCode,
  year,
  language,
  day,
  month,
  search
) => {
  try {
    let url = "";
    if (countryCode) {
      if (search && search.length >= 5) {
        url = `${BASE_URL}/holidays?pretty&key=${API_KEY}&country=${countryCode}&year=${year}&language=${language}&day=${day}&month=${month}&search=${search}`;
      } else {
        url = `${BASE_URL}/holidays?pretty&key=${API_KEY}&country=${countryCode}&year=${year}&language=${language}&day=${day}&month=${month}`;
      }
    } else {
      if (search && search.length >= 5) {
        url = `${BASE_URL}/holidays?pretty&key=${API_KEY}&year=${year}&language=${language}&day=${day}&month=${month}&search=${search}`;
      } else {
        url = `${BASE_URL}/holidays?pretty&key=${API_KEY}&year=${year}&language=${language}&day=${day}&month=${month}`;
      }
    }

    console.log(url);
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

// query input
const inputSearchQuery = document.querySelector("#search-query");
const inputYearQuery = document.querySelector("#year-query");
const inputMonthQuery = document.querySelector("#month-query");
const inputDayQuery = document.querySelector("#day-query");
const inputCountryQuery = document.querySelector("#country-query");
const inputLanguageQuery = document.querySelector("#language-query");

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
    // fetch all the countries by using function getCountriesList
    countriesListArray = await getCountriesList();
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
    // fetch all languages by using function getLanguagesList
    languagesListArray = await getLanguagesList();
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
const renderHolidates = async (
  countryCode,
  year = DEFAULT_YEAR,
  language = DEFAULT_LANGUAGE,
  day = DEFAULT_DAY,
  month = DEFAULT_MONTH,
  search = DEFAULT_SEARCH
) => {
  try {
    // fetch all holidates list by using function getHolidatesList
    holidatesListArray = await getHolidatesList(
      countryCode,
      year,
      language,
      day,
      month,
      search
    );
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
const updateCountryName = async (countryCode) => {
  try {
    let countriesArray = await getCountryBasedOnCountryCode(countryCode);
    if (!countriesArray.length) {
      console.log("No Country Found.");
      return "";
    }

    countryName = countriesArray[0].name;
    if (countryName) {
      // reset h3 text content
      h3HolidatesList.textContent = `Holidays of a ${countryName}`;
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
  let inputYearQueryValue = inputYearQuery.value.trim();
  let inputMonthQueryValue = inputMonthQuery.value.trim();
  let inputDayQueryValue = inputDayQuery.value.trim();
  let inputCountryQueryValue = inputCountryQuery.value.trim();
  let inputLanguageQueryValue = inputLanguageQuery.value.trim();
  let inputSearchQueryValue = inputSearchQuery.value.trim();

  console.log(inputSearchQueryValue);
  console.log(inputYearQueryValue);
  console.log(inputMonthQueryValue);
  console.log(inputDayQueryValue);
  console.log(inputCountryQueryValue);
  console.log(inputLanguageQueryValue);

  // If all **input boxes** are empty, render a list of holidays of `VietNam`
  if (
    !inputSearchQueryValue &&
    !inputYearQueryValue &&
    !inputMonthQueryValue &&
    !inputDayQueryValue &&
    !inputCountryQueryValue &&
    !inputLanguageQueryValue
  ) {
    console.log("case 1");
    renderHolidates(DEFAULT_COUNTRY_CODE);
    updateCountryName(DEFAULT_COUNTRY_CODE);
  }

  // If ONLY **Country box** is input with correct _country code_, render a list of holidays of that country for the year `2021`
  // The title `Holiday of a Country` must be changed to the actual country requested. eg
  if (
    inputCountryQueryValue &&
    !inputSearchQueryValue &&
    !inputYearQueryValue &&
    !inputMonthQueryValue &&
    !inputDayQueryValue &&
    !inputLanguageQueryValue
  ) {
    console.log("case 2");
    renderHolidates(inputCountryQueryValue);
    updateCountryName(inputCountryQueryValue);
  }

  //   - When other inputs (Country, Languages) are present, the result is combined with all the queries.
  if (inputLanguageQueryValue && inputCountryQueryValue) {
    inputYearQueryValue = inputYearQueryValue || DEFAULT_YEAR;
    inputDayQueryValue = inputDayQueryValue || DEFAULT_DAY;
    inputMonthQueryValue = inputMonthQueryValue || DEFAULT_MONTH;
    inputSearchQueryValue = inputSearchQueryValue || DEFAULT_SEARCH;

    console.log("case 3");
    renderHolidates(
      inputCountryQueryValue,
      inputYearQueryValue,
      inputLanguageQueryValue,
      inputDayQueryValue,
      inputMonthQueryValue,
      inputSearchQueryValue
    );
    updateCountryName(inputCountryQueryValue);
  }

  // When adding `Day, Year, Month` then clicking the button, the user sees a list of holidays of the chosen country (default is Viet Nam) for that exact day.
  if (inputDayQueryValue && inputMonthQueryValue) {
    inputCountryQueryValue = inputCountryQueryValue || DEFAULT_COUNTRY_CODE;
    inputYearQueryValue = inputYearQueryValue || DEFAULT_YEAR;
    inputLanguageQueryValue = inputLanguageQueryValue || DEFAULT_LANGUAGE;
    inputSearchQueryValue = inputSearchQueryValue || DEFAULT_SEARCH;

    console.log("case 4");
    renderHolidates(
      inputCountryQueryValue,
      inputYearQueryValue,
      inputLanguageQueryValue,
      inputDayQueryValue,
      inputMonthQueryValue,
      inputSearchQueryValue
    );
    updateCountryName(inputCountryQueryValue);
  }

  // testing testing testing testing
  if (
    inputSearchQueryValue &&
    inputSearchQueryValue.length >= 5 &&
    !inputCountryQueryValue
  ) {
    inputYearQueryValue = inputYearQueryValue || DEFAULT_YEAR;
    inputDayQueryValue = inputDayQueryValue || DEFAULT_DAY;
    inputMonthQueryValue = inputMonthQueryValue || DEFAULT_MONTH;

    console.log("case 5");
    renderHolidates(
      inputCountryQueryValue,
      inputYearQueryValue,
      inputLanguageQueryValue,
      inputDayQueryValue,
      inputMonthQueryValue,
      inputSearchQueryValue
    );
    updateCountryName("Accross Countries");
  }

  // todo todo todo todo todo todo todo todo todo todo todo todo
});
