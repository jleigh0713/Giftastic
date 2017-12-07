
	/*$("button, #add-topic").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var topic = $(this).attr("data-topic");*/
$(document).ready(function()
{

  var topics = ["Gardening", "Composting", "Vermicomposting", "Self-defense"];

function showGiphys()
  {    
    //$("button").on("click", function()
    //{
    var topic = $(this).attr("topic-name");
      // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=5";// Performing an AJAX request with the queryURL
    
    $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) 
        {
          console.log(queryURL);

          console.log(response);

          $("#gifs-appear-here").empty();
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) 
          {
            // Creating and storing a div tag
            var topicDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var topicImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            topicDiv.append(p);
            topicDiv.append(topicImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(topicDiv);
          }
          });
        //});
      };



  function showButtons()
  {
    $("#topics-list").empty();

    for (var i = 0; i < topics.length; i++) 
    {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var topicBtn = $("<button>");
            // Adding a class of movie to our button
      topicBtn.addClass("topic");
            // Adding a data-attribute
      topicBtn.attr("topic-name", topics[i]);
            // Providing the initial button text
      topicBtn.text(topics[i]);
            // Adding the button to the HTML
      $("#topics-list").append(topicBtn);
    }
  }

  
  
    $("#add-topic").on("click", function(event)
    {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
            //event.preventDefault();
      event.preventDefault();
        // This line grabs the input from the textbox
      var newtopic = $("#topic-input").val().trim();

        // Adding the movie from the textbox to our array
      topics.push(newtopic);
      $("#topic-input").val("");
        // Calling renderButtons which handles the processing of our movie array
      showButtons();
    });
  
      $(document).on("click", ".topic", showGiphys);
      showButtons();
      
      
  })
