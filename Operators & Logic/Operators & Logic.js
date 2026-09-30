// Comparison Operators


let comp1 = 6;
let comp2 = 6;


console.log("comp1 == comp2 is", comp1 == comp2)
console.log("comp1 == comp2 is", comp1 != comp2)
console.log("comp1 === comp2 is", comp1 === comp2)
console.log("comp1 !== comp2 is", comp1 !== comp2)


// Logical Operators

let isLoggedIn = true;
let isAdmin = false;
let age = 23;

// AND (&&) - Both conditions must be true
if (isLoggedIn && age >= 18) {
  console.log("Welcome! You can access this page.");  // ✅ This runs
} else {
    console.log("You can't access this page.");
    
}

// OR (||) - At least one condition must be true
if (isLoggedIn || isAdmin) {
  console.log("You have some access.");  // ✅ This runs
}

// NOT (!) - Reverses true to false / false to true
if (!isAdmin) {
  console.log("You are NOT an admin.");  // ✅ This runs
}


// null and undefined 

let a = null ?? "Default";  
let b = undefined ?? "Default";   
let c = 0 ?? "Default";           
let d = "" ?? "Default";         
let e = false ?? "Default";      
console.log(a); // Default
console.log(b); // Default
console.log(c); // 0
console.log(d); // ""
console.log(e); // false