var React = require("react");

var UserForm = require("./UserForm.js");
var Login = require("./Login.js");

var LogSign = React.createClass({
    render: function () {
        return (
            <div id="LogSign">
                <div className="toggle"><i className="fa fa-times fa-pencil"></i>
                  <div className="tooltip">S''inscrire</div>
                </div>

                <div>
                    <UserForm/>
                    <Login validate={ this.props.validate }/>
                </div>

                <div className="cta"><a href="javascript::void(0)">Mot de passe oublié ?</a></div>
            </div>
        );
    }
});

module.exports = LogSign;
