/*
    Notations: We can write mathematical expressions in three way.
    The most obvious and intuitive for us is what's called infix, in which the operator is "in"between the operands.
    Then we have postfix in which the operator comes after (or post) the operands.
    Finally, we have prefix notation where the operator comes before (or pre) the operands.

    Infix: 2 + 3 * 4
    Post Fix: 2 3 4 * +
    Pre Fix: + 2 * 3 4
*/

let arr = ["2","+","3","*","4"];
const operators = ["+","-","*","/"];

/**
 * Converts an infix array into its postfix equivalent.
 * @param {Array<string>} anArr 
 */
function infixToPostfix(anArr)
{
    let stack = new Array();
    console.log("Creating Stack:");
    console.log(stack);

    // Push numbers until you reach an operator.
    while (anArr.length > 0 && !operators.includes(anArr[0]) )
    {
        stack.push(anArr.shift());
        console.log("In While Loop:");
        console.log(stack);
    }
    
    if (anArr.length == 0)
        return stack;
    
    // Grab operator.
    let op = anArr.shift();

    // Recursively call remainder of array an add it to the end of the stack.
    stack = stack.concat(infixToPostfix(anArr));
    console.log("After Recursion:");
    console.log(stack);

    // Add the operator at the end.
    stack.push(op);
    console.log("Adding Operator:");
    console.log(stack);

    // Return results.
    return stack;
}

/**
 * Converts an infix array into its postfix equivalent.
 * @param {Array<string>} anArr 
 */
function infixToPrefix(anArr)
{
    let stack = new Array();
    console.log("Creating Stack:");
    console.log(stack);

    // Push numbers until you reach an operator.
    while (anArr.length > 0 && !operators.includes(anArr[0]) )
    {
        stack.push(anArr.shift());
        console.log("In While Loop:");
        console.log(stack);
    }
    
    if (anArr.length == 0)
        return stack;
    
    // Add operator to the beginning.
    stack.unshift(anArr.shift());
    console.log("Adding Operator:");
    console.log(stack);

    // Recursively call remainder of array an add it to the end of the stack.
    stack = stack.concat(infixToPrefix(anArr));
    console.log("After Recursion:");
    console.log(stack);

    // Return results.
    return stack;
}

infixToPrefix(arr);

