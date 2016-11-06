var React = require('react');
var ReactDOM = require('react-dom');

const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');

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
			partida: JUGANDO
		};
	},
	appclick: function(numeroFila, numeroColumna) {
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
		valores[numeroFila][numeroColumna]=nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
			partida: this.ganador(this.state.valores, this.state.turno),
			valores: this.state.valores, 
		});
	},
	resetClick: function(){
		this.setState({
			turno: JUGADORX,
			valores: VALORES,
			partida: JUGANDO
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
				<Cabecera texto={texto}/>
				<Tablero valores={this.state.valores} 
				         manejadorTableroClick={this.appclick}
				         partida={this.state.partida} />
			</div>
		)
	}
});

module.exports = App;