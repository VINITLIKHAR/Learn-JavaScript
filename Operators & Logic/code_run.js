// // 1. Logical AND (&&)

// let isLoggedIn = true;
// let hasPermission = true;

// // ✅ Both true → can access
// if (isLoggedIn && hasPermission) {
//   console.log("Access granted! 🎉");
// }

// // ✅ Conditional rendering
// let user = { name: "John" };
// console.log(user && user.name); // "John" (if user exists, show name)

// let user2 = null;
// console.log(user2 && user2.name); // null (user doesn't exist, stop)

// // 2. Logical OR (||)

// let name = "";
// let defaultName = name || "Guest";
// console.log(defaultName); // "Guest" ✅

// let theme = null;
// let defaultTheme = theme || "Light";
// console.log(defaultTheme); // "Light" ✅

// // Multiple options
// let color = undefined;
// color = color || "blue" || "red";
// console.log(color); // "blue" (first truthy)

// // 3. Nullish Coalescing (??)

// // Problem with ||
// let score = 0;
// let result1 = score || 100;
// console.log(result1); // 100 ❌ (Wrong! 0 is a valid score)

// // Solution with ??
// let result2 = score ?? 100;
// console.log(result2); // 0 ✅ (Correct! 0 is valid)

// // Another example
// let quantity = 0;
// console.log(quantity || 5); // 5 ❌ (Wrong)
// console.log(quantity ?? 5); // 0 ✅ (Correct)

// // 4. Optional Chaining (?.)

// // API Response might be incomplete
// let response = {
//   status: "success",
//   data: {
//     user: {
//       email: "john@mail.com",
//     },
//   },
// };

// // ✅ Safe nested access
// let email = response?.data?.user?.email ?? "no-email";
// console.log(email); // "john@mail.com"

// // Incomplete response
// let response2 = { status: "error" };
// let email2 = response2?.data?.user?.email ?? "no-email";
// console.log(email2); // "no-email" ✅

// // Array access
// let users = [{ name: "John" }];
// console.log(users?.[0]?.name); // "John"
// console.log(users?.[5]?.name); // undefined (no error!)

// // Method call
// let obj = {
//   greet() {
//     return "Hi!";
//   },
// };
// console.log(obj?.greet?.()); // "Hi!"

// let obj2 = null;
// console.log(obj2?.greet?.()); // undefined (no error!)

// // callback...

// console.log("Vinit is a hacker");
// console.log("pranav is a hecker");

// setTimeout(() => {
//   console.log("i am inside settimeout");
// }, 0);

// setTimeout(() => {
//   console.log("i am inside settimeout 2");
// }, 0);

// console.log("The end");

// const fn = () => {
//   console.log("nothing");
// }

// const callback = (arg, fn) => {
//   console.log(arg);
//   fn();
// }

// const loadScript = (src, callback) => {
//   let sc = document.createElement("script");
//   sc.src = src;
//   sc.onload = () => callback("Vinit", "fn");
//   document.head.appendChild(sc);
// };

// function greet(name , callback) {
//   console.log("Hello " + name);
//   callback();
// }

// function sayGoodbye() {
//   console.log("Goodbye!");
// }

// greet("Vinit", sayGoodbye);






// Higher-order functions

function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}
let multiplyBy2 = multiplyBy(2)(5);

console.log(multiplyBy2);



// function multiplyBy2(factor) { 
//   return factor + factor;
// }

// let call = multiplyBy2(5);
// console.log(call);

// function add (a, b) {
//   console.log(a + b);
// }

// add (5, 10);