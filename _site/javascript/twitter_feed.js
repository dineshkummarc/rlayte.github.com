var twitter_callback = function(tweets) {
    var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for(var i = 0, l = tweets.length; i < l; i++) {
        var created = new Date(tweets[i].created_at);
        $('ul.tweets').append('<li>' + tweets[i].text + '<br /><span class="created">' + created.getDate() + ' ' + months[created.getMonth()] + '</span></li>');
    }
}
