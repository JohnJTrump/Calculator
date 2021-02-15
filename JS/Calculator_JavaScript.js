//----------------------------------------------------------------------------------------
//                  Caculator JavaScript
//----------------------------------------------------------------------------------------

const Calculator = { //creates an object to keep track ov values
    Display_Value: '0', // this displays 0 on the scren
    First_Operand: null, //This will hold the first operand for any expressions, it is set to null for now.
    Wait_Second_Operand: false, //This checks whether or not the second operand has been input
    operator: null,  //This will hold the operator, it is set to null for now.
};

function Input_digit(digit) { //This modifies values each time a button is clicked.
    const { Display_Value, Wait_Second_Operand } = Calculator; 
    if (Wait_Second_Operand === true) { //Checking to see if Wait_Second_Operand is true and set Display_Value to the key that was clicked.
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else { //This overwrites Display_Value if the current value is 0, otherwise it adds onto it.
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit; 
    }
}

function Input_Decimal(dot) { //This senction handles decimal points.
    if (Calculator.Wait_Second_Operand === true) return; //This ensures that accidental clicking of the decimal point doesnt cause bugs in operation.
    if(!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot; //This is saying if Display_Value does not contain a decimal point we want to add a decimal point.
    }
}

function Handles_Operator(Next_Operator) { //This senction handles operators.
    const { First_Operand, Display_Value, operator } = Calculator //when an operator jey is pressed, it converts the current number displayed on screen to a number 
    const Value_of_Input = parseFloat(Display_Value);               // and then stores the result in Calculator.First_Operand if it doesnt already exist.
    if (operator && Calculator.Wait_Second_Operand) { //Checks if an operator already exists and if Wait_Second_Operand is true
        Calculator.operator = Next_Operator;            //then updates the operator and exits from the function.
        return;
    }                                                 
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {  //checks if an operator already exits.
        const Value_Now = First_Operand || 0;
        let result = Perform_Calculation[operator](Value_Now, Value_of_Input);              //if operator exists, property lookup is performed for the operator in the 
        result = Number(result) .toFixed(9) //adds fixed amount of numbers after decimal.   //Perform_Calculation object and the function that matches the operator is executed.
        result = (result * 1).toString() //removes any trailing 0's
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }                                                                              
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,

    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,

    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,

    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,

    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

function Update_Display() { //Updates the screen with the contents of Display_Value
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display(); //
const keys = document.querySelector('.calculator-keys'); // This section monitors button clicks.
keys.addEventListener('click', (event) => {
    const { target } =event; //The target variable is an pbject that represents the element that was clicked.
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        Handles_Operator(target.value);
        Update_Display();
        return;
    }
    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }
    Input_digit(target.value);
    Update_Display()
})       