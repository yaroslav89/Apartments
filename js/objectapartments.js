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
/*-----------------------------------Creat Class Apartment------------------------------*/
function Apartment(jsonurl) {
    this.url = jsonurl;
}
/*-----------------------------------function to display apartmnets from json file---------------*/
Apartment.prototype.show = function() {
    var output = $(".list");
    $.getJSON(this.url, function(data) {
        $.each(data.apartments, function(i, apartment) {
            output.append("<div class=col-md-4 col-lg-4 col-xs-4><img src=" + apartment.image + " width=300 height=200><h4>" + apartment.text + "</h4><button class=id onclick=apartment.addFavourite("+apartment.id+")>Add to favourites</button><p>Price:" + apartment.price + "</p>");
        });
    });
}
/*----------------------------------function add apartmtents to favourites------------------------*/
Apartment.prototype.addFavourite = function(id_val) {
    var index = id_val;
    var favObject;
    var array = [];
    /*-------------Check if Local Storage array exist---------*/
        if (localStorage.array == undefined) {  
            $.getJSON(this.url, function(data) {
                $.each(data, function(i, apartment) {
                    favObject = apartment[index - 1];
                    array.push(favObject);
                    localStorage.array = JSON.stringify(array);
                });
            });
            alert("Apartment added");
        } 
        else {
            /*----Check if apartment already exist in favourites--*/
            if (this.storage().indexOf(Number(index)) >= 0) { 
                alert("Apartment already exist in favourites");
            } 
            else {
                /*-------If local storage array exist, get this array and put new apartment-----*/
                $.getJSON(this.url, function(data) {
                    $.each(data, function(i, apartment) {
                        favObject = (apartment[index - 1]);
                        array = JSON.parse(localStorage.array);
                        array.push(favObject);
                        localStorage.array = JSON.stringify(array);
                    });
                });
                alert("Apartment added");
            }
        }
}
/*------------------Get Indexes of local storage array if this array exists-----------*/
Apartment.prototype.storage = function() {
    var array2 = [];
    if (localStorage.array !== undefined) {
        var local = JSON.parse(localStorage.array);
        for (var i = 0; i < local.length; i++) {
            array2.push(local[i].id);
        }
        return array2;
    }
}
/*-------------------------Show favourite apartments---------------------------*/
Apartment.prototype.showFavourite = function() {
    var outputF = $(".list2");
    if (localStorage.array !== undefined) {
        var item = JSON.parse(localStorage.array);
        $.each(item, function(i, object) {
            outputF.append("<div class=col-md-4 col-lg-4><img src=" + object.image + " width=300 height=200><h4>" + object.text + "</h4><p>Price:" + object.price + "</p>");
        });
    } else {
        outputF.html("<p class=info>No Favourites</p>");
    }
}
/*----------------------Creating apartment object---------------------*/
var apartment = new Apartment("js/json/apartments.json");
