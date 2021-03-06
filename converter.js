//===========================================
// Helper functions/variables.
//===========================================

// Order is according to PEDMAS.
const operators = ["^","/","*","+","-"];
const parentheses = ["(", ")"];

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

 /**
 * Converts the string into an array after removing all spaces.
 * @param {string} aString 
 * @param {string[]}
 */
function stringToArray(aString)
{
    return aString.split(" ").join("").split("");
}

//===========================================
// Underlying logic.
//===========================================

/**
 * Infix to postfix converter implemented using Dijkstra's
 * shunting-yard algorithm.
 * @param {string[]} anArr The infix input
 * @returns {string} The equivalent postfix expression.
 */
function infixArrayToPostfix(anArr)
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

/**
 * Converts an array of chars of an infix expression to the equivalent prefix expression.
 * @param {string[]} anArr An array of characters that make up the mathematical expression.
 * @returns {string} A string in prefix notation.
 */
function infixArrayToPrefix(anArr)
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
 * Takes the array (in postfix) and converts it into an equivalent infix notation.
 * @param {string[]} anArr 
 * @returns {string} The infix equivalent.
 */
 function postfixArrayToInfix(anArr)
 {
	 let stack = new Array();
	 let shiftedValue;
 
	 while(anArr.length > 0)
	 {
		 shiftedValue = anArr.shift();
		 if (! operators.includes(shiftedValue))
		 {
			 stack.push(shiftedValue);
		 }
		 else
		 {
			 let a = stack.pop();
			 let b = stack.pop();
			 stack.push(`(${b} ${shiftedValue} ${a})`);
		 }
	 }
 
	 return stack[0];
 }

/**
 * Takes the array (in prefix) and converts it into an equivalent infix notation.
 * @param {string[]} anArr 
 */
 function prefixArrayToInfix(anArr)
 {
     let stack = new Array();
     let shiftedValue;
 
     while(anArr.length > 0)
     {
         shiftedValue = anArr.pop();
         if (! operators.includes(shiftedValue))
         {
             stack.push(shiftedValue);
         }
         else
         {
             let a = stack.pop();
             let b = stack.pop();
             stack.push(`(${a} ${shiftedValue} ${b})`);
         }
     }
 
     return stack[0];
 }

//===========================================
// Interface.
//===========================================

/**
 * @param {string} expression The infix expression.
 * @returns {string} The expression as an equivalent posfix expression.
 */
function infixStringToPostfix(expression)
{
    return infixArrayToPostfix(stringToArray(expression)).join(" ");
}

/**
 * @param {string} expression The infix expression.
 * @returns {string} The expression as an equivalent prefix expression.
 */
function infixStringToPrefix(expression)
{
    return infixArrayToPrefix(stringToArray(expression)).join(" ");
}

/**
 * @param {string} expression The postfix expression.
 * @returns {string} The expression as an equivalent prefix expression.
 */
function postfixStringToInfix(expression)
{
    return postfixArrayToInfix(stringToArray(expression));
}

/**
 * @param {string} expression The prefix expression.
 * @returns {string} The expression as an equivalent infix expression.
 */
function prefixStringToInfix(expression)
{
    return prefixArrayToInfix(stringToArray(expression));
}

