/*global $*/
var slideIndex = 1;
var genres = ["scary","comedy","action"];
var randomPosters = [];
var favorites = [];
var currentUrl = "";

printPosters();
showSlides(slideIndex);
$(".slideshow-container").show();
$(".gallery").hide();
$(".favoriteGallery").hide();

// Click Handlers
$("#search-button").click(function(){
    $('.gallery').empty();
    $(".slideshow-container").hide();
    $(".gallery").show();
    $(".favoriteGallery").hide();
    $(".dots").hide();
    
    var searchTerm = $('#search-term').val();
    var url ="https://www.omdbapi.com/?apikey=8e9ded79&y=2016&s="+searchTerm;
    
    $.ajax({
        url: url,
        method: "GET",
        success: function(response){
            for (var i = 0; i < response.Search.length; i++) {
                var poster = response.Search[i].Poster;
                // check if Url is correct
                if (poster.startsWith("http")){
                    poster = poster;
                }
                else {
                    poster = "https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image.jpg";
                }
                //appending items
                $('.gallery').append(
                  '<div class="container">\
                        <div class="image">\
                            <img class="movieList" src='+ poster +' onclick="onClick(this)">\
                        </div>\
                        <div class="content">\
                            <p>Title:'+response.Search[i].Title+'</p>\
                            <p>Year Released:'+response.Search[i].Year+'</p>\
                            <div class="rating">\
                               <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>\
                            </div>\
                            <h4>Give Your Review On ' +response.Search[i].Title+ '</h4>\
                            <textarea class="reviewBox"></textarea>\
                        </div>\
                    </div>'
                );
            }
        },
    });
  
});
// Favorite Button
$("#Favorites").click(function(){
    $('.favoriteGallery').empty();
    $(".gallery").hide();
    $(".dots").hide();
    $(".favoriteGallery").show();
    for (var i = 0; i < favorites.length; i++) {
        $('.favoriteGallery').append(
            '<div class="favoriteImg">\
                <img class="favImg" src='+ favorites[i] +'>\
             </div>'
        );
    }
});
// Functions
function onClick(element) {
    alert("This Movie Was Added to Your Favorites");
    currentUrl = element.src;
    favorites.push(currentUrl);
}
function dropDownMenu(idName) {
   document.getElementById(idName).classList.toggle("show");
    console.log(idName);
}
function printPosters(){
    for ( var i = 0; i < genres.length; i++) {
        retriveRandomPosters(genres[i]);
    }
}
function retriveRandomPosters(searchTerm){
    var url ="https://www.omdbapi.com/?apikey=8e9ded79&y=2016&s="+searchTerm;
    var randomNum = 1;
    
    $.ajax({
    url: url,
    method: "GET",
    success: function(response){
        randomNum = Math.floor(Math.random() * response.Search.length);
        var poster = response.Search[randomNum].Poster;
        
        // Valid Url Check        
        if (poster.startsWith("http")){
            poster=poster;
        }
        else {
            randomNum = Math.floor(Math.random() * response.Search.length);
            poster = response.Search[randomNum].Poster;
        }
        
        // Setting the Poster
        randomPosters.push(poster);
        var posterOne = document.getElementById('posterOne');
        posterOne.src = randomPosters[0];
        var posterTwo = document.getElementById('posterTwo');
        posterTwo.src = randomPosters[1];
        var posterThree = document.getElementById('posterThree');
        posterThree.src = randomPosters[2];
        
    },
    });
}
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
      slideIndex = 1;
    }    
  if (n < 1) {
      slideIndex = slides.length;
      }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
function reset(){
    printPosters();
    showSlides(slideIndex);
    $(".slideshow-container").show();
    $(".gallery").hide();
    $(".dots").show();
    $(".favoriteGallery").hide();
}
function swapstylesheet(sheet){
    document.getElementById("pagestyle").setAttribute("href",sheet);
}
function favoritedrpdwn(){
    $('.favoriteGallery').empty();
    $(".gallery").hide();
    $(".dots").hide();
    $(".favoriteGallery").show();
    for (var i = 0; i < favorites.length; i++) {
        $('.favoriteGallery').append(
            '<div class="favoriteImg">\
                <img class="favImg" src='+ favorites[i] +'>\
             </div>'
        );
    }
}