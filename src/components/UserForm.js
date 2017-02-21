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
        if(this.state.user.name) {
            spin(true);
            fetch(url+'/join', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.user)
            })
            .then((result) => result.json())
            .then(function (result) {
                spin(false);
                if(result.error) {
                    if(result.error[0]+result.error[1]+result.error[2] == "Key") {
                        toastr.error('Utilisateur déjà existant', 'Inscription échouée');
                    } else {
                        toastr.error('Veuillez remplir tous les champs', 'Inscription échouée');
                    }
                } else {
                    toastr.success('', 'Inscription réussie');
                }
            }).catch(function (err) {
                console.log(err);
                spin(false);
                toastr.error('Utilisateur déjà existant', 'Inscription échouée');
            });
        } else {
            toastr.error('Veuillez remplir tous les champs', 'Inscription échouée');
        }
    },

    render: function () {
        return (
            <div className="form">
                <form>
                  <h2>Créer un compte</h2>
                  <input type="text" onInput={this.updateUser} name="name" placeholder="Pseudo" autoComplete="off"/>
                  <input type="password" onInput={this.updateUser} name="password" placeholder="Mot de passe"/>
                  <input type="text" onInput={this.updateUser} name="image" placeholder="URL Image" autoComplete="off"/>
                  <button className="button" type="button" onClick={this.inscription}>Inscription</button>
                </form>
            </div>
        );
    }
})

module.exports = UserForm;
