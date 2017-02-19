var React = require("react");

const url = 'https://tpiut2017.cleverapps.io';

var UserForm = React.createClass({
    getInitialState: function( ) {
        return { user: { name: "", password: "", image: "" }}
    },

    updateUser: function (event) {
        var newuser = this.state.user;
        newuser[event.target.name] = event.target.value;
        this.setState({user: newuser});
    },

    inscription: function () {
        $.ajax({
               url : url +'/join',
               type : 'POST',
               dataType: "json",
               headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json"
               },
               data: JSON.stringify(this.state.user),
               beforeSend: function() {
                   spin(true);
               },
               complete: function() {
                   spin(false);
               },
               success: function (response, textStatus, xhr) {
                   console.log("UserForm", textStatus, xhr.status);
               },
               error: function (err, textStatus, xhr) {
                   console.log("UserForm", textStatus, xhr.status);
               }
        }).then(function (result) {
            console.log('end of exec sign up');
            if(result < 0) {
                console.log('error when try to sign up');
            } else {
                console.log('success sign up')
            }
        });
    },

    render: function () {
        return (
            <div className="form">
                <form>
                  <h2>Créer un compte</h2>
                  <input type="text" onInput={this.updateUser} name="name" placeholder="Pseudo" autoComplete="off"/>
                  <input type="password" onInput={this.updateUser} name="password" placeholder="Mot de passe"/>
                  <input type="text" onInput={this.updateUser} name="image" placeholder="URL Image" autoComplete="off"/>
                  <button type="button" onClick={this.inscription}>Inscription</button>
                </form>
            </div>
        );
    }
})

module.exports = UserForm;
