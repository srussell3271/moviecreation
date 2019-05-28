/* global $ */
var slideIndex = 1;
var genres = ["scary","comedy","action"];
var randomPosters = [];
var favorites = [];
var currentUrl = "";

printPosters();
showSlides(slideIndex);

// click Handlers
$("#search-button").click(function(){
    var searchTerm = $('#search-term').val();
    var url ="https://www.omdbapi.com/?apikey=8e9ded79&y=2016&s="+searchTerm;
    
    $('.movieList').empty();
    $(".slideshow-container").hide();
    $(".dots").hide();
    
    $.ajax({
       url: url,
       method: "GET",
       success: function(response){
    
            for (var i = 0; i < response.Search.length; i++) {
                var poster = response.Search[i].Poster;
                
                if (poster.startsWith("http")){
                    poster = poster;
                }
                else {
                    poster = "https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image.jpg";
                }
                //   appending items
                $('.movieList').append(
                  '<div class="container">\
                        <div class="image">\
                            <img src='+ poster +'>\
                        </div>\
                        <div class="content">\
                            <p>Title:'+response.Search[i].Title+'</p>\
                            <p>Year Released:'+response.Search[i].Year+'</p>\
                        </div>\
                    </div>'
                );
            }
        },
    });
});
// Home Button
$("#home").click(function(){
    showSlides(slideIndex);
    printPosters();
    $('.movieList').empty();
    $(".slideshow-container").show();
    $(".dots").show();
    
});

// Functions
function printPosters(){
    for ( var i = 0; i < genres.length; i++) {
        retriveRandomPosters(genres[i]);
    }
}

function retriveRandomPosters(searchTerm){
    var url ="https://www.omdbapi.com/?apikey=8e9ded79&y=2016&s="+searchTerm;
    var randomNum = 0;
    
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