function newMessage() {
    var url = 'https://tpiut2017.cleverapps.io',
        myMessage = JSON.stringify({
            'message' : document.getElementById('message').value
        });

        spin(true);
        fetch(url+'/u/timeline', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length' : myMessage.length,
                'Authorization' : 'Bearer:'+ sessionStorage.getItem("token")
            },
            body: myMessage
        })
        .then(function(reponse) {
            location.reload();
        })
        .catch(function(err) {
            console.log(err);
        });
}
