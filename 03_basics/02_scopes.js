// let a = 300
// const b = 20
// var c = 30


// if(true){
    let a = 10
    const b = 20
    // console.log("inner :", a);
// }


// console.log(a);
// console.log(b);
// console.log(c);


function one() {
    const username = "John Doe"

    function two() {
        const website = "www.johndoe.com"
//         console.log(username);
    }
//     // console.log(website);

    two();
}

// one()

if(true) {
    const username = "John Doe"
    if (username === "John Doe") {
        const website = "www.johndoe.com"
        // console.log(username + website);
    }
    // console.log(website);
}

// console.log(username);



// *************************** interesting example ***************************


function addone(num) {
    return num + 1
}

addone(5)

addtwo(5)
const addtwo = function(num) {
    return num + 2
}


