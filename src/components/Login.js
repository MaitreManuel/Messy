var React = require("react");

const url = 'https://tpiut2017.cleverapps.io';

var Login = React.createClass({

    getInitialState: function( ) {
        return { user: { name: "", password: "" }}
    },

    updateUser: function (event) {
        var user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({user: user});
    },

    connection: function () {
        $.ajax({
            url : url +'/authenticate',
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
                console.log("Login", textStatus, xhr.status);
            },
            error: function (err, textStatus, xhr) {
                console.log("Login", textStatus, xhr.status);
            }
        }).then(function (result) {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("id", result.user.id);
            sessionStorage.setItem("name", result.user.name);
            sessionStorage.setItem("image", result.user.image);
            $('#LogSign').css('display', 'none');
            $('#Message').css('display', 'block');
            $('.form-module').css('max-width', '800px');
            $(window).trigger('resize');
            this.props.validate();
        }.bind(this));
    },

    render: function () {
        return (
            <div className="form">
                <form>
                  <h2>Se Connecter</h2>
                  <input type="text" onInput={this.updateUser} name="name" placeholder="Pseudo"/>
                  <input type="password" onInput={this.updateUser} name="password" placeholder="Mot de passe"/>
                  <button type="button" onClick={this.connection}>Connection</button>
                </form>
            </div>
        );
    }
})

module.exports = Login;
