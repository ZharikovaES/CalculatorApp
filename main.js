function main(){
    let arrButton = document.querySelectorAll(".calculator-numbers__btn");
    for(let i = 0; i < arrButton.length; i++){
        arrButton[i].addEventListener("click", () => {
            let valueBtn = arrButton[i].getAttribute("value");
            calc(valueBtn);
        });
    }
}
function calc(valueBtn){
    let input = document.querySelector('input');
    let output = document.querySelector('output[name=result]');
    let valueInput = input.value;
    const regexp = [/(([^\)\=0])|(\.\d*)|([1-9]+\d*))$/,
                        /[1-9]/,
                        /(\.\d*|[1-9]+\d*|[^\d\(\)\=])$/,
                        /((\.\d+)|(\.))$/,
                        /\d$/,
                        /\./,
                        /(\d|\))$/,
                        /([^\d\(\)\.(del)\=])$/,
                        /(^((\d+\.\d+)|\d+)$)|((\(((\d+\.\d+)|\d+)|\)|(\).+?((\.\d+)|\d+))|((\.\d+)|\d+))$)/,
                        /((\d+\.\d+)|\d+|\))$/,
                        /[^\.]$/
                    ];
    // проверка поля ввода при добавлении нового символа
    if ((valueInput.length == 0 || regexp[0].test(valueInput)) && regexp[1].test(valueBtn)
     || (valueBtn == '0' && (valueInput.length == 0 || regexp[2].test(valueInput)))
     || !(regexp[3].test(valueInput)) && regexp[4].test(valueInput) && regexp[5].test(valueBtn)
     || regexp[6].test(valueInput) && regexp[7].test(valueBtn)){
        valueInput += valueBtn;
    }
    // добавление скобки
    if (valueBtn == '()'){
        let a = valueInput.split("(").length - 1;
        let b = valueInput.split(")").length - 1;            
        if (a == b && regexp[8].test(valueInput)){
            valueInput += "*(";
        } else if (a > b && regexp[9].test(valueInput)){
            valueInput += ")";
        } else if (regexp[10].test(valueInput) || valueInput.length == 0){
            valueInput += "(";
        }
    // удаление символа
    } else if (valueBtn == 'del'){
        valueInput = valueInput.substring(0, valueInput.length - 1);
    // очистка поля ввода
    } else if (valueBtn == 'C'){
        valueInput = '';
    }
    input.value = valueInput;
    try{
        // расчет выражения
        let result = eval(valueInput);
        if (!isNaN(result)){
            output.value = result.toFixed(10);
        }
    } catch(e){
        input.value = valueInput;
    }
        // расчет выражения при нажатии =
    if (valueBtn == '='){
        try{
            let result = eval(valueInput);
            if (!isNaN(result)){
                let resultFixed = result.toFixed(10);
                input.value = resultFixed;
                output.value = resultFixed;
            }
        } catch(e){
            input.value = valueInput;
        }    
    }
    if (input.value == ''){
        output.value = '';
    }
}

main();
