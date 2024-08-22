"use strict";

function buildCountryCard(res) {
  const flag = res.flags.png;
  const map = res.maps.googleMaps;
  const country = res.name.common;
  const population = res.population;
  const region = res.region;
  const languages = Object.values(res.languages);
  let lang = "";

  languages.forEach((item) => (lang += item + " "));

  document.querySelector(
    "#cardId"
  ).innerHTML = ` <div class="card card-div" style="width: 20rem">
          <img src="${flag}" class="card-img-top img-div" alt="flag" />
          <div class="card-body">
            <h5 class="card-title">${country}</h5>
            <p class="card-text">
              Population: ${population}<br>
              Region: ${region}<br>
              languages: ${lang}
              </p>
          </div>
  </div>`;
}

async function buildBorderCards(countryShortName) {
  const text = `https://restcountries.com/v3.1/name/${countryShortName}`;
  console.log(text);

  try {
    let response = await fetch(text);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    let data = await response.json();
    const countryData = data[0];
    console.log(countryData);
    const flag = countryData.flags.png;
    const country = countryData.name.common;
    console.log(flag, country);

    document.querySelector(
      "#boarderCountries"
    ).innerHTML += ` <div class="card " style="width: 20rem">
        <img src="${flag}" class="card-img-top img-div img-div1" alt="flag" />
        <div class="card-body">
          <h5 class="card-title">${country}</h5>
          <p class="card-text">
             </p>
        </div>
        </div>`;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function getCountry() {
  try {
    const city = document.querySelector("#inputText").value;
    let getText = `https://restcountries.com/v3.1/capital/${city}`;
    console.log(getText);
    let result = await axios.get(getText);

    let res;
    if (city == "jerusalem") res = result.data[1];
    else res = result.data[0];

    buildCountryCard(res);

    getText = `https://restcountries.com/v3.1/name/${res.name.common}`;
    console.log(getText);

    try {
      let response = await fetch(getText);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      let data = await response.json();
      const countryData = data[0];
      console.log(countryData.borders); // This will give you an array of neighboring country codes

      document.querySelector(
        "#borders-country-header"
      ).innerHTML = `<h2>Neighboring Countries</h2>`;
      document.querySelector("#border").style.visibility = "visible";
      document.querySelector("#boarderCountries").innerHTML = "";

      for (let i = 0; i < countryData.borders.length; i++) {
        buildBorderCards(countryData.borders[i]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  } catch (error) {
    console.log(error);
  }
}



