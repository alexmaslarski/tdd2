$('#featured').flickity({
    // options
    cellAlign: 'left', // align cells left
    contain: true, // contain image
    prevNextButtons: false, // hide prev and next buttons
    pageDots: true, // display page dots
    autoPlay: 7000 // autoplay every 7 seconds
});

$(document).ready(function () {
    if( $( window ).width()>415){
        alert('For best view, please open inspect element (F12) and select responsive view (ctrl + shift + m). Works best on iphone 5/6/7 resolution.');
    }
    
});

$(document).ready(function () {
    /*Tabs*/
    var action = "click";
    var speed = "500";

//slidetoggling the wiki dropdowns
    $('li.tab-header').on(action, function () {
        $(this).next()
            .slideToggle(speed)
            .siblings('li.tab-content')
            .slideUp();

    });


// Toggling the tabs in leaderboards
    $('#team-players-card').on(action, function () {
        $('#more-team').toggle();
        $('#team-players-see-more').toggle();
    });

    $('#players-tab').on(action, function () {
        $('#players-leaderboards').fadeIn(speed)
            .siblings('.leaderboard-table')
            .fadeOut();
        $('#players-tab').addClass("active-tab");
        $('#teams-tab').removeClass("active-tab");
    });
    $('#teams-tab').on(action, function () {
        $('#teams-leaderboards').fadeIn(speed)
            .siblings('.leaderboard-table')
            .fadeOut();
        $('#players-tab').removeClass("active-tab");
        $('#teams-tab').addClass("active-tab");
    });
//preventing the default action on searchbar submit
    $('.searchBar').on("submit", function (e) {
        e.preventDefault();
    });

    /*Tabs End*/



    /*Navigation start*/


    /*Go back button start*/
    var currentPage = "home";
    var previousPage;

    function goBack(backPage) { // function with a parameter passing the id of the previous page
        var link = "#" + backPage; // construncting the link by addind a Hash to the id passed through by the parameter
        $(link).show().siblings('main').hide(); // Show the <main> with the specific link as id
        window.scroll(0, 0); // scroll to top
        currentPage = previousPage; // previous page takes the value of the current one (which is technically the last page)
        previousPage = "home"; // the current page is changed to the home page 
    };

    $(".go-back").click(function () { //onclick of the button it triggers a fucntion
        if (previousPage === "profile") { // if the previous page is the profile page, it changes the header and then executes the goBack function with the id as a parameter.
            $('#full-header').addClass("profile-header");
            goBack(previousPage);
        } else { // else it removes the class and executes the function
            goBack(previousPage);
            $('#full-header').removeClass("profile-header");

        }
    });

    /*Go back Button end*/




    $('#homeBtn').click(function () {
        $('#home').show().siblings('main').hide(); // show #home and hide all other elements from the 'main' tag
        $('#full-header').removeClass("profile-header"); // Incase the .profile-header class was added to the header, this removes it.
        window.scroll(0, 0); // scrolls to the top of the page, so when you go on another page you are always on the top.
        previousPage = currentPage; // previous page takes the value of the current one (which is technically the last page)
        currentPage = "home"; // the current page is changed to the currently active page
    });

    $('#overviewBtn').click(function () {
        $('#home').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "home";
    });
    $('#wikiBtn').click(function () {
        $('#wiki').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "wiki";
    });
    $('#leaderboard-card').click(function () {
        $('#leaderboards').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "leaderboards";
    });

    $('#profileSection').click(function () {
        $('#profile').show().siblings('main').hide();
        $('#full-header').addClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "profile";

    });
    $('#achievements-card').click(function () {
        $('#achievements-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "achievements-page";
    });
    $('#missions-card').click(function () {
        $('#missions-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "missions-page";
    });
    $('#missionsBtn').click(function () {
        $('#missions-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "missions-page";
    });
    $('#teamBtn').click(function () {
        $('#team-page').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "team-page";
    });
    $('#chatBtn').click(function () {
        $('#chat-list').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "chat-list";
    });
    $('.chat-list-wrapper').click(function () {
        $('#chat').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "chat";
    });
    $('.communityBtn').click(function () {
        $('#pro-tips').show().siblings('main').hide();
        $('#full-header').removeClass("profile-header");
        window.scroll(0, 0);
        previousPage = currentPage;
        currentPage = "pro-tips";
    });

    /*Navigation end*/





    /*JSON*/

    //JSON Data fetch
    function collectData(url, callback_Function) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback_Function(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    }
    var jsonElements;

    //JSON Show data
    function showData(jsonData) {

        jsonElements = JSON.parse(jsonData.responseText); //Parsing the object

        $('#wiki-article').show().siblings('main').hide();
        $('#wiki-header-image').attr("src", jsonElements.image);
        $('#wiki-item-name').text(jsonElements.name);
        $('#wiki-item-content1').text(jsonElements.description1);
        $('#wiki-item-content2').text(jsonElements.description2);
        $('#wiki-dropdown').text(jsonElements.dropdown);
        $('#tab-content').empty();
        for (var i = 0; i < jsonElements.upgrades.length; i++) { //lists all upgrades or other listable attributes onto the dropdown list.
            
            $('#tab-content').append('<div class="wiki-upgrade-card"><img src="' + jsonElements.upgrades[i].image + '" alt=""><div class="wiki-upgrade-card-content"><h3>' + jsonElements.upgrades[i].level + '</h3><p>' + jsonElements.upgrades[i].description + '</p><p class="wiki-resources">' + jsonElements.upgrades[i].resources + '</p></div></div>');
        }

    }

    $(".wiki-items-click").on("click", "div", function () { // onclick gets the data-link containing the url
        var itemClickedLink = $(this).attr("data-link");//saves it into a variable
        collectData(itemClickedLink, showData);//calls the collect data function with the url and the showData function as callback
        if (itemClickedLink !== undefined) { //when an item is clicked it opens the wiki article page while the showData function parses the text and data
            $('#wiki-article').show().siblings('main').hide();
            previousPage = currentPage;
            currentPage = "wiki-article";
        }
    });





});

/*Upgrade timers*/
var countDownDate1 = new Date("May 28, 2019 19:07:00").getTime(); // Set upgrade timers time and date, preferably under 24h
var countDownDate2 = new Date("May 29, 2019 10:37:25").getTime();
var upgradeTime = 86400000; // Set upgrade duration (1 day)
var timeLeft1; // variable for storing time left percentage
var timeLeft2;
var x = setInterval(function () { // setinterval function which updates every 1 second

    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance1 = countDownDate1 - now;
    //calculating percentage left to completing the upgrade
    timeLeft1 = 100 - (100 * (distance1 / upgradeTime));
    var distance2 = countDownDate2 - now;
    timeLeft2 = 100 - (100 * (distance2 / upgradeTime));
    //updating progress bar
    if (distance1 >= 0) {
        $('#timer1Progress').css("width", timeLeft1 + "%");
    }
    if (distance2 >= 0) {
        $('#timer2Progress').css("width", timeLeft2 + "%");
    }
    // Time calculations for days, hours, minutes and seconds
    var days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
    var hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);
    var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
    // Display the result in the elements
    document.getElementById("timer1").innerHTML = hours1 + "h " +
        minutes1 + "m " + seconds1 + "s ";
    document.getElementById("timer2").innerHTML = hours2 + "h " +
        minutes2 + "m " + seconds2 + "s ";
    // If the count down is finished, say its upgraded
    if (distance1 < 0) {
        $('#timer1Progress').css("width", "100%");
        document.getElementById("timer1").innerHTML = "Upgraded";
    }
    if (distance2 < 0) {
        $('#timer2Progress').css("width", "100%");
        document.getElementById("timer2").innerHTML = "Upgraded";
    }
}, 1000);

/*Upgrade Timers end*/

/*Donation*/
//Fetch text from resource elements, turn it into a number and assign it to a variable
var pills = parseInt($('#pills').text(), 10);
var water = parseInt($('#water').text(), 10);
var electricity = parseInt($('#electricity').text(), 10);
var thermal = parseInt($('#thermal').text(), 10);
var teamPills = parseInt($('#team-pills').text(), 10);
var teamWater = parseInt($('#team-water').text(), 10);
var teamElectricity = parseInt($('#team-electricity').text(), 10);
var teamThermal = parseInt($('#team-thermal').text(), 10);
$("#donateBtn").click(donate); //On click it triggers the donate function
function donate() {
    //Fetches the value entered by the user inside the input element for each resource and assign it to a variable
    var pillsInput = parseInt($("input[type=number][name=pillsInput]").val());
    var waterInput = parseInt($("input[type=number][name=waterInput]").val());
    var electricityInput = parseInt($("input[type=number][name=electricityInput]").val());
    var thermalInput = parseInt($("input[type=number][name=thermalInput]").val());
    // Variable containing the the result of substracting the inputed value from the available resources, in order to check if the user has enough resources
    var pillsCheck = pills - pillsInput;
    var waterCheck = water - waterInput;
    var electricityCheck = electricity - electricityInput;
    var thermalCheck = thermal - thermalInput;
    //Check if difference between input and available resources is not a negative number
    if (pillsCheck >= 0 && waterCheck >= 0 && electricityCheck >= 0 && thermalCheck >= 0) {
        //increasing the team resources with the input value using the Addition Assignment operator
        teamPills += pillsInput;
        teamWater += waterInput;
        teamElectricity += electricityInput;
        teamThermal += thermalInput;
        //Decreasing the user resources with the input value using the Substraction Assignment operator
        pills -= pillsInput;
        water -= waterInput;
        electricity -= electricityInput;
        thermal -= thermalInput;
        //Updating the resource values in the DOM
        $('#pills').html(pills + " <img src='images/pills@2x.png' alt=''>");
        $('#team-pills').html(teamPills + " <img src='images/pills@2x.png' alt=''>");
        $('#water').html(water + " <img src='images/water@2x.png' alt=''>");
        $('#team-water').html(teamWater + " <img src='images/water@2x.png' alt=''>");
        $('#electricity').html(electricity + " <img src='images/electricity@2x.png' alt=''>");
        $('#team-electricity').html(teamElectricity + " <img src='images/electricity@2x.png' alt=''>");
        $('#thermal').html(thermal + " <img src='images/thermal@2x.png' alt=''>");
        $('#team-thermal').html(teamThermal + " <img src='images/thermal@2x.png' alt=''>");
        //Showing an animated dropdown message, showing the user that the donation was successful
        $('#donated').slideDown(300).delay(3000).slideUp(300);
    } else {
        //Showing an animated dropdown message, showing the user that the donation was not successful
        $('#insufficient').slideDown(300).delay(3000).slideUp(300);
    }


}



/*CHAT*/
// Makes sure the chat is always scrolled to the bottom
function scrollDown() {
    var focusBottom = document.getElementById("adobewordpress");
    focusBottom.scrollTop = focusBottom.scrollHeight;
}
//Checks if the key pressed is enter in order to send the message
$("input").keypress(function (event) {
    if (event.which == 13) {
        event.preventDefault();
        $('form.chat input[type="submit"]').click();
    }
});

//Submitting the message
$('form.chat input[type="submit"]').click(function (event) {
    event.preventDefault();
    //assign the value of the input to a message variable
    var message = $('form.chat input[type="text"]').val();
    //checks if the message is not empty, and gets the current time its being sent
    if ($('form.chat input[type="text"]').val()) {
        var d = new Date();
        var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        //assigns the current date to a variable
        var currentDate =
            (('' + day).length < 2 ? '0' : '') + day + '.' +
            (('' + month).length < 2 ? '0' : '') + month + '.' +
            d.getFullYear() + '&nbsp;&nbsp;' + clock;

        //displays the date over the message
        $('form.chat div.messages').append('<div class="message"><div class="myMessage"><p>' + message + '</p><date><b>Baron Adam </b>' + currentDate + '</date></div></div>');

    }
    //clears the input field
    $('form.chat input[type="text"]').val('');
    //scrolls down to see the last message
    scrollDown();
    
    
    
    
    
});



// Social Feed Posting
$("#postBtn").click(function(){
   var post = $('#new-post input[type="text"]').val();
    if(post){
        $('#posts-container').prepend('<div class="friends-post"><div class="friends-post-wrapper"><div class="friends-post-name"><img src="images/profilepic.png" alt=""><div class="post-info"><p>Baron Dolko</p><p>Just Now</p></div></div><div class="friends-post-content"><p>'+ post +'</p></div></div><div class="post-controls"><p><i class="fas fa-thumbs-up"></i> Like</p><p><i class="fas fa-comment"></i> Comment</p></div></div>')
        
        $('#new-post input[type="text"]').val('');
    }
    
});
