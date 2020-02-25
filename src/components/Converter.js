/**
 * Converter Class
 */
module.exports = class Converter {
	/**
	 * Converter Constructor
	 */
	constructor() {
		this.types = {
			left: "L",
			right: "R",
			start: "S",
			stop: "C"
		};
		
		this.serverValues = {
			MIN: 1150,
			MAX: 2000
		};
		
		this.clientValues = {
			MIN: -1,
			MAX: 1
		}
	}
	
	/**
	 *
	 * @param value
	 * @returns {number}
	 * @private
	 */
	_map(value) {
		return (value - this.clientValues.MIN) * (this.serverValues.MAX - this.serverValues.MIN)
			/ (this.clientValues.MAX - this.clientValues.MIN) + this.serverValues.MIN
	};
	
	/**
	 *
	 * @param type
	 * @param x
	 * @param y
	 * @returns {string}
	 */
	buildResponse(type, x = undefined, y = undefined) {
		return `${this.types[type]}${this._stringData(x, y)}!`
	};
	
	/**
	 *
	 * @param x
	 * @param y
	 * @returns {string}
	 * @private
	 */
	_stringData(x = undefined, y = undefined) {
		return x !== undefined && y !== undefined ? `|${this._map(x).toFixed(0)}|${this._map(y).toFixed(0)}` : ""
	};
};