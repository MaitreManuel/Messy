var React = require("react");

const url = 'https://tpiut2017.cleverapps.io';

var Message = React.createClass({
    getInitialState: function() {
        return { messages: "" };
    },

    componentWillMount: function() {
        this.getMessages();
    },

    deconnexion: function () {
        $('.form-module').css('max-width', '320px');
        this.props.deco();
        sessionStorage.clear();
    },

    deleteMessage : function(id) {
        var token = sessionStorage.getItem('token'),
            me = this;

        spin(true);
        fetch(url+'/u/timeline/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer:'+ token,
            }
        })
        .then(function(response) {
            spin(false);
            toastr.success('', 'Message Supprimé');
            me.getMessages();
        })
        .catch(function(err) {
            spin(false);
            toastr.error('Une erreur est survenue', 'Message Non Supprimé');
            console.log(err);
        });
    },

    getMessages: function () {
        var me = this;

        spin(true);
        fetch(url+'/u/timeline', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer:'+ sessionStorage.getItem("token")
            }
        })
        .then((result) => result.json())
        .then(function (result) {
            var jour = "",
                heure = "",
                substr = "",
                messages = [],
                deleteMessage = this.deleteMessage;

            result.sort(function(a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });

            for(var i = 0; i < result.length; i++) {
                let id = result[i].id;
                var src = result[i].user.image;
                var date = result[i].date;
                // .substring() doesn't work
                jour = date[8]+date[9]+"/"+date[5]+date[6]+"/"+date[0]+date[1]+date[2]+date[3];
                heure = " à "+date[11]+date[12]+":"+date[14]+date[15];
                date = jour+heure;
                // needed to block an error if URL picture is local picture
                // or link no http or field empty
                if(!src || src[0]+src[1]+src[2]+src[3] !== "http") {
                    src = "./img/user.png";
                }
                messages.push(
                    <div className="post-container" key={"post"+ i}>
                        <div className="post-thumb"><img className="profilPic" src={src} alt="Profil Picture" /></div>
                        <div className="post-info">
                            <h3>{result[i].user.name}</h3>
                            {date}
                        </div>
                        <div className="post-content">
                            {result[i].message}
                        </div>
                    </div>
                );
                if(result[i].user.name === sessionStorage.getItem("name")) {
                    messages.push(
                        <div key={"delete"+ i}>
                            <button className="button-delete" type="button" onClick={ () => me.deleteMessage(id) }> Supprimer</button>
                        </div>
                    );
                }
            }
            spin(false);
            toastr.success('', 'Messages Récupérés');
            me.setState({messages: messages});
        }).catch(function (err) {
            console.log(err);
            spin(false);
            toastr.error('Une erreur est survenue', 'Messages Non Récupérés');
        });
    },

    newMessage: function () {
        var me = this;

        openOverlay(true);
        $('#newMessage').click(function() {
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
                me.getMessages();
            })
            .catch(function(err) {
                toastr.error('Une erreur est survenue', 'Message Non Publié');
                spin(false);
                console.log(err);
            });
        });
    },

    render: function () {
        var messages = this.state.messages,
            user = {
                id: sessionStorage.getItem("id"),
                name: sessionStorage.getItem("name"),
                image: sessionStorage.getItem("image"),
                token: sessionStorage.getItem("token")
            };
        var src = user.image;

        if(!src || src[0]+src[1]+src[2]+src[3] !== "http") {
            src = "./img/user.png";
        }

        return (
            <div id="Message">
                <div></div>

                <div className="content">
                    <div className="user">
                        Connecté en tant que :
                        <br/><br/>
                        <div className="post-thumb"><img className="profilPic" src={src} alt="Profil Picture" /></div>
                        <div className="post-info">
                            <h3>{user.name}</h3>
                            <a className="deco-button" onClick={this.deconnexion}><i className="fa fa-times fa-power-off"></i> Déconnexion</a>
                        </div>
                    </div>
                    <div className="titre">
                        <h1>Messages</h1>
                    </div>
                    <div className="pos-button">
                        <button type="button" onClick={this.newMessage}><i className="fa fa-times fa-pencil"></i> Nouveaux Messages</button>
                        <button type="button" onClick={this.getMessages}><i className="fa fa-times fa-download"></i> Récupérer Message</button>
                    </div>
                    <br/><br/>
                    {messages}
                    <footer><i className="fa fa-times fa-copyright"></i> 2017 - Trystan Eveno</footer>
                </div>
            </div>
        );
    }
});

module.exports = Message;
