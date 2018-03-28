// Created by Dawid Przywara
const transactionFields = document.querySelectorAll('input');
const transactionName = document.querySelector('#transaction-name');
const eurCurrency = document.querySelector('#eur');
const plnCurrency = document.querySelector('#pln');
const calculateBtn = document.querySelector('button');

let transactionBox;
let total = 0;

let transactionDict = {
    names: [],
    euros: [],
    plns: [],
}

let calculateTransaction = () => {
    transactionDict.names.push(transactionName.value);
    transactionDict.euros.push(Number(eurCurrency.value));
    transactionDict.plns =
    transactionDict.euros.map(a => Number((a*plnCurrency.value).toFixed(2)));
}

let maxField = document.querySelector('#field-max');
let findMax = () => {
    let maxEuro = transactionDict.euros.reduce((a, b) => a > b ? a : b);
    let maxIndex = transactionDict.euros.indexOf(maxEuro);
    let maxName = transactionDict.names[maxIndex];
    let maxPln = transactionDict.plns[maxIndex];

    maxField.innerHTML =
    `<b>Max:</b> ${maxName} - EUR: ${maxEuro} - PLN: ${maxPln}`;
}

let transactionDivs = document.querySelector('#transactions');
let createDiv = () => {
    for(let i in transactionDict.names){
        transactionBox = document.createElement('div');
        transactionBox.className = 'transaction-box';
        transactionDivs.appendChild(transactionBox);

        transactionBox.innerHTML = transactionDict.names[i]+ '</br>' +
        'EUR: ' + transactionDict.euros[i] +
        ' | PLN: ' + transactionDict.plns[i] +
        '<em>Delete</em>';

        document.querySelectorAll('em')[i]
        .addEventListener('click', function(event){
            for(let key in transactionDict){
                 transactionDict[key].splice(i, 1);
             }
             deleteDivs();
             createDiv();
             calculateTotal();
        });
    }
}

let deleteDivs = () => {
    document.querySelector('#transactions').innerHTML = '';
}

let clearValues = () => {
    transactionName.value = '';
    eurCurrency.value = '';
}

let totalField = document.querySelector('#field-total');
let calculateTotal = () => {
    if(transactionDict.names.length > 0){
        total = transactionDict.plns.reduce((a, b) => a+b);
        totalField.innerHTML = `<b>Total:</b> ${total.toFixed(2)} PLN`;
        findMax();
    } else {
        totalField.innerHTML = `<b>Total:</b> 0 PLN`;
        maxField.innerHTML= `<b>Max:</b> There is no transactions`;
    }
}

let initTransaction = () => {
        deleteDivs();
        calculateTransaction();
        createDiv();
        calculateTotal();
        clearValues();
}

plnCurrency.addEventListener('input', function(event){
    deleteDivs();
    plnCurrency.value = Math.round(Number(plnCurrency.value) * 100) / 100;
    transactionDict.plns =
    transactionDict.euros.map(a => Number((a*plnCurrency.value).toFixed(2)));
    createDiv();
    calculateTotal();
});

eurCurrency.addEventListener('input', function(event){
    eurCurrency.value = Math.round(Number(eurCurrency.value) * 100) / 100;
});
