fetch("https://api.checkwx.com/metar/KLYH/decoded", {
  method: "GET",
  headers: {
    "X-API-KEY": "a1b94787f5844437bca31238d5",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    success(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function success(response) {
  if (response.results > 0) {
    var metar = response.data[0];

    console.log(metar);

    document.getElementById("icao").innerText =
      "UAS Weather for " + metar.icao + " ---- " + metar.raw_text;
    document.getElementById("name").innerText = metar.station.name;

    if (metar.temperature) {
      document.getElementById("f").innerText =
        metar.temperature.fahrenheit + "\u00b0F";
    }

    if (metar.wind) {
      document.getElementById("mph").innerText = metar.wind.speed_mph + " mph";
      direction(metar.wind.degrees);
    }

    if (metar.visibility) {
      document.getElementById("meters").innerText =
        metar.visibility.meters + " meters";
    }

    if (metar.clouds) {
      document.getElementById("cover").innerText = metar.clouds[0].text;
    }

    if (metar.barometer) {
      document.getElementById("pressure").innerText =
        metar.barometer.hpa + " hPa";
    }

    if (metar.dewpoint) {
      document.getElementById("dew").innerText =
        metar.dewpoint.fahrenheit + "\u00b0F";
    }

    if (metar.humidity) {
      document.getElementById("humid").innerText = metar.humidity.percent + "%";
    }

    if (metar.observed) {
      document.getElementById("time").innerText = metar.observed;
    }
  } else {
    document.getElementById("raw").innerText = "No results returned from API";
  }
}

// This will get the direction based on the degrees taken from the fetch
function direction(d) {
  let e = document.getElementById("degree");

  // Design choice here = bearing is cardinal when degree is within 10 degrees on both sides
  if (d <= 10 && d >= 350) {
    e.innerHTML = "N";
  } else if (d <= 79 && d >= 11) {
    e.innerHTML = "NE";
  } else if (d <= 100 && d >= 80) {
    e.innerHTML = "E";
  } else if (d <= 169 && d >= 111) {
    e.innerHTML = "SE";
  } else if (d <= 190 && d >= 170) {
    e.innerHTML = "S";
  } else if (d <= 259 && d >= 191) {
    e.innerHTML = "SW";
  } else if (d <= 280 && d >= 260) {
    e.innerHTML = "W";
  } else if (d <= 349 && d >= 281) {
    e.innerHTML = "NW";
  }
}
