document.addEventListener('DOMContentLoaded' , function(){
	
    let currentNumber = '';
    let currentOperator = '';
    let result = '';
    let decimalFlag = false;
    let operatorFlag=false;
    let chainNumbers = '';
	let TEST1='';
	let TEST2='';

    const numbers = document.querySelectorAll('.number'); //console.log('numbers', numbers);
    const operators = document.querySelectorAll('.operator'); //console.log('operators', operators);
    const equals = document.getElementById('equals'); //console.log('equals', equals);
    const clear = document.getElementById('clear'); //console.log('clear', clear);
    const display = document.getElementById('display'); //console.log('display', display);
    const decimal = document.getElementById('decimal'); //console.log('decimal', decimal);

    function operatePerform(num1, num2, oper) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (oper) {
            case '/':  let result = num1 / num2; return result.toFixed(4)
            case '*': return num1 * num2;
            case '+': return num1 + num2;
            case '-': return num1 - num2;
        }
    }
    function updateDisplay() {
        display.value = chainNumbers;

    }


    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            if (!operatorFlag) {
                if(number.value ==='0' && currentNumber===''){
                    chainNumbers = ''
                }else{
                    currentNumber = number.value
                    TEST1 += number.value
                    chainNumbers += currentNumber;  
                }
                             
            } else {
                if(number.value === '0' && result === ''){
                    chainNumbers += ''
                }else{
                    operatorFlag = false;
                result = number.value;
				TEST2 += number.value
                chainNumbers += result;
                }
                
            }
				updateDisplay();
				decimalFlag = false;
        })
    })
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (!operatorFlag){
                operatorFlag=true;
                currentOperator = operator.value
                chainNumbers += currentOperator;
                //console.log('currentOperator', currentOperator)
            }else{
                if(operator.value==='+' || operator.value==='*' || operator.value==='/'){
                    let index = chainNumbers.lastIndexOf(currentOperator);
                    chainNumbers = chainNumbers.slice(0,index);
                    currentOperator = operator.value ;
                    chainNumbers += currentOperator;
                    //console.log('chainNumbers', chainNumbers)
                }
                if(operator.value ==='-'){
                    chainNumbers +='(-'
                }                
            } 
			TEST1='';
			TEST2='';
            //console.log('currentOperator', currentOperator)
            updateDisplay();
            decimalFlag = false;
			//console.log('currentNumber', currentNumber, 'chainNumbers', chainNumbers,'currentOperator',currentOperator)
        })
    })
    decimal.addEventListener('click', () => {
        if (!decimalFlag) {
				let regex = /\.+/;			
				if (currentOperator===''){
					if (TEST1.length === 0 && !regex.test(TEST1) ) {
						TEST1 += '0.'
						chainNumbers += '0.'
					}else if (TEST1.length !== 0 && !regex.test(TEST1) ){
						TEST1 += '.';
						chainNumbers += '.' ;
				}}
				else{
					if (TEST2.length === 0 && !regex.test(TEST2)) {
						TEST2 += '0.'
						chainNumbers += '0.';
					}else if(TEST2.length !== 0 && !regex.test(TEST2)) {
						TEST2 += '.'
						chainNumbers += '.';	
				}}
		}				            			
		decimalFlag = true;  
    })



    equals.addEventListener('click', () => {
        let operateRegex = /[*/+-]/g;
        let operators = chainNumbers.match(operateRegex);//console.log('operators',operators)
        const numbers = chainNumbers.split(operateRegex);//console.log('numbers',numbers)
        const resultArray = [];
       
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] !== '('){
                resultArray.push(numbers[i]);
                if (i < operators.length) {
                    resultArray.push(operators[i]);
                }
            }else{
                resultArray.push(-numbers[i+1]+ '')
                numbers.splice(i,1)
                if(i+1 <operators.length){
                    resultArray.push(operators[i+1])
                    operators.splice(i,1)
                }
                
            }
        }
        console.log('resultArray',resultArray)


        for (let i = 1; i < resultArray.length; i += 2) {
            if (resultArray[i] === '*' || resultArray[i] === '/') {
                const oper = resultArray[i];
                const num1 = parseFloat(resultArray[i - 1]);
                const num2 = parseFloat(resultArray[i + 1]);
                const temp2 = operatePerform(num1, num2, oper)+'';
                resultArray.splice(i - 1, 3, temp2);
                console.log(resultArray)
                i -= 2; // Adjust the loop index
            }
        }
        let temp = parseFloat(resultArray[0]);
        for (let i = 1; i < resultArray.length; i += 2) {
            const oper = resultArray[i];
            const num = parseFloat(resultArray[i + 1]);
            temp = operatePerform(temp, num, oper)+'';
        }
        console.log(temp)
        display.value = temp;
        currentNumber = '';
        currentOperator = '';
        chainNumbers = '';
        result = '';
        decimalFlag = false;

    });

    clear.addEventListener('click', () => {
        currentNumber = '';
        currentOperator = '';
        result = '';
        chainNumbers = '';
        display.value = '0';
        decimalFlag = false;
        console.log(display.value)
    });
})