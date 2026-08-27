// Singleton

// Object literals


const mysym = Symbol("key1")

const JsUser = {
    name : "Vinit",
    "full name" : "Vinit Likahr",
    [mysym]: "mykey1",
    age : 22,
    location : "Ahmadabad",
    email : "vinit@google.come",
    idLoggedIn : false,
    lastLoginDays : ["monday", "saturday"]
}


// console.log(JsUser.email);

// console.log(JsUser["email"]);

// console.log(JsUser["full name"]);

// console.log(JsUser[mysym]);



JsUser.email = "Vinit@chatgpt.com"
// Object.freeze(JsUser)

JsUser.email = "Vinit@microsoft.com"
// console.log(JsUser);


JsUser.greeting = function(){
    console.log("Hello Js user");
    
}

JsUser.greetingTwo = function(){
    console.log(`Hello Js user,${this.name}`);
    
}



console.log(JsUser.greeting);
console.log(JsUser.greeting());
console.log(JsUser.greetingTwo());


