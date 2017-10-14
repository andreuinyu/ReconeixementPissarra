/**
 * Created by andre on 14/10/2017.
 */

var samples = new Array(10);
for (let i = 0; i< 10; i++){
    samples[i] = new Array();
}
var jsons = new Array(10);
var examen = [];
var nn = new NeuralNetwork(784, 16, 10, 0.001, Math.tanh);
let volum = 601;

function preload(){

    jsons[0] = loadJSON('nombres/0.json',done0);
    function done0(data0) {
        for (let j = 0; j < volum; j++){
            samples[0].push(data0["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[1] = loadJSON('nombres/1.json',done1);
    function done1(data1) {
        for (let j = 0; j < volum; j++){
            samples[1].push(data1["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[2] = loadJSON('nombres/2.json',done2);
    function done2(data2) {
        for (let j = 0; j < volum; j++){
            samples[2].push(data2["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[3] = loadJSON('nombres/3.json',done3);
    function done3(data3) {
        for (let j = 0; j < volum; j++){
            samples[3].push(data3["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[4] = loadJSON('nombres/4.json',done4);
    function done4(data4) {
        for (let j = 0; j < volum; j++){
            samples[4].push(data4["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[5] = loadJSON('nombres/5.json',done5);
    function done5(data5) {
        for (let j = 0; j < volum; j++){
            samples[5].push(data5["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[6] = loadJSON('nombres/6.json',done6);
    function done6(data6) {
        for (let j = 0; j < volum; j++){
            samples[6].push(data6["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[7] = loadJSON('nombres/7.json',done7);
    function done7(data7) {
        for (let j = 0; j < volum; j++){
            samples[7].push(data7["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[8] = loadJSON('nombres/8.json',done8);
    function done8(data8) {
        for (let j = 0; j < volum; j++){
            samples[8].push(data8["data"].slice(j*784, (1+j)*784));
        }
    }
    jsons[9] = loadJSON('nombres/9.json',done9);
    function done9(data9) {
        for (let j = 0; j < volum; j++){
            samples[9].push(data9["data"].slice(j*784, (1+j)*784));
        }
    }
}

function setup(){
    createCanvas(28, 28);
    noLoop();

    for (let k = 0; k < 10; k++){
        let resposta = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
        resposta[k] = 1;
        for (let h = 0; h < samples[k].length-2; h++){
            nn.educa(samples[k][h], resposta);
        }
        let prob = samples[k][samples[k].length - 1];
        examen.push(prob);
    }

}

function draw(){
    let indefinides = 0;
    for (let x = 0; x < 10; x++){
        for (let y = 0; y < volum; y++){
            if(samples[x][y] == undefined) {
                indefinides++;
            }
        }
    }
    console.log(indefinides);
    for (let i = 0; i < 10; i++){
        let numero = examen[i];
        //drawnumber(numero);
        console.log(nn.previsio(numero).matriu);
    }
    //console.log(frameCount);
}

function drawnumber(number) {
    noStroke();
    for (let i = 0; i < 784; i++) {
        let c = (1 - number[i]) * 255;
        fill(c, c, c);
        rect(i % 28, Math.floor(i / 28), 1, 1);
    }
}


