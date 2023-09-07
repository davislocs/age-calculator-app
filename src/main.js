const today = new Date();

const todayYear = parseInt(today.getFullYear());
const todayMonth = parseInt(today.getMonth()) + 1; // Months are zero-based, so add 1
const todayDay = parseInt(today.getDate());

let submitBtn = document.getElementById("subBtn");
let form = document.getElementById("age-calculator-form");

let yearUpdate = document.getElementById("year-value");
let monthUpdate = document.getElementById("month-value");
let dayUpdate = document.getElementById("day-value");

function errorState(action, ...arg) {
    if(action == "remove") 
    for(let argument of arg) document.getElementById(argument).classList.remove("error-state");
    else if(action == "add") 
    for(let argument of arg) document.getElementById(argument).classList.add("error-state");
}

submitBtn.addEventListener('click', function() {
    ///////////reset error mesages and remove error state/////////////
    errorState("remove", "day", "month", "year");
    let errBoxes = document.getElementsByClassName("error-box");
    for(let i = 0; i < errBoxes.length; i++) errBoxes[i].textContent = "";

    yearUpdate.innerHTML = "- -";
    monthUpdate.innerHTML = "- -";
    dayUpdate.innerHTML = "- -"; 

    let myDay = document.getElementById("day-input-field").value;
    let myMonth = document.getElementById("month-input-field").value;
    let myYear = document.getElementById("year-input-field").value;

    let input = document.getElementsByClassName("input");
    ///////////////////checks if the input data contains only numbers//////////////
    if(/\D/.test(myDay) || /\D/.test(myMonth) || /\D/.test(myYear)) {
        errorState("add", "day", "month", "year");
        for(let element of input) { 
            if(/\D/.test(element.querySelector(".input__field").value)) element.querySelector(".error-box").innerHTML = "Must only use numbers";
        }
        return false;
    }
    
    myDay = parseInt(myDay);
    myMonth = parseInt(myMonth);
    myYear = parseInt(myYear);
    let myDate = new Date(myYear + "-" + myMonth + "-" + myDay);

    if(myDate > today) {
        errorState("add", "day", "month", "year");
        for(let element of input) element.querySelector(".error-box").innerHTML = "Must be in the past";
        return false;
    }
    else if(myDate == "Invalid Date") {
        
        errorState("add", "day", "month", "year");
        document.getElementById("day-error-box").innerHTML = "Must be a valid day";
        if(!myDay || !myMonth || !myYear) { 
            for(let element of input) { 
                if(!element.querySelector(".input__field").value) element.querySelector(".error-box").innerHTML = "This field is required";
            }
        }
        if(myYear < 1000) document.getElementById("year-error-box").innerHTML = "Must be a valid year";
        if(myMonth <= 0 || myMonth > 12) document.getElementById("month-error-box").innerHTML = "Must be a valid month";
        if(myDay <= 0 || myDay > 31) document.getElementById("day-error-box").innerHTML = "Must be a valid day";
        return false;
    };
    
    let countY = 0;
    let countM = 0;
    let countD = 0;

    //function that counts years and months
    function countYearsAndMonths() {
        if(countM < 12) countM++; 
        if(countM == 12) {
            countM = 0;
            countY++;
        }
        countD = 0;
    }
    
    let m = myMonth;
    let d = myDay;
    //////////array holds all days of the months//////////
    let arrOfDays = [0,31,28,31,30,31,30,31,31,30,31,30,31];

    for(let y = myYear; y <= todayYear; y++) {
        for(m; m <= 12; m++) {
            let days = 0;
            if(m == 2 && y % 4 == 0) days = 29;
            else days = arrOfDays[m];

            for(d; d <= days; d++) {
            
                if(y == todayYear && m == todayMonth && d == todayDay){
                    yearUpdate.innerHTML = countY;
                    monthUpdate.innerHTML = countM;
                    dayUpdate.innerHTML = countD;
                    return true;
                }
                if(myDay > days) {
                    if(d != days || m == myMonth && y == myYear) countD++;
                    else countYearsAndMonths();
                }
                else if(d != myDay || m == myMonth && y == myYear) countD++;
                else countYearsAndMonths();
            }
            d = 1;
        }
        m = 1;
    }
})
