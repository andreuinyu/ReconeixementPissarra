function gauss() {
	return 1+((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}

function Matriu(files, columnes) {
	this.f = files;
	this.c = columnes;

	this.matriu = new Array(files);
	for (var i = 0; i < this.f; i++) {
		this.matriu[i] = new Array(columnes);
		for (var j = 0; j < this.c; j++) {
			this.matriu[i][j] = 0;
		}
	}

	Matriu.prototype.aleatoritza =  function(){
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				this.matriu[i][j] = gauss();
	    	}
		}
	};

	Matriu.prototype.allista = function(){
		var ll = [];
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++){
				ll.push(this.matriu[i][j]);
	    	}
		}
		return ll;
	};

	Matriu.prototype.tr = function(){
	//transposada
		var resultat = new Matriu(this.c, this.f);
		for(var i = 0; i < resultat.f; i++) {
			for (var j = 0; j < resultat.c; j++) {
				resultat.matriu[i][j] = this.matriu[j][i];
			}
		}
		return resultat;
	};

	Matriu.prototype.copia = function(){
		var resultat = new Matriu(this.f, this.c);
		for(var i = 0; i < this.f; i++) {
			for(var j = 0; j < this.c; j++) {
				resultat.matriu[i][j] = this.matriu[i][j];
	    		}
		}
		return resultat;
	};

	Matriu.prototype.add = function(altre){
		if (altre instanceof Matriu){
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
	};

	Matriu.prototype.sub = function(altre){
		var nou_altre = altre.mul(-1);
		return this.add(nou_altre);
	};

	Matriu.prototype.mul = function(altre){
		if (altre instanceof Matriu){
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
	};
}

Matriu.mapa = function(m, func){
	//Aplica una funció donada a cada valor
	var resultat = new Matriu(m.f, m.c);
	for (var i = 0; i < resultat.f; i++) {
		for (var j = 0; j < resultat.c; j++) {
			resultat.matriu[i][j] = func(m.matriu[i][j]);
		}
	}
	return resultat;
}

Matriu.sub = function(a, b) {
	var resultat = new Matriu(a.f, a.c);
	for (var i = 0; i < resultat.f; i++) {
		for (var j = 0; j < resultat.c; j++) {
			resultat.matriu[i][j] = a.matriu[i][j] - b.matriu[i][j];
		}
	}
	return resultat;
}
Matriu.prod = function(a, b){
    //Producte matricial
    if (a.c != b.f){
		throw "Tamanys Erronis"
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

Matriu.a_matriu = function(ll){
    let m = new Matriu(ll.length, 1);
    for (let i = 0; i < ll.length; i++) {
		m.matriu[i][0] = parseFloat([i]);
	}
    return m;
}
