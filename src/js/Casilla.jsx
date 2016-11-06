const casillaStyle = {
	height: '100px',
	width: '100px'
};

let Casilla = React.createClass({
	casillaClick: function () {
		if (this.props.partida===0 && this.props.valor === "-") {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	comprobarClickable: function(){
		if (this.props.partida !== 0 || this.props.valor!=="-") {
			return "no_clickable"
		}
		return "clickable"
	},
	render: function () {
		return (
			<button style={casillaStyle} className={this.comprobarClickable()} onClick={this.casillaClick}>
			{this.props.valor}
			</button>
		)
	}
});

module.exports = Casilla;