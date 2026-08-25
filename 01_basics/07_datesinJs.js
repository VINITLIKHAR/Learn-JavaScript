// Dates

let myDate = new Date()
// console.log(myDate.toString());
// console.log(myDate.toDateString());
// console.log(myDate.toLocaleDateString());
// console.log(typeof myDate);          




// let myCreatedDate = new Date(2023,0,23)
// console.log(myCreatedDate.toDateString());

// let myCreatedDate = new Date(2023,0,23,5,3)
// console.log(myCreatedDate.toLocaleString());

// let myCreatedDate = new Date("2023-01-14")
// console.log(myCreatedDate.toLocaleString());

let myCreatedDate = new Date("01-14-2023")
// console.log(myCreatedDate.toLocaleString());


let myTimesStamp = Date.now()

// console.log(myTimesStamp);
// console.log(myCreatedDate.getTime());
// console.log(Math.floor(Date.now()/1000));


// `${newDate.getDay()} and the time`

newDate.toLocalestring(`default`,{
    weekday:"long",
})

