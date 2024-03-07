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

    document.getElementById("icao").innerText = "ICAO: " + metar.icao;
    document.getElementById("name").innerText = metar.station.name;

    if (metar.barometer) {
      document.getElementById("hg").innerText = metar.barometer.hg + " inHg";
      document.getElementById("hpa").innerText = metar.barometer.hpa + " hPa";
      document.getElementById("kpa").innerText = metar.barometer.kpa + " kPa";
      document.getElementById("mb").innerText = metar.barometer.mb + " mb";
    }

    /*if (metar.visibility) {
      document.getElementById("visibility_miles").innerText =
        metar.visibility.miles;
      document.getElementById("visibility_block").classList.remove("d-none");
    }

    if (metar.clouds[0]) {
      document.getElementById("cloud_block").classList.remove("d-none");
      metar.clouds.forEach((cloud) => {
        var el = document.createElement("li");
        el.innerHTML =
          cloud.text +
          " at " +
          cloud.base_feet_agl +
          " <small> feet AGL</small>";
        document.getElementById("cloud_list").appendChild(el);
      });
    }

    if (metar.conditions[0]) {
      document.getElementById("cond_block").classList.remove("d-none");
      metar.conditions.forEach((cond) => {
        var el = document.createElement("li");
        el.innerHTML = cond.text;
        document.getElementById("cond_list").appendChild(el);
      });
    }*/
  } else {
    document.getElementById("raw").innerText = "No results returned from API";
  }
}
