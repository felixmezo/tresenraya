import { PageHeader } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

var Cabecera = React.createClass({
	render: function () {
		return (
			<PageHeader className="cabecera">
				<small>{this.props.texto}</small>
			</PageHeader>
		)
	}
});

module.exports = Cabecera;