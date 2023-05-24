function main() {
    let total = 0;
    let input = '';
    let currOp;
    let prevOp;
    let lastPressed;
    let nodeList = document.querySelectorAll('.btn');
    let text = document.getElementById('text');
    let acBtn = document.getElementById('ac');
    let cBtn = document.getElementById('c');
    let eqBtn = document.getElementById('equals');

    for (const node of nodeList) {
        if (node.classList.contains('number')) {
            node.addEventListener('click', e => {
                if (lastPressed === 'eq') {
                    input = '';
                }
                input += e.target.value;
                text.innerText = input;
                lastPressed = 'number'
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
                total = calculate(total, inputVal, prevOp == undefined ? currOp : prevOp);
                text.innerText = total;
                input = '';
            });
        }
    }

    eqBtn.addEventListener('click', e => {
        lastPressed = 'eq'
        let inputVal = Number(input);
        total = calculate(total, inputVal, currOp);
        text.innerText = total;
        input = `${total}`;
    });;

    acBtn.addEventListener('click' , e => {
        total = 0;
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
    
}

function calculate(num1, num2, op) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (isNaN(num1) || isNaN(num2)) {
        return 'ERROR NaN';
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
}


main();