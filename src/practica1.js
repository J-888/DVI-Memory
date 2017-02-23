/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs){

	//MemoryGame(gs)
	//initGame()
	//draw()
	//loop()
	//onClick(cardId)

};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id){

	this.spriteId = id;
	this.isFlippedUp = false;
	this.isFound = false;

	/**
	 * Da la vuelta a la carta, cambiando el estado de la misma
	 */
	this.flip = function(){
		this.isFlippedUp = true;
	}

	/**
	 * Marca una carta como encontrada, cambiando el estado de la misma
	 */
	this.found = function(){
		this.isFound = true;
	}

	/**
	 * Compara dos cartas, devolviendo true si ambas representan la misma carta
	 * @param {MemoryGameCard} segunda carta
	 */
	this.compareTo = function(otherCard){
		return this.spriteId == otherCard.otherCard;
	}



	/**
	 * Dibuja la carta de acuerdo al estado en el que se encuentra.
	 * Recibe como parámetros el servidor gráfico y la posición en la que se
	 * encuentra en el array de cartas del juego (necesario para dibujar una
	 * carta).
	 * @gs 
	 * @pos 
	 */
	this.draw = function(gs, pos){
		return this.spriteId == otherCard.otherCard;
	}
};
