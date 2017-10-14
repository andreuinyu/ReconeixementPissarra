/**
 * Created by andre on 13/10/2017.
 */

function gauss() {
    return 1+((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}

function sigmoid(x) {
    return 1/(1+Math.exp(-x));
}

function signe(x){
    if (x >= 0){
        return 1;
    }else{
        return -1;
    }
}

function dsigmoid(x) {
    return x*(1-x);
}

function dtanh(x) {
    return 1/Math.pow(Math.cosh(x),2)
}

function muta(x) {
    if (Math.random() < 0.95){
        return x + gauss()*0.5;
    }else{
        return x;
    }
}

function NeuralNetwork(inp, hid, out, ritme=0.1, act=sigmoid){
    this.inp = inp;
    this.hid = hid;
    this.out = out;
    this.wih = new Matriu(this.hid, this.inp);
    this.who = new Matriu(this.out, this.hid);
    this.wih.aleatoritza();
    this.who.aleatoritza();
    this.ritme = ritme;
    this.act = act;

    if (act == sigmoid){
        this.dact = dsigmoid;
    }else if (act == Math.tanh){
        this.dact = dtanh;
    }else{
        this.dact = x => 0;
    }

    NeuralNetwork.prototype.muta = function() {
        this.wih = Matriu.mapa(this.wih, muta);
        this.who = Matriu.mapa(this.who, muta);
    }

    NeuralNetwork.prototype.educa = function(inputs_ll, targets_ll){
        let inputs = Matriu.a_matriu(inputs_ll);
        let targets = Matriu.a_matriu(targets_ll);

        let hid_inputs = Matriu.prod(this.wih, inputs);
        let hid_outputs = Matriu.mapa(hid_inputs, this.act);
        let out_inputs = Matriu.prod(this.who, hid_outputs);
        let outputs = Matriu.mapa(out_inputs, this.act);

        let err = Matriu.sub(targets, outputs);
        let hid_err = Matriu.prod(this.who.tr(), err);

        let grad_output = Matriu.mapa(outputs, this.dact);
        grad_output.mul(hid_err);
        grad_output.mul(this.ritme);
        let grad_hidout = Matriu.mapa(hid_outputs,this.dact);
        grad_hidout.mul(hid_err);
        grad_hidout.mul(this.ritme);

        this.who.add(Matriu.prod(grad_output, hid_outputs.tr()));
        this.wih.add(Matriu.prod(grad_hidout, inputs.tr()));
    }

    NeuralNetwork.prototype.previsio = function (inputs_ll) {
        let inputs = Matriu.a_matriu(inputs_ll);
        let hid_inputs = Matriu.prod(this.wih, inputs);
        let hid_outputs = Matriu.mapa(hid_inputs, this.act);
        let out_inputs = Matriu.prod(this.who, hid_outputs);
        return Matriu.mapa(out_inputs, this.act);
    }

}