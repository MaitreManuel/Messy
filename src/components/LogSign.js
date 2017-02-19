var React = require("react");

var UserForm = require("./UserForm.js");
var Login = require("./Login.js");

var LogSign = React.createClass({
    pwdForget: function () {
        toastr.warning('Support non trouvé', 'Erreur 404');
    },

    // need because jQuery gone I don't know why and without
    // no acces to UserForm
    toggleHere: function () {
        toggle();
    },

    render: function () {
        return (
            <div id="LogSign">
                <div className="toggle" onClick={this.toggleHere}><i className="fa fa-times fa-pencil"></i>
                  <div className="tooltip">S''inscrire</div>
                </div>

                <div>
                    <UserForm/>
                    <Login validate={ this.props.validate }/>
                </div>

                <div className="cta"><a href="#" onClick={this.pwdForget}>Mot de passe oublié ?</a></div>
            </div>
        );
    }
});

module.exports = LogSign;
