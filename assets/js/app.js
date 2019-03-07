// array of preset athletes for buttons
var topics = [
    "michael jordan",
    "sammy sosa",
    "kris bryant",
    "kobe bryant",
    "tiger woods",
    "alex rodriguez",
    "lebron james",
    "cristiano ronaldo",
    "roger federer",
    "neymar",
    "tom brady",
    "serena williams",
    "usain bolt",
    "maria sharapova",
    "jay cutler",
    "ronda rousey",
    "conor mcgregor"
];

// create buttons for the individual strings in the topics array
for(var i = 0; i < topics.length; i++) {
    var button = $("<button>").text(topics[i]);
    button.attr("data-athlete", topics[i]);
    button.addClass("athlete-button");
    $("#button-group").append(button);
}

//creat new button and append searched string 
$("#search-button").on("click", function(event) {
    event.preventDefault();
    var alreadyExist = false;
    if(topics.indexOf($("#new-athlete-input").val()) !== -1) {
        alreadyExist = true;
    }
    if($("#new-athlete-input").val() !== "" && alreadyExist === false) {
        var newAthlete = $("#new-athlete-input").val().toLowerCase();
        topics.push(newAthlete);
        var button = $("<button>").text(newAthlete);
        button.attr("data-athlete", newAthlete);
        button.addClass("athlete-button");
        $("#button-group").append(button)
    }
    $("new-athlete-input").val("");
});

// make api call
$(document).on("click", ".athlete-button", function(){
    var athlete = $(this).attr("data-athlete");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        athlete + "&api_key=28mfqyZoLX3hVmcIjPOEhani63EpDYLn&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            console.log(results);

        //creat section for results gif
        var resultsSection = $("<section class='results-container'>");
        
            // prepend loop of results into a single div container
            for(var i = 0; i < results.length; i++) {
                var singleResult = $("<div class='result-container'>");

                var rating = results[i].rating;

                //creat rating paragraph
                var ratingText = $("<p>").text("Rating: " + rating);
                
                var athleteImage = $("<img class='result'>");
                athleteImage.attr("src", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-state", "still");
                athleteImage.attr("data-still", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-animate", results[i].images.fixed_height.url);

                singleResult.prepend(athleteImage);
                singleResult.prepend(ratingText);

                resultsSection.prepend(singleResult);
            }

            $("#athlete-group").prepend(resultsSection);
        });
});

//creat click still and animate function
$(document).on("click", ".result", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})