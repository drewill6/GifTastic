var athletesArray = ["Football", "Track and Field", "Rugby", "Basketball", "Powerlifting"];

$(document).ready(function() {
    // create the buttons
    for(var i = 0; i < athletesArray.length; i++)
    {
        CreateQuickButton(athletesArray[i]);
    }

    $('.sports').on('click', function() {
        var term = $(this).data('name');
        QueryGiphy(term);
    });
  
    $('#searchBtn').on('click', function(){
        var term = $("#searchInput").val();
        QueryGiphy(term);
        CreateQuickButton(term);
    });
});

function CreateQuickButton(term)
{
    var newButton = $("<button/>").addClass( "btn btn-info sports").attr('data-name',term).html(term);
    $("#sports-buttons").append(newButton);
}

function QueryGiphy(term)
{
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
        url: queryURL,
        method: 'GET',
        success: ProcessGiphyResponse,
    });
}

function ProcessGiphyResponse(results)
{
    results = results.data;

    var sportsDiv = $('<div/>');

    for (var i = 0; i < results.length; i++) {
        var span = $('<div style="margin: 5px; display: inline-block;" />');

        span.append("<span>Rating: " + results[i].rating + "</span><br/>");

        var sportsImage = $('<img/>');

        sportsImage.addClass('sportsImg')

        sportsImage.attr('src', results[i].images.fixed_height.url);

        sportsImage.attr('data-still', results[i].images.fixed_height_still.url)

        sportsImage.attr('data-animate', results[i].images.fixed_height.url)

        sportsImage.attr('data-state', 'still');

        span.append(sportsImage);

        sportsDiv.append(span);
    }

    $('#gifs').html(sportsDiv);


    $('.sportsImg').on('click', function() {
            
        var state = $(this).attr('data-state'); 
        console.log(this);

        if (state == 'still') {
        
        $(this).attr('src', $(this).data('animate'));
        
        $(this).attr('data-state', 'animate');

        } else {
                
        $(this).attr('src', $(this).data('still'));
        
        $(this).attr('data-state', 'still');
        }      
    });
}