const name = "Vinit"
const repoCount = 50 

// console.log(name + repoCount + " value");

// console.log(`Hello My Name is ${name} and My repo count is ${repoCount}`);


const gameName = new String("Vinit | L V")

// console.log(gameName[0]);
// console.log(gameName.__proto__);


// console.log(gameName.length);
// console.log(gameName.toUpperCase());
console.log(gameName.charAt("2"));
console.log(gameName.indexOf("t"));



const newstring = gameName.substring(0,4)
console.log(newstring);


const otherString = gameName.slice(-10 , 4)
console.log(otherString);


const newStringOne ="  Vinit  "

console.log(newStringOne);
console.log(newStringOne.trim());


const url ="https//vinit.come/vinit%20Likahr"

console.log(url.replace("%20","_"))

console.log(url.includes("vinit"));

console.log(gameName.split('-'));



// String Methods

// Substring = does NOT support negative indexes - it treats them as 
// slice = add to nag-points 
// trim = cut the space
// replace = another text type to wrong this method use to replace to text 
// include = wrong Text to change and after change to correct Text





