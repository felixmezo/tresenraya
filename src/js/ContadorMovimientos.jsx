import { ListGroupItem } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';


var React = require('react');
var ReactDOM = require('react-dom');

let ContadorMovimientos = React.createClass({
	render: function () {
		return (
		  <ListGroup>
		    <ListGroupItem><strong>Contador de Moovimientos</strong></ListGroupItem>
		    <ListGroupItem>Movimientos de las X: {this.props.turnosX}</ListGroupItem>
		    <ListGroupItem>Movimientos de los 0: {this.props.turnos0}</ListGroupItem>
		  </ListGroup>
		)
	}
});

module.exports = ContadorMovimientos;
