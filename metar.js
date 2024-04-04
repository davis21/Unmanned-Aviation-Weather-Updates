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

    document.getElementById("icao").innerText = "ICAO: " + metar.icao;
    document.getElementById("observed").innerText = "METAR: " + metar.observed;
    document.getElementById("name").innerText = metar.station.name;

    if (metar.barometer) {
      document.getElementById("hg").innerText = metar.barometer.hg + " inHg";
      document.getElementById("hpa").innerText = metar.barometer.hpa + " hPa";
      document.getElementById("kpa").innerText = metar.barometer.kpa + " kPa";
      document.getElementById("mb").innerText = metar.barometer.mb + " mb";
    }

    if (metar.temperature) {
      document.getElementById("f").innerText =
        metar.temperature.fahrenheit + "\u00b0F";
      document.getElementById("c").innerText =
        metar.temperature.celsius + "\u00b0C";
    }

    if (metar.clouds) {
      document.getElementById("feet").innerText =
        metar.clouds[0].feet + " feet";
      document.getElementById("meter").innerText =
        metar.clouds[0].meters + " meters";
      document.getElementById("text").innerText = metar.clouds[0].text;
      document.getElementById("code").innerText = metar.clouds[0].code;
    }

    if (metar.wind) {
      document.getElementById("degree").innerText =
        metar.wind.degrees + " degrees";
      document.getElementById("mph").innerText = metar.wind.speed_mph + " mph";
      document.getElementById("kph").innerText = metar.wind.speed_kph + " kph";
      document.getElementById("kts").innerText = metar.wind.kts + " knots";
    }
  } else {
    document.getElementById("raw").innerText = "No results returned from API";
  }
}
