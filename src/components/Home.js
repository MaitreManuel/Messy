var React = require("react");

var LogSign = require("./LogSign.js");
var Message = require("./Message.js");

var Home = React.createClass({
    getInitialState : function(){
        return {
            logged: sessionStorage.length == 0
        };
    },

    deco: function () {
        var state = this.state;
        state.logged = false;
        this.setState(state);
    },

    renderLog: function () {
        return (
            <div id="Home">
                <div className="pen-title">
                  <h1>Messy</h1>
                </div>

                <div className="module form-module force">
                  <div><Message deco={this.deco}/></div>
                </div>
            </div>
        );
    },

    renderNotLog: function () {
        return (
            <div id="Home">
                <div className="pen-title">
                  <h1>Messy</h1>
                </div>

                <div className="module form-module">
                  <div><LogSign validate={this.validate}/></div>
                </div>
            </div>
        );
    },

    validate : function () {
        var state = this.state;
        state.logged = sessionStorage.length == 0;
        this.setState(state);
    },

    render: function () {
        if(sessionStorage.length == 0) {
			return this.renderNotLog();
		} else {
			return this.renderLog();
		}
    }
});

module.exports = Home;
