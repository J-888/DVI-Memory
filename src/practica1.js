/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 * Recibe como parametro el rervidor grafico, usado posteriormente para dibujar
 */
MemoryGame = function(gs){

	this.graphicServer = gs;
	this.currentStatus = 0;
	this.cardList = [];
	this.cardsTmpUp = [];
	this.cardNumber;
	this.messageTittle;
	this.cardsFoundNum = 0;

	/**
	 * Inicializa el juego creando las cartas (2 de cada tipo de carta),
	 * desordenándolas y comenzando el bucle de juego	 
	 */
	this.initGame = function(){
		this.messageTittle = "Memory Game";
		this.buildDeck();
		this.shuffleCards();
		this.loop();
	}

	/**
	 * Dibuja el juego:
	 * 1- Escribe el mensaje con el estado actual del juego
	 * 2- Pide a cada una de las cartas del tablero que se dibujen 
	 */
	this.draw = function(){
		this.graphicServer.drawMessage(this.messageTittle);
		for (var i = 0; i < this.cardNumber; i++)
			    this.cardList[i].draw(this.graphicServer, i);
	}

	/**
	 * El bucle del juego. Lanza el metodo draw cada 16ms (60fps) 
	 */
	this.loop = function(){ //con setInterval
		var self = this; 
		setInterval(function(){self.draw()}, 16);
	}

	/**
	 * se llama cada vez que el jugador pulsa sobre alguna de las cartas
	 * (identificada por el numero que ocupa en el array de cartas del juego)
	 * Es el responsable de voltear la carta, y si hay dos volteadas, comprobar si son la misma
	 * Si es asi, las marcara como encontradas. Si no, las pone boca abajo
	 */
	this.onClick = function(cardId){
		if(cardId != null && cardId >= 0 && cardId < this.cardNumber){
			 if(this.currentStatus == 0){			//0 cards up
				if(!this.cardList[cardId].ifFound && !this.cardList[cardId].isFlippedUp){
					this.cardList[cardId].flip();
					this.cardsTmpUp.push(cardId);

					this.currentStatus = 1;
				}
			}
			else if(this.currentStatus == 1){	//1 card up
				if(!this.cardList[cardId].ifFound && !this.cardList[cardId].isFlippedUp){
					this.cardList[cardId].flip();

					if(this.cardList[cardId].compareTo(this.cardList[this.cardsTmpUp[0]])){
						this.cardList[cardId].found();
						this.cardList[this.cardsTmpUp[0]].found();
						this.cardsTmpUp = [];
						this.cardsFoundNum += 2;
						if (this.cardsFoundNum < this.cardNumber)
							this.messageTittle = "Match found!!";
						else
							this.messageTittle = "You Win!!";
						this.currentStatus = 0;
					}
					else{
						this.cardsTmpUp.push(cardId);
						this.messageTittle = "Try again";
						this.currentStatus = 2;
						//setTimeout(this.currentStatus = this.flipBack,1000, this.cardList[this.cardsTmpUp[0]], this.cardList[this.cardsTmpUp[1]], this.cardsTmpUp);
						setTimeout(this.flipBack,1000, this);
					}
				}
			}
			else if(this.currentStatus == 2){		//2 different cards up (to skip mem timer)
				
			}
		}
	}

	this.flipBack = function(game){
		game.cardList[game.cardsTmpUp[0]].flip();
		game.cardList[game.cardsTmpUp[1]].flip();
		game.cardsTmpUp = [];
		game.currentStatus = 0;
	}

	this.shuffleCards = function() {
	    for (var i = this.cardNumber - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = this.cardList[i];
	        this.cardList[i] = this.cardList[j];
	        this.cardList[j] = temp;
	    }
    }

	this.buildDeck = function() {
	    this.cardList = [
	    	new MemoryGameCard("8-ball"), 
	    	new MemoryGameCard("8-ball"), 
	    	new MemoryGameCard("potato"), 
	    	new MemoryGameCard("potato"),
	    	new MemoryGameCard("dinosaur"), 
	    	new MemoryGameCard("dinosaur"),
	    	new MemoryGameCard("kronos"), 
	    	new MemoryGameCard("kronos"),
	    	new MemoryGameCard("rocket"), 
	    	new MemoryGameCard("rocket"),
	    	new MemoryGameCard("unicorn"), 
	    	new MemoryGameCard("unicorn"),
	    	new MemoryGameCard("guy"), 
	    	new MemoryGameCard("guy"),
	    	new MemoryGameCard("zeppelin"), 
	    	new MemoryGameCard("zeppelin")
		];
		this.cardNumber = this.cardList.length;
    }
};



/**
 * Constructora de las cartas del juego. 
 * Recibe como parámetro el nombre del sprite que representa la carta.
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
		this.isFlippedUp = !this.isFlippedUp;
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
		return this.spriteId == otherCard.spriteId;
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
		if(!this.isFlippedUp)
			gs.draw("back",pos);
		else
			gs.draw(id,pos);
	}
};

