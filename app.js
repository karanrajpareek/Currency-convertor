const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value=currcode;
    if(select.name === "from" && currcode ==="USD" ){
        newOption.selected = "selected";
    }else if(select.name === "to" && currcode ==="INR" ){
        newOption.selected = "selected";
    }
    select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
        updateflag(evt.target);
    } );
}

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval == "" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
   let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   let finalAmount = amtval * rate;
   msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateflag = (Element)=>{
    let currcode = Element.value;
    let countrycode  =countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newSrc;
}
 
 btn.addEventListener("click", async (evt) => {
   evt.preventDefault();
   updateExchangeRate();
 });
 
 window.addEventListener("load", () => {
   updateExchangeRate();
});