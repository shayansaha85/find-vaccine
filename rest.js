let button = document.querySelector("#findVac");

let outputString = "";

button.addEventListener('click', ()=>   {
outputString = ""
let pin = document.querySelector("#pin").value;
let ans = document.getElementById("date").value
let date = ""
let dateEls = ans.split('-')
let length = dateEls.length
let i=length-1
while(i>=0) {
    date+=dateEls[i]+"-";
    i--;
}
date = date.substring(0, date.length-1)

let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin + "&date= " + date;

let ageGroup = parseInt(document.getElementById("sel1").value)

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
    if(jsonOP["sessions"][i]["available_capacity"]!=0 && jsonOP["sessions"][i]["min_age_limit"] == ageGroup) {
        outputString += "<b>Name of centre : </b>" + jsonOP["sessions"][i]["name"]+"<br>"+
        "<b>Address : </b>" + jsonOP["sessions"][i]["address"]+"<br>"+
        "<b>DOSE 1 capacity : </b>" + jsonOP["sessions"][i]["available_capacity_dose1"]+"<br>"+
        "<b>DOSE 2 capacity : </b>" + jsonOP["sessions"][i]["available_capacity_dose2"]+"<br>"+
        "<b>Total capacity : </b>" + jsonOP["sessions"][i]["available_capacity"]+"<br>"+
        "<b>Age Group : </b>" + showAge(jsonOP["sessions"][i]["min_age_limit"])+"<br>"+
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
        alert("Vaccine not availabe")
        document.querySelector("#notAv").innerHTML = "No vaccination centres are available for this age group"
    }
})
.catch(error => console.log('error', error));
})


function showAge(age) {
    if(age == 18) {
        return "18-44"
    } else {
        return "45 and above"
    }
}