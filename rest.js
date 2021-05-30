let button = document.querySelector("#findVac");

let outputString = "";

button.addEventListener('click', ()=> {
let pin = document.querySelector("#pin").value;
let date = document.querySelector("#date").value;
let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin + "&date= " + date;
https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=799001&date=31-05-2021"

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch(url, requestOptions)
.then(response => response.text())
.then(result => {
let jsonOP = JSON.parse(result)
console.log(jsonOP);

let n = jsonOP["sessions"].length
console.log(n)
let count=0;

for(var i=0;i<n;i++) {
    if(jsonOP["sessions"][i]["available_capacity"] != 0) {
        outputString += "<b>Name of center : </b>" + jsonOP["sessions"][i]["name"]+"<br>"+
        "<b>Address : </b>" + jsonOP["sessions"][i]["address"]+"<br>"+
        "<b>DOSE 1 capacity : </b>" + jsonOP["sessions"][i]["available_capacity_dose1"]+"<br>"+
        "<b>DOSE 2 capacity : </b>" + jsonOP["sessions"][i]["available_capacity_dose2"]+"<br>"+
        "<b>Available capacity : </b>" + jsonOP["sessions"][i]["available_capacity"]+"<br>"+
        "<b>Mininum age : </b>" + jsonOP["sessions"][i]["min_age_limit"]+"<br>"+
        "<b>Vaccine : </b>" + jsonOP["sessions"][i]["vaccine"]+"<br>"+
        "<br><hr><br>"
        count++
    }
   
}
    if(count!=0) {
        document.querySelector("#data").innerHTML = outputString
        document.querySelector("#notAv").innerHTML = ""
    } else {
        document.querySelector("#data").innerHTML = ""
        document.querySelector("#notAv").innerHTML = "No vaccination centers are available"
    }
    


})
.catch(error => console.log('error', error));
})
