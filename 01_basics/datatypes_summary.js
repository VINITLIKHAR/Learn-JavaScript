//  primitive DataTypes....

// 7 DataTypes : String | Number | Boolean | Null | undefined | symbol | BigInt

const score =  100
const scorevalue = 100.3``

const isloggedIn =false
const outsideTemp = null
let userEmail;

const id = Symbol("123")
const anotherId = Symbol("123")

console.log(id === anotherId);

const bigNumber = 32314569875


//  Reference DataTypes (Non Primitive)

// Array | Object | function

const heroes = [ "shaktiman", "naajraj", "doga"]
let myobj = {
    name : "vinit",
    age : 22,
}

const myFunction = function(){
    console.log("Hello World");
    
}


// 1) primitive Datatypes
//        Number => number
//        String  => string
//        Boolean  => boolean
//        null  => object
//        undefined  =>  undefined
//        Symbol  =>  symbol
//        BigInt  =>  bigint

// 2) Non-primitive Datatypes
//        Arrays  =>  object
//        Function  =>  function
//        Object  =>  object