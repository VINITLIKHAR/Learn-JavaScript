
function sayMyName(){
    console.log("V");
    console.log("i");
    console.log("n");
    console.log("i");
    console.log("t");
}

// sayMyName()

// function addTwoNumbers(number1,number2){

//     console.log(number1 + number2);
// }


function addTwoNumbers(number1,number2){

    // let result = number1 + number2
    // return result
    return number1 + number2
}


const result = addTwoNumbers(3, 7)

// console.log("Result:",result);


function loginUserMessage(username){
        if(username === undefined){
            console.log("Please enter a username");
            return
        }
}
// console.log(loginUserMessage("vinit"));

console.log(loginUserMessage());

function calculateCartprice(...num1){
    return num1
}


// console.log(calculateCartprice(200, 400, 500, 600));

const user = {
    username : "Vinit",
    price : 299
}

function handleobject(anyobject){
console.log(`username is ${anyobject.username} and price is ${anyobject.price}`);
}

handleobject({
    username : "sam",
    price :399
})


const myNewArray = [200, 400, 100, 600]

function returnSecondvalue(getArray){
    return getArray[1]
}


console.log(returnSecondvalue(myNewArray));
