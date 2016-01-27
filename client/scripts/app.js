

var app = { };
var messageIds = [];
app.friends=[];
app.roomNamesArray = [];
app.roomname = 'lobby';
//$('.messages').html("")
function showMessages(results) {
    
    var roomResults = _.filter(results, function(element){
        return element.roomname === app.roomname;
    })

    _.each(roomResults,function(message){
        var textOrMessage = message.text || message.message;
        var userCheck = message.username || "anonymous";
        var createdAt = message.createdAt.split("").slice(11,19).join("");

        if (messageIds.indexOf(message.objectId) === -1){
        var $msg = $("<h4>")
            .text( userCheck + " @ " + createdAt + " : " + textOrMessage )
            .css({ "margin" : "10px"})

        var $userTag = $('<br/><a "userName">---'+userCheck+'</a>')
                .attr("class", userCheck)
                .appendTo($msg) 
                .css({ "color":"blue"})
        if(app.friends.indexOf(userCheck) !== -1 ){
            $userTag.css({"color":"red"})
        }
                
        $($userTag).on("click", function(){
            if(app.friends.indexOf(userCheck) === -1){
                app.friends.push(userCheck);
            }
        })

        var $container = $("<div>")
            .attr("class","messages")
            .css({ 
                'background-color' : '#e5f2ff',
                "margin" : "10px",
                // "border" : "black solid 1px",
                "border-radius" : "5px"
             })
            .prependTo(".beginning")
            .append($msg)
            messageIds.push(message.objectId);
        }
    })
};

app.fetch = function(){
    $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: {order : "-createdAt" },
        contentType: 'application/json',
        success: function(data) {
            console.log(' 2 - Data Received: ', data);
            showMessages(data.results);
            //process room data
            app.populateRooms(data.results);
            messages = data;
        },
        error: function(data) {
            console.error('chatterbox: Failed to send message. Error: ', data);
        }
    });
    setTimeout(app.fetch, 5000);
}

app.post = function(message){
    $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
            success: function (data) {
            console.log('chatterbox: Message sent. Data: ', data);
        },
        error: function (data) {
            console.error('chatterbox: Failed to send message. Error: ', data);
        }
    });
};

app.populateRooms = function(results) {
    app.$roomSelect.html('<option value="__newRoom">New room...</option><option value="" selected>Lobby</option></select>');
};

function init(){
    $("#sendMessage").on("click",function(){
        var message = {
            username: window.location.search.split("").slice(10,19).join(""),
            text: $(".userInput").val(),
            roomname: '...'
        };
        // console.log(message);
        app.post(message);
    });
    app.fetch();
    var $placeHolder = $("<div>")
        .attr("class","beginning")
        .appendTo("#main")
        .append($placeHolder);
          // Cache jQuery selectors
            app.$roomSelect = $('#roomSelect');
            app.$roomSelect.on('change', function(){ app.roomname = app.$roomSelect.val(); });
            // Add listeners
            app.$roomSelect.on('change', app.saveRoom);
}



$(document).ready(function(){
    init();
})