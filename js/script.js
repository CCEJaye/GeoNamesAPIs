$(window).on("load", () => {
    if ($("#preloader").length) {
        $("#preloader").delay(100).fadeOut("slow", () => {
            $(this).remove();
        });
    }
});

$("#form").on("input", () => {
    $("#latVal").html(lat.value + ' &deg');
    $("#lngVal").html(lng.value + ' &deg');
    $("#radiusVal").html(radius.value + ' km');
});

$("#submit1").on("click", () => {
    $.ajax({
        url: "php/getCountryCode.php",
        type: "POST",
        dataType: "json",
        data: getData(),
        success: (result) => {
            console.log(result);
            if (result.status.name === "ok") {
                const res = result["data"];
                if (!res["countryCode"]) {
                    $("#results").html("No country codes found. Try increasing the buffer radius.")
                    .addClass("text-warning");
                } else {
                    $("#results").html(
                        "Country Code: " + res["countryCode"] + "<br>"
                        + "Country: " + res["countryName"] + "<br>"
                        + "Languages: " + res["languages"])
                    .removeClass("text-warning");
                }
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown);
        }
    })
});

$("#submit2").on("click", () => {
    $.ajax({
        url: "php/getOcean.php",
        type: "POST",
        dataType: "json",
        data: getData(),
        success: (result) => {
            console.log(result);
            if (result.status.name === "ok") {
                const res = result["data"]["ocean"];
                if (!res) {
                    $("#results").html("No oceans found. Try increasing the buffer radius.")
                    .addClass("text-warning");
                } else {
                    $("#results").html(
                        "Ocean Name: " + res["name"] + "<br>"
                        + "Distance From Position: " + res["distance"])
                    .removeClass("text-warning");
                }
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown);
        }
    })
});

$("#submit3").on("click", () => {
    $.ajax({
        url: "php/getTimeZone.php",
        type: "POST",
        dataType: "json",
        data: getData(),
        success: (result) => {
            console.log(result);
            if (result.status.name === "ok") {
                const res = result["data"];
                if (!res["timezoneId"]) {
                    $("#results").html("No time zone found because it is not within a country border. Try increasing the buffer radius.")
                    .addClass("text-warning");
                } else {
                    $("#results").html(
                        "Country: " + res["countryName"] + "<br>"
                        + "Time Zone: " + res["timezoneId"] + " " + res["rawOffset"] + " UTC<br>"
                        + "Sunrise: " + res["sunrise"] + "<br>"
                        + "Sunset: " + res["sunset"] + "<br>"
                        + "Current Time: " + res["time"])
                    .removeClass("text-warning");
                }
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown);
        }
    })
});

const getData = () => {
    return {
        lang: $("#lang").val(),
        lat: $("#lat").val(),
        lng: $("#lng").val(),
        radius: $("#radius").val()
    };
};