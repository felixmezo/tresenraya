(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Cabecera = require('./Cabecera.jsx');
var Tablero = require('./Tablero.jsx');

var JUGADORX = "jugador 1 - las X";
var JUGADOR0 = "jugador 2 - los 0";
var VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

var JUGANDO = 0;
var GANANX = 1;
var GANAN0 = 2;
var EMPATE = 3;

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			turno: JUGADORX,
			valores: VALORES,
			partida: JUGANDO
		};
	},
	appclick: function appclick(numeroFila, numeroColumna) {
		var valores = this.state.valores;
		var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
			partida: this.ganador(this.state.valores, this.state.turno),
			valores: this.state.valores
		});
	},
	resetClick: function resetClick() {
		this.setState({
			turno: JUGADORX,
			valores: VALORES,
			partida: JUGANDO
		});
	},
	ganador: function ganador(valores, turno) {
		for (var i = 0; i < valores.length; i++) {
			if (valores[i][0] !== '-' && valores[i][0] === valores[i][1] && valores[i][1] === valores[i][2] || //comprobaciones horizontales
			valores[0][i] !== '-' && valores[0][i] === valores[1][i] && valores[1][i] === valores[2][i]) {
				//comprobaciones verticales
				setTimeout(function () {
					alert("Gana el" + turno);
				}, 100);
				return valores[i][0] === '0' ? GANAN0 : GANANX;
			}
		}
		if (valores[0][0] !== '-' && valores[0][0] === valores[1][1] && valores[1][1] === valores[2][2] || //comprobacion de diagonales
		valores[0][2] !== '-' && valores[0][2] === valores[1][1] && valores[1][1] === valores[2][0]) {
			setTimeout(function () {
				alert("GANA el " + turno);
			}, 100);
			return valores[1][1] === '0' ? GANAN0 : GANANX;
		}
		//comprobacion de empate
		for (var i = 0; i < valores.length; i++) {
			for (var j = 0; j < valores.length; j++) {
				if (valores[i][j] === '-') {
					return JUGANDO;
				}
			}
		}
		setTimeout(function () {
			alert("EMPATE");
		}, 100);
		return EMPATE;
	},
	render: function render() {
		var texto = "Turno del " + this.state.turno;
		return React.createElement(
			'div',
			null,
			React.createElement(Cabecera, { texto: texto }),
			React.createElement(Tablero, { valores: this.state.valores,
				manejadorTableroClick: this.appclick,
				partida: this.state.partida })
		);
	}
});

module.exports = App;

},{"./Cabecera.jsx":2,"./Tablero.jsx":4}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
	displayName: "Cabecera",

	render: function render() {
		return React.createElement(
			"header",
			{ className: "cabecera" },
			this.props.texto
		);
	}
});

module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
	height: '100px',
	width: '100px'
};

var Casilla = React.createClass({
	displayName: 'Casilla',

	casillaClick: function casillaClick() {
		if (this.props.partida === 0 && this.props.valor === "-") {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	comprobarClickable: function comprobarClickable() {
		if (this.props.partida !== 0 || this.props.valor !== "-") {
			return "no_clickable";
		}
		return "clickable";
	},
	render: function render() {
		return React.createElement(
			'button',
			{ style: casillaStyle, className: this.comprobarClickable(), onClick: this.casillaClick },
			this.props.valor
		);
	}
});

module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");

var Tablero = React.createClass({
	displayName: "Tablero",

	tableroClick: function tableroClick(numeroFila, numeroColumna) {
		this.props.manejadorTableroClick(numeroFila, numeroColumna);
	},
	render: function render() {
		var tablero = this.props.valores.map(function (valoresFila, indiceFila) {
			var fila = valoresFila.map(function (valor, indiceColumna) {
				var mykey = "" + indiceFila + indiceColumna;
				return React.createElement(Casilla, { valor: valor,
					indiceFila: indiceFila,
					indiceColumna: indiceColumna,
					key: mykey,
					manejadorClick: this.tableroClick,
					partida: this.props.partida });
			}, this);
			return React.createElement(
				"div",
				{ key: "fila" + indiceFila },
				fila
			);
		}, this);
		return React.createElement(
			"div",
			null,
			tablero
		);
	}
});

module.exports = Tablero;

},{"./Casilla.jsx":3}],5:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");

ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[5]);
