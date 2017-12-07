//makign sure nothing takes place until after the DOM is loaded
$(document).ready(function()
{
  //array of topics
  var topics = ["Gardening", "Composting", "Vermicomposting", "Wine", "Animals", "Hockey", "Beekeeping"];

 //naming and defining the funtion to show the gif images
  function showGiphys()
  {    
    //giving topic variable attribute of topic-name
    var topic = $(this).attr("topic-name");
    
      // Constructing a queryURL using the topic name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";// Performing an AJAX request with the queryURL
    
    //calling the AJAX request
    $.ajax({
      url: queryURL,
      method: "GET"
      })
        // promise that nothing happens until after data comes back from the request
      .done(function(response) 
      {
        //so we dont get repeating gifs this empties what was previoiusly in this div section that holds the gif images
        $("#gifs-appear-here").empty();

          // storing the data from the AJAX request in the results variable
        var results = response.data;

          // Looping through each result item
        for (var i = 0; i < results.length; i++) 
        {
            // Creating and storing a div tag
          var topicDiv = $("<div>");
           
           //adding a class labeled topicGif to the topic div 
          topicDiv.addClass("topicGif");

            // Creating a paragraph tag with the item's rating from the topic results
          var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
          var topicImage = $("<img>");

            // Setting the src attribute of the image to the still url from the results
          topicImage.attr("src", results[i].images.fixed_height_still.url);

           // setting the data-still attribute to the still url from the results
          topicImage.attr("data-still", results[i].images.fixed_height_still.url);

            //setting the data-animate attribute to the active url from the topic results
          topicImage.attr("data-animate", results[i].images.fixed_height.url);

             // setting the data state attribute to still
          topicImage.attr("data-state", "still"); 

            // Appending the paragraph and image tag to the topicDiv
          topicDiv.append(p);
          topicDiv.append(topicImage);

            // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(topicDiv);
        }
      });
  }
  

 //naming and defining the funtion to show the topic buttons
  function showButtons()
  {
    //emptying out the topic buttons or they would repeat 
    $("#topic-buttons").empty();

     // looping through the array
    for (var i = 0; i < topics.length; i++) 
    {
      // This dynamically generates buttons for each topic in the array
      // This code $("<button>") is all jQuery needs to create the start and end tag (<button></button>) and it adds the button
      var topicBtn = $("<button>");

      // Adding a bootstrap button class to our button to make it look nice
      topicBtn.addClass("btn btn-success");

            // Adding a data-attribute of topic name for each topic in the array
      topicBtn.attr("topic-name", topics[i]);

      // Providing the text of the topic to the button
      topicBtn.text(topics[i]);

      // Adding the button to the HTML
      $("#topic-buttons").append(topicBtn);
    }
  }


  //naming and defining the function to add a new button when submitting a new topic through the form
  $("#add-topic").on("click", function(event)
  {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
            //event.preventDefault();
    event.preventDefault();

        // This line gets the input from the textbox
    var newtopic = $("#topic-input").val().trim();

    //this prohibits a user from entering a blank button.  If nothing is put into the text box but the submit button is pushed nothing will happen
    if(newtopic === "")
    {
      return null;
    }

    // Adding the new topic from the textbox to the topics array
    topics.push(newtopic);

    // Calling showButtons function when the submit button is clicked
    showButtons();
  });

  //calls the showButtons function after the DOM is loaded
  showButtons();

  // calls the showGiphys function when the topic buttons are clicked
  $(document).on("click", ".btn-success", showGiphys);

  // defines what happens when the image is clicked.  Here is making giving it the animated url if it is still and vice versa
  $(document).on("click", "img", function()
  {
      // creating a variable to store the data-state attribute as defined above
    var state = $(this).attr("data-state");

    if (state === "still") 
    {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else 
    {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});
      

