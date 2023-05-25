function main() {
    let total;
    let input = '';
    let currOp;
    let prevOp;
    let lastPressed;
    let nodeList = document.querySelectorAll('.btn');
    let text = document.getElementById('text');
    let acBtn = document.getElementById('ac');
    let cBtn = document.getElementById('c');
    let eqBtn = document.getElementById('equals');
    let dotBtn = document.getElementById('dot');

    for (const node of nodeList) {
        if (node.classList.contains('number')) {
            node.addEventListener('click', e => {
                if (lastPressed === 'eq') {
                    input = '';
                }
                input += e.target.value;
                text.innerText = input;
                lastPressed = 'number';
            });
        }
        else if (node.classList.contains('op')) {
            node.addEventListener('click', e => {
                prevOp = currOp;
                currOp = e.target.value;
                if (lastPressed !== 'number') {
                    return;
                }
                lastPressed = 'op'
                let inputVal = Number(input);
                total = Number(calculate(total, inputVal, prevOp == undefined ? currOp : prevOp).toFixed(8));
                text.innerText = total;
                input = '';
            });
        }
    }

    eqBtn.addEventListener('click', e => {
        lastPressed = 'eq'
        let inputVal = Number(input);
        total = Number(calculate(total, inputVal, currOp).toFixed(8));
        text.innerText = total;
        input = `${total}`;
    });;

    acBtn.addEventListener('click' , e => {
        total = undefined;
        input = '';
        currOp = undefined;
        prevOp = undefined;
        lastPressed = undefined;
        text.innerText = '';
    });

    cBtn.addEventListener('click' , e => {
        input = '';
        text.innerText = '';
    });

    dotBtn.addEventListener('click' , e => {
        input += e.target.value;
        text.innerText = input;
        lastPressed = 'number';
    });
    
}

function calculate(num1, num2, op) {
    num1 = Number(num1);
    num2 = Number(num2);
    
    //num1 is NaN when total = undefined
    if (isNaN(num1)) {
        return num2;
    }

    if (op === '+') {
        return num1 + num2;
    }
    else if (op === '-') {
        return num1 - num2;
    }
    else if (op === 'x') {
        return num1 * num2;
    }
    else if (op === '/') {
        return num1 / num2;
    }
    else if (op === '%') {
        return num1 % num2;
    }
}


main();