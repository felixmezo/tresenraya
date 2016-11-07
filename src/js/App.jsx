import { PageHeader } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');
const Reinicio = require('./Reinicio.jsx')
const ContadorMovimientos = require('./ContadorMovimientos.jsx')


const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

const JUGANDO  = 0;
const GANANX   = 1;
const GANAN0   = 2;
const EMPATE   = 3;

var App = React.createClass({
	getInitialState: function () {
		return {
			turno: JUGADORX,
			valores: VALORES,
			partida: JUGANDO,
			turnos0: 0,
			turnosX: 0
		};
	},
	appclick: function(numeroFila, numeroColumna) {
		let turnosX = this.state.turnosX;
		let turnos0 = this.state.turnos0;
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
		valores[numeroFila][numeroColumna]=nuevoValor;
		if (this.state.turno === JUGADORX){
			turnosX=turnosX+1;
		}else{
			turnos0=turnos0+1;
		}
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
			partida: this.ganador(this.state.valores, this.state.turno),
			valores: this.state.valores, 
			turnos0: turnos0,
			turnosX: turnosX
		});
	},
	resetClick: function(){
		this.setState({
			turno: JUGADORX,
			valores: [
				['-', '-', '-'],
				['-', '-', '-'],
				['-', '-', '-']
			],
			partida: JUGANDO,
			turnos0:0,
			turnosX: 0
		})
	},
	ganador: function(valores,turno){
		for (var i=0; i<valores.length; i++){
			if ( (valores[i][0] !== '-' && valores[i][0]===valores[i][1] && valores[i][1]===valores[i][2]) || //comprobaciones horizontales
				(valores [0][i] !== '-' && valores[0][i]===valores[1][i] && valores[1][i]===valores[2][i])) {  //comprobaciones verticales
					setTimeout(function(){alert("Gana el"+ turno)},100)
					return valores[i][0]==='0' ? GANAN0 : GANANX;
			}
		}
		if ((valores[0][0]!=='-' && valores[0][0]===valores[1][1] && valores[1][1]===valores[2][2]) || //comprobacion de diagonales
			(valores[0][2]!=='-' && valores[0][2]===valores[1][1] && valores[1][1]===valores[2][0])) { 
			setTimeout(function(){alert("GANA el "+turno)},100)
			return valores[1][1]==='0' ? GANAN0 : GANANX;
		}
		//comprobacion de empate
		for (var i=0; i<valores.length; i++){
			for (var j=0; j<valores.length; j++){
				if (valores[i][j]==='-'){
					return JUGANDO;
				}
			}
		}
		setTimeout(function(){alert("EMPATE")},100)
		return EMPATE;		
	},
	render: function () {
		var texto = "Turno del " + this.state.turno;
		return (
			<div>
				<PageHeader>Tres en Raya  <small>Ingenieria Web</small></PageHeader>
				<Image src="./images/logo.gif" 
				       width="100px"
				       responsibe="true" />
				<Cabecera texto={texto}/>
				<Reinicio manejadorResetClick={this.resetClick}/>
				<ContadorMovimientos turnosX = {this.state.turnosX}
									 turnos0 = {this.state.turnos0}/>
				<Tablero valores={this.state.valores} 
				         manejadorTableroClick={this.appclick}
				         partida={this.state.partida} />
				<footer>
					Félix Mezo Gómez - <i>felix.mezog@alumnos.upm.es</i>
				</footer>
			</div>
		)
	}
});

module.exports = App;