"use strict";

async function getCountry() {
  try {
    const city = document.querySelector("#inputText").value;
    const getText = `https://restcountries.com/v3.1/capital/${city}`;

    let result = await axios.get(getText);

    let res;
    if (city == "jerusalem") res = result.data[1];
    else res = result.data[0];

    const flag = res.flags.png;
    const map = res.maps.googleMaps;
    const country = res.name.common;
    const population = res.population;
    const region = res.region;
    console.log(region);
    const languages = Object.values(res.languages);
    let lang = "";
    languages.forEach((item) => (lang += item + " "));

    document.querySelector(
      "#cardId"
    ).innerHTML = ` <div class="card" style="width: 20rem">
          <img src="${flag}" class="card-img-top" alt="flag" />
          <div class="card-body">
            <h5 class="card-title">${country}</h5>
            <p class="card-text">
              Population: ${population}<br>
              Region: ${region}<br>
              languages: ${lang}
            </p>
          </div>
             

    
        </div>`;
  } catch (error) {
    console.log(error);
  }
}
