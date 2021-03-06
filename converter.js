
// Order is according to PEDMAS.
const operators = ["^","/","*","+","-"];
const parentheses = ["(", ")"];

/**
 * Infix to postfix converter implemented using Dijkstra's
 * shunting-yard algorithm.
 * @param {Array<string>} anArr The infix input
 */
function infixToPostfix(anArr)
{
    let stack = new Array();
    let output = new Array();
    let shiftedValue;

    while (anArr.length > 0)
    {
        shiftedValue = anArr.shift();

        // Add to output if value is a number or variable.
        if (! operators.includes(shiftedValue) && ! parentheses.includes(shiftedValue))
        {
            output.push(shiftedValue);
        }
        // Handle case if it is an operator.
        else if (operators.includes(shiftedValue))
        {
            // Pop operator stack.
            while(stack.length > 0 && !isTopLeftParenthesis(stack) && !hasPriority(shiftedValue, stack))
            {
                output.push(stack.pop());
            }

            // Push operator to the stack.
            stack.push(shiftedValue);
        }
        // Add left parenthesis.
        else if (shiftedValue == "(")
        {
            stack.push(shiftedValue);
        }
        // Add right parenthesis.
        else if (shiftedValue == ")")
        {
            // Add all values to stack until reaching opening parenthesis.
            while (stack.length > 0 && !isTopLeftParenthesis(stack))
            {
                output.push(stack.pop());
            }

            // Discard opening parenthesis.
            stack.pop();
        }
    }

    // Pop remaining operators.
    while (stack.length > 0)
    {
        output.push(stack.pop());
    }

    return output;
}

/** Helper function to check stack top. Improves readability.
 * @param {string[]} stack 
 * @returns {boolean} True if the top of the stack is "(". False otherwise.
 */
function isTopLeftParenthesis(stack)
{
    return stack[stack.length - 1] == "(";
}

/** Helper function to check stack top. Improves readability.
 * @param {string[]} stack 
 * @returns {boolean} True if the top of the stack is ")". False otherwise.
 */
 function isTopRightParenthesis(stack)
 {
     return stack[stack.length - 1] == ")";
 }

/** Helper function that checks for priority and improves readability.
 * @param {string} value 
 * @param {string[]} stack 
 * @returns {boolean} True if the operator in value has precedence over the top value in stack.
 */
function hasPriority(value, stack)
{
    let valuePriority = operators.indexOf(value);
    let topPriority = operators.indexOf(stack[stack.length-1]);
    return valuePriority < topPriority
}

function infixToPrefix(anArr)
{
    let stack = new Array();
    let output = new Array();
    let shiftedValue;

    // Reversing array.
    anArr = anArr.reverse();

    while (anArr.length > 0)
    {
        shiftedValue = anArr.shift();

        // Add to output if value is a number or variable.
        if (! operators.includes(shiftedValue) && ! parentheses.includes(shiftedValue))
        {
            output.push(shiftedValue);
        }
        // Handle case if it is an operator.
        else if (operators.includes(shiftedValue))
        {
            // Pop operator stack.
            while(stack.length > 0 && !isTopRightParenthesis(stack) && !hasPriority(shiftedValue, stack))
            {
                output.push(stack.pop());
            }

            // Push operator to the stack.
            stack.push(shiftedValue);
        }
        // Add left parenthesis.
        else if (shiftedValue == ")")
        {
            stack.push(shiftedValue);
        }
        // Add right parenthesis.
        else if (shiftedValue == "(")
        {
            // Add all values to stack until reaching closing parenthesis.
            while (stack.length > 0 && !isTopRightParenthesis(stack))
            {
                output.push(stack.pop());
            }

            // Discard opening parenthesis.
            stack.pop();
        }
    }

    // Pop remaining operators.
    while (stack.length > 0)
    {
        output.push(stack.pop());
    }

    return output.reverse();
}

/**
 * Converts the string into an array after removing all spaces.
 * @param {String} aString 
 */
function stringToArray(aString)
{
    return aString.split(" ").join("").split("");
}

function stringToPostfix(expression)
{
    return infixToPostfix(stringToArray(expression)).join(" ");
}

function stringToPrefix(expression)
{
    return infixToPrefix(stringToArray(expression)).join(" ");
}

let expression = "(3 + 4) * (2 + 1)";

console.log(stringToPostfix(expression));
console.log(stringToPrefix(expression));
