const calculator = {
    add (arr)       {return arr.length ? arr.reduce((a,b) => a + b) : 0;},
    subtract (arr)  {return arr.length ? arr.reduce((a,b) => a - b) : 0;},
    multiply (arr)  {return arr.length ? arr.reduce((a,b) => a * b) : 0;},
    divide (arr)  {return arr.length ? arr.reduce((a,b) => a / b) : 0;},
}
display = document.querySelector('.display');
display.clear = function() {this.textContent = 0};
display.update = function (displayValue) {this.textContent = displayValue};

function operate(operator,a,b) {
    switch(operator) {
        case '+': if (!a) a = 0; return calculator.add([a,b]);
        case '-': if (!a) a = 0; return calculator.subtract([a,b]);
        case '*': if (!a) a = 1; return calculator.multiply([a,b]);
        case '/': if (!a) a = 1; return calculator.divide([a,b]);
        default: return b;
    }
}

display.clear();

function addTransition(element,className) {
    element.classList.add(className);
}
function removeTransition(element,className) {
    element.classList.remove(className);
}

let res, operator, regOp;
let calculated = true;


// Operation Buttons
const btnsOp = document.querySelectorAll('.btn-op');
btnsOp.forEach(btnOp => {
    btnOp.addEventListener('click',event => {

        // Transitions
        btnsOp.forEach(btnOp => removeTransition(btnOp,'op-selected'));
        if (btnOp.id != 'btn-op__show') addTransition(btnOp,'op-selected');

        switch (btnOp.id) {
            case 'btn-op__add':         operator = '+'; break;
            case 'btn-op__subtract':    operator = '-'; break;
            case 'btn-op__multiply':    operator = '*'; break;
            case 'btn-op__divide':      operator = '/'; break;
            case 'btn-op__show':        operator = '='; break;
        }
        
        if(!calculated) {
            res = operate(regOp,res,+display.textContent);
            display.update(res);
            calculated = true;
        }

    });
});

// Number Buttons
const btnsNum = document.querySelectorAll('.btn-num');
btnsNum.forEach(btnNum => {
    btnNum.addEventListener('click', event => {
        
        // Transition
        document.querySelector('#btn-stat__clear').textContent = 'C';
        
        
        if (display.textContent == '0' || calculated == true) {
            display.update(btnNum.value);
        } else if (display.textContent.length < 9) {
            display.update(display.textContent + btnNum.value);
        }
        
        calculated = false;

        (!operator) ? regOp = '=' : regOp = operator;   // Saves last operation

    });
});

// Other Buttons
const btnsStat = document.querySelectorAll('.btn-stat');
btnsStat.forEach(btnStat => {
    btnStat.addEventListener('click',event => {
        switch (btnStat.id) {
            case 'btn-stat__percentage': 
                display.update(+(display.textContent/10));
                break;
            case 'btn-stat__clear':
                res = undefined;
                display.clear();
                btnStat.textContent = 'AC';
                btnsOp.forEach(btnOp => removeTransition(btnOp,'op-selected'));
                break;
            case 'btn-stat__signal':
                display.update(-display.textContent);
                break;
            default: 
                break;

        } 
    });
});