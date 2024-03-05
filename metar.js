const apiKey = "a1b94787f5844437bca31238d5";
const mapKey = "5d1a786878854d19959555d7e7749595";
const apiUrl = "https://api.checkwx.com/metar/KLYH/decoded";

var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    success(JSON.parse(this.responseText));
  }
});

xhr.open("GET", apiUrl);
xhr.setRequestHeader("X-API-KEY", apiKey);
xhr.send();

function success(response) {
  if (response.results > 0) {
    // We only requested one METAR
    // If you request more than one, the data array would need to be in a loop
    var metar = response.data[0];

    document.getElementById("icao").innerText = metar.icao + " Weather";
    document.getElementById("name").innerText = metar.station.name;
    document.getElementById("raw").innerText = metar.raw_text;

    if (metar.station) {
      document.getElementById(
        "coord_block"
      ).innerHTML = `${metar.station.geometry.coordinates[0]}, ${metar.station.geometry.coordinates[1]}`;
    }

    if (metar.visibility) {
      document.getElementById("visibility_miles").innerText =
        metar.visibility.miles;
      document.getElementById("visibility_block").classList.remove("d-none");
    }

    if (metar.wind) {
      document.getElementById("wind_direction").innerText = metar.wind.degrees;
      document.getElementById("wind_speed").innerText = metar.wind.speed_kts;
      document.getElementById("wind_block").classList.remove("d-none");
    }

    if (metar.clouds[0]) {
      document.getElementById("cloud_block").classList.remove("d-none");
      metar.clouds.forEach((cloud) => {
        var el = document.createElement("li");
        el.innerHTML =
          cloud.text + " at " + cloud.meter + " <small> feet AGL</small>";
        document.getElementById("cloud_list").appendChild(el);
      });
    }
  } else {
    document.getElementById("raw").innerText = "No results returned from API";
  }
}

var xhr1 = new XMLHttpRequest();
