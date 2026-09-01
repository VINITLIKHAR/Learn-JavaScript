const user = {
    username: "johndoe",
    price : 999,


    welcomeMessage :function(){

        // console.log(`Welcome ${this.username} your price is ${this.price}`);
        // console.log(this);
        
}

}

// user.welcomeMessage()

// user.username ="vinit"

// user.welcomeMessage()


// console.log(this);


// function chai (){
//     let username = "vinit";
//     console.log(this.username);
// }

// chai()


const chai = () => {
    let username = "vinit";
    console.log(this);
}

// chai()


// const addTwo = (num1, num2) => {
//     return num1 + num2;
// }


// const addTwo = (num1, num2) =>  num1 + num2;

// const addTwo = (num1, num2) => (num1 + num2);

const addTwo = (num1, num2) => ({ username :"vinit"});

console.log(addTwo(6,4));


// const myArray = [1,2,3,4,5];

// myArray.forEach()


