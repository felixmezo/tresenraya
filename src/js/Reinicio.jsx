import { Button } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

let Reinicio = React.createClass({
	resetClick: function(){
		this.props.manejadorResetClick()
	},
	render: function(){
		return (
			<Button bsSize="large"
					bsStyle="primary" 
					onClick={this.resetClick}>
				Reinicio
			</Button>
		)
	}
})

module.exports = Reinicio;

