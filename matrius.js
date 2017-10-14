function Matriu(files, columnes) {
	this.f = files;
	this.c = columnes;

    	let result = [];
    	for(var i = 0; i < columnes; i++) {
		result.push(new Array(files).fill(0));
    	}
    	this.matriu = result;

	this.aleatoritza =  function(){
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				this.matriu[i][j] = gauss(1, 1); //afegir gauss
	    		}
		}
	}

	this.allista = function(){
		var ll = []
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				ll.push(this.matriu[i][j]);
	    		}
		}
		return ll;
	}

	this.tr = function(){
	//transposada
		resultat = new Matriu(this.c, this.f);
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				resultat.matriu[i][j] = this.matriu[j][i];
	    		}
		}
		this.matriu = resultat.matriu;
		return resultat;

	}

	this.copia = function(){
		resultat = new Matriu(this.f, this.c)
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				esultat.matriu[i][j] = this.matriu[i][j];
	    		}
		}
		return resultat;
	}

	this.add = function(altre){
		if (typeof altre ==='object'){
		    for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				this.matriu[i][j] += altre.matriu[i][j];
	    		}
		    }
		}else{
		     for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				this.matriu[i][j] += altre;
	    		}
		    }
		}
		return this;
	}

	this.sub = function(altre){
		var nou_altre = altre.mul(-1);
		return this.add(nou_altre);
	}

	this.mul = function(altre){
		if (typeof altre ==='object'){
		    for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				this.matriu[i][j] *= altre.matriu[i][j];
	    		}
		    }
		}else{
		     for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				this.matriu[i][j] *= altre;
	    		}
		    }
		}
		return this;
	}
}

function mapa(m, func){
	//Aplica una funció donada a cada valor
	var resultat = new Matriu(m.f, m.c);
	for(var i = 0; i < resultat.f; i++) {
		resultat.matriu[i] = m.matriu[i].map(Math.exp);
	}
	return resultat;
}
	
function prod(a, b){
    //Producte matricial
    if (a.c != b.f){
        console.log("Tamanys erronis");
        return;
    }
    var resultat = new Matriu(a.f, b.c);
    for(var i = 0; i < resultat.f; i++) {
	for(var j = 0; j < resultat.c; j++) {
            var suma = 0;
            	for(var k = 0; k < a.c; k++) {
                	suma += a.matriu[i][k] * b.matriu[k][j];
		}
            	resultat.matriu[i][j] = suma;
	}
    }
    return resultat;
}

function a_matriu(ll){
    var m = new Matriu(len(ll),1)
    for (var i = 0; i < len(ll); i++) {
	m.matriu[i][0] = ll[i];
    }
    return m;
}
