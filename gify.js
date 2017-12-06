    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    var topics = ["Gardening ", "Composting ", "Vermicomposting ", "Self Defense "]; 


    $.ajax(
    {
      url: queryURL,
      method: 'GET'
    }
    ).done(function(response) 
    {
    	var topicDiv = $("<div class='topic-info'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var rspnsOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          topicDiv.append(rspnsOne);

          // Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          var rspnsTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          topicDiv.append(rspnsTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var rspnsThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          topicDiv.append(rspnsThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          topicDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#topics-list").prepend(topicDiv);
                console.log(response);
        });

    
    function showButtons() {

        // Deleting the topic buttons prior to adding new topic buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#topics-list").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("topic");
          // Adding a data-attribute with a value of the topic at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the topic at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#topics-list").append(a);
        }
      }

        $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        topics.push(topic);

        // calling showButtons which handles the processing of our topic array
        showButtons();
      });

        showButtons();


       