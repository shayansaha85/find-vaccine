import requests

pin = "799001"
date = "31-05-2021"
url = f"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode={pin}&date={date}"

response = requests.get(url)


for i in range(len(response.json()["sessions"])):
    if response.json()["sessions"][i]["available_capacity"] != 0:
        print()
        print("-----------------------------------------------------------------------------------")
        print()
        print("Name : ",response.json()["sessions"][i]["name"])
        print("Address : ",response.json()["sessions"][i]["address"])
        print("DOSE 1 : ",response.json()["sessions"][i]["available_capacity_dose1"])
        print("DOSE 2 : ",response.json()["sessions"][i]["available_capacity_dose2"])
        print("Available capacity : ",response.json()["sessions"][i]["available_capacity"])
        print("Mininum age : ",response.json()["sessions"][i]["min_age_limit"])


        print("Vaccine : ",response.json()["sessions"][i]["vaccine"])
        print()
        print("-----------------------------------------------------------------------------------")
        print()