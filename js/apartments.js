$(document).ready(function() {

    //Show username
    $(".log").click(function() {
        sessionStorage.name = $(".form-control").val();
    });
    var name = sessionStorage.name;
    $(".userName").text(name);
    //clear favourites
    $(".btn-warning").click(function() {
        localStorage.clear();
        $(".list2").html("");
    });
    //log out 
    $(".btn-danger").click(function() {
        sessionStorage.clear();
        localStorage.clear();
    });
});

var array = [];
var favObject;
// get apartments from json
function displayApartments() {
    var output = $(".list");
    $.getJSON("js/json/apartments.json", function(data) {
        $.each(data.apartments, function(i, apartment) {
            output.append("<div class=col-md-4 col-lg-4><img src=" + apartment.image + " width=300 height=200><h4>" + apartment.text + "</h4><input class=id type=radio name=radio value=" + apartment.id + "><p>Price:" + apartment.price + "</p>");
        });
    });
}
//add apartments to favourites
function addtoFavourites() {
    var index = $(".id:checked").val();
    if (index !== undefined) {
        //checking if apartments array already exists
        if (localStorage.array == undefined) {
            $.getJSON("js/json/apartments.json", function(data) {
                $.each(data, function(i, apartment) {
                    favObject = apartment[index - 1];
                    array.push(favObject);
                    localStorage.array = JSON.stringify(array);
                });
            });
        } else {
            $.getJSON("js/json/apartments.json", function(data) {
                $.each(data, function(i, apartment) {
                    favObject = (apartment[index - 1]);
                    array = JSON.parse(localStorage.array);
                    array.push(favObject);
                    localStorage.array = JSON.stringify(array);
                });
            });
        }
        alert("Apartment added successfully")
    } else {
        alert("please choose apartment");
    }
}

function displayFavourites() {
    var outputF = $(".list2");
    if (localStorage.array !== undefined) {
        var item = JSON.parse(localStorage.array);
        $.each(item, function(i, object) {
            outputF.append("<div class=col-md-4 col-lg-4><img src=" + object.image + " width=300 height=200><h4>" + object.text + "</h4><p>Price:" + object.price + "</p>");
        });
    } else {
        outputF.html("<h4>No Favourites</h4>");
    }
}