// YOUR CODE HERE:
$(document).ready(function() {
    var posts;

    //for loop length of obj.results.length
    var app = {

        showMessages: function(obj) {
            console.log("3 - Log: ", obj);
            // d3.select('#main').selectAll('div')
            //     .data(obj.results)
            //     .enter()
            //     .append('div')
            //     .text(function(d, i) {
            //         var textOrMessage = d.text || d.message;
            //         var userCheck = d.username || "anonymous"
            //         return userCheck + ": " + textOrMessage;
            //     })

            //Each method
            _.each(obj.results, function(value, index, collection) {
                var textOrMessage = value.text || value.message;
                var userCheck = value.username || "anonymous"

                var element = document.createElement('div');
                element.innerText = userCheck + ": " + textOrMessage;
                $('#main').append(element);

            })
        }


    }

    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: {
            order: "-createdAt"
        },
        contentType: 'application/json',
        success: function(data) {
            console.log(' 2 - Data Received: ', data);
            app.showMessages(data);
            // posts = data.results;
            // showMessages(posts)
        },
        error: function(data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message. Error: ', data);
        }
    })



    setInterval(function() {



        // console.log("1 - Document Ready ");
        $.ajax({
            // This is the url you should use to communicate with the parse API server.
            url: 'https://api.parse.com/1/classes/chatterbox',
            type: 'GET',
            data: {
                order: "-createdAt"
            },
            contentType: 'application/json',
            success: function(data) {
                console.log(' 2 - Data Received: ', data);
                app.showMessages(data);
                // posts = data.results;
                // showMessages(posts)
            },
            error: function(data) {
                // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to send message. Error: ', data);
            }
        })


    }, 20000)

})


$('#sendMessage').on('click', function(){
    console.log("hello")
    userMessage.username = document.getElementById('.userInput').value;
})


// $.ajax({
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent. Data: ', data);
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message. Error: ', data);
//   }
// });

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var x = $(".userInput").val()
