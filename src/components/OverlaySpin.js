var React = require("react");

var Message = require("./Message.js");

const url = 'https://tpiut2017.cleverapps.io';

var OverlaySpin = React.createClass({
    getInitialState: function( ) {
        return { message: "" };
    },

    updateMessage: function (event) {
        var message = this.state.message;
        message = event.target.value;
        this.setState({message: message});
    },

    closeOverlay: function () {
        closeOverlay();
    },

    newMessage: function () {
        var me = this,
            state = this.state,
            myMessage = JSON.stringify({
                message : this.state.message
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
            spin(false);
            me.props.getMessages();
        })
        .catch(function(err) {
            toastr.error('Une erreur est survenue', 'Message non publié');
            spin(false);
            console.log(err);
        });
    },

    render: function () {
        return (
            <div id="OverlaySpin">
                <div id="overlay" className="overlay">
                    <div id="loader"></div>
                    <div className="box-message">
                        <h2>Nouveau Message</h2>
                        <a id="closeButton" href="javascript:void(0)" className="closebtn" onClick={this.closeOverlay}>&times;</a>
                        <textarea onInput={this.updateMessage} id="message" name="message" placeholder="Message..."></textarea>
                        <div className="modal-button">
                            <button className="buttonOver valider" onClick={this.newMessage} type="button">Valider</button>
                            <button className="buttonOver annuler" onClick={this.closeOverlay} type="button">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = OverlaySpin;
