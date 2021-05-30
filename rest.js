let button = document.querySelector("#findVac");



button.addEventListener('click', ()=> {
let pin = document.querySelector("#pin").value;
let date = document.querySelector("#date").value;
let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin + "&date= " + date;


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
    if(jsonOP["sessions"][i]["available_capacity"] != 0){
    document.querySelector("#name").innerHTML = "<b>Name : </b>" + jsonOP["sessions"][i]["name"]
    document.querySelector("#address").innerHTML ="<b>Address : </b>" + jsonOP["sessions"][i]["address"]
    document.querySelector("#dose1").innerHTML ="<b>DOSE 1 : </b>" + jsonOP["sessions"][i]["available_capacity_dose1"]
    document.querySelector("#dose2").innerHTML ="<b>DOSE 2 : </b>" + jsonOP["sessions"][i]["available_capacity_dose2"]
    document.querySelector("#availibility").innerHTML ="<b>Available capacity : </b>" + jsonOP["sessions"][i]["available_capacity"]
    document.querySelector("#minimumAge").innerHTML = "<b>Mininum age : </b>" + jsonOP["sessions"][i]["min_age_limit"]
    document.querySelector("#vaccine").innerHTML ="<b>Vaccine : </b>" + jsonOP["sessions"][i]["vaccine"]
    document.querySelector("#notAv").innerHTML = ""
    document.querySelector("#lineBreak").innerHTML = "<br><hr>-<br>"
    count++;
    }
}
if(count==0) {
    document.querySelector("#name").innerHTML = ""
    document.querySelector("#address").innerHTML =""
    document.querySelector("#dose1").innerHTML =""
    document.querySelector("#dose2").innerHTML =""
    document.querySelector("#availibility").innerHTML =""
    document.querySelector("#minimumAge").innerHTML = ""
    document.querySelector("#vaccine").innerHTML =""
    document.querySelector("#notAv").innerHTML = "<strong>Vaccine not available</strong>"
}

})
.catch(error => console.log('error', error));
})
