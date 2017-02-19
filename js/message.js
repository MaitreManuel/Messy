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
            toastr.success('', 'Message Publié');
            location.reload();
        })
        .catch(function(err) {
            toastr.error('Une erreur est survenue', 'Message Non Publié');
            spin(false);
            console.log(err);
        });
}
