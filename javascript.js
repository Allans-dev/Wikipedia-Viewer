$(document).ready(function(){
var formData = "";
//initiating search
function search (){
  formData = $("#form").val();
  formData = formData.replace(/ /g, "_");
  if (formData == ""){
    $("#display").append("<br /><span> *Please enter a search term </span>");
  }
  getWiki();
}
//pressing enter to initiate search
$(document).keypress(function(e){
  if (e.which == 13){
    $("#display").empty();
    search ();
  }
})
//clicking button to intitiate search
$("#search-btn").click(function (){
  $("#display").empty();
search ();
})
//using ajax to display search results
function getWiki (){
  //formatting search url
var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
+ formData + "&namespace=0&limit=10&formatversion=2&format=json";
//ajax request
$.ajax({
  type:"GET",
  url: url,
  dataType: "jsonp",
  success: function (data){
    noResults(data);
    results(data);
    header1();
  }
})
//header 1 animation
function header1(){
$("h1").animate({
  "margin-top": "2%",
  "margin-bottom": "1%",
}, 400);
}

// When the search returns no results the following function runs
function noResults(data){
if (data.query.searchinfo.totalhits == 0){
  $("<div id='error'><h4>Oops, there are no matches to your search</h4></n><span>To get a better result try:</span><ul><li>Checking spelling and punctuation.</li><li>Using a broader term to increase the range of results,</li><li>Or rephrase the term to give a more accurate result.</li></div>").appendTo("#display").fadeIn("slow");
}
}
//displaying search results
function results (data){
  for (var i=0; i<data.query.search.length; i++){
    var title = data.query.search[i].title;
    var snippet = data.query.search[i].snippet;
    var link = "https://en.wikipedia.org/wiki/" + title.replace(/ /g, "_");
    $("<div id='result'><a href=" + link + "><h2>" + title + "</h2><p>" + snippet + "..." + "</p></a></div>").appendTo("#display").animate({marginTop:"30px"},600);

}
}

}//end getWiki
})//end doc ready
