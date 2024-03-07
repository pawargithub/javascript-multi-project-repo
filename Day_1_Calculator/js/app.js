let string = "";
let buttons = document.querySelectorAll("button");

function btnBackground(target){
    console.log(target.classList);
    target.classList.add("button-style");
    setTimeout(function(){
        target.classList.remove("button-style");
    }, 100);
}

Array.from(buttons).forEach((singleButton) => {
    singleButton.addEventListener("click", (e) => {
        btnBackground(e.target);
        if(e.target.innerHTML === "="){
            string = eval(string);
            document.querySelector(".calculator-display").value = string;
        } else if(e.target.innerHTML === "C") {
            string = "";
            document.querySelector(".calculator-display").value = string;
        } else if (e.target.value === "backspace"){
            if(string.length > 0){
                string = string.slice(0, string.length-1);
                document.querySelector(".calculator-display").value = string;
            }
        } else {
            string = string + e.target.innerHTML;
            document.querySelector(".calculator-display").value = string;
        }
        
    })
});