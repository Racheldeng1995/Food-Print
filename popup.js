function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

var open =document.getElementById('btnAnMarket').addEventListener("click",togglePopup)

var close=document.getElementById('close-pointer').addEventListener('click',()=>{
    document.getElementById("popup-1").classList.toggle("active")
    console.log('Hello')
}
)
