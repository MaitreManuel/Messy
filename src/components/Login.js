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
        var me = this;

        spin(true);
        fetch(url+'/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user)
        })
        .then((result) => result.json())
        .then(function (result) {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("id", result.user.id);
            sessionStorage.setItem("name", result.user.name);
            sessionStorage.setItem("image", result.user.image);
            $('#LogSign').css('display', 'none');
            $('#Message').css('display', 'block');
            $('.form-module').css('max-width', '800px');
            spin(false);
            toastr.success('', 'Connection Réussie');
            me.props.validate();
        }).catch(function (err) {
            console.log(err);
            spin(false);
            toastr.error('Mauvais login ou mot de passe', 'Connection refusée');
        });
    },

    render: function () {
        return (
            <div className="form">
                <form>
                  <h2>Se Connecter</h2>
                  <input type="text" onInput={this.updateUser} name="name" placeholder="Pseudo"/>
                  <input type="password" onInput={this.updateUser} name="password" placeholder="Mot de passe"/>
                  <button className="button" type="button" onClick={this.connection}>Connection</button>
                </form>
            </div>
        );
    }
})

module.exports = Login;
