let accessDateBlock = document.querySelector("h1 > span");
let year = new Date().getFullYear();
accessDateBlock.innerHTML = year;

let countTasks = 3;

let listArray = [
`<li id="0">
    <textarea id="item-text-1" class="text-area" oninput="adjustTextareaheight(this)" disabled>Read Books for 30 min</textarea>
    <input id="save-1" class="hide-me save" type="button" value="Save" />
    <input id="edit-1" class="edit" type="button" value="Edit" />
    <input id="delete-1" class="delete" type="button" value="Delete" />
    </li>`, 
`<li id="1">
<textarea id="item-text-2" class="text-area" oninput="adjustTextareaheight(this)"  disabled>Call a friend</textarea>
    <input id="save-2" class="hide-me save" type="button" value="Save" />
    <input id="edit-2" class="edit" type="button" class="edit" value="Edit" />
    <input id="delete-2" class="delete" type="button" value="Delete" />
</li>`, 
`<li id="2">
    <textarea id="item-text-3" class="text-area" oninput="adjustTextareaheight(this)" disabled>Go For a walk or Run</textarea>
    <input id="save-3" class="hide-me save" type="button" value="Save" />
    <input id="edit-3" class="edit" type="button" value="Edit" />
    <input id="delete-3" class="delete" type="button" value="Delete" />
</li>`
];

function newArray(newListArray){
    // console.log(newListArray);
    let length = newListArray.length;
    let tempArray = [];

    for(let i = 0; i < length; i++){
        let elementString = newListArray[i];
        let tempElement = document.createElement("div");
        tempElement.innerHTML = elementString;
        
        let currentId = tempElement.querySelector("[id]").id;
        tempElement.querySelector("[id]").id = `${i}`;
        tempElement.querySelector("[id] > textarea").id = `item-text-${i}`;
        tempElement.querySelectorAll("input")[0].id = `edit-${i}`;
        tempElement.querySelectorAll("input")[1].id = `delete-${i}`;
        // console.log(tempElement.querySelector("[id]"));


        let tempArrayString = tempElement.innerHTML;
        // console.log(tempArrayString);
        // tempArray.push(tempArrayString);
        tempArray.push(tempArrayString);
    }
    // console.log(tempArray);
    listArray = tempArray;

    defaultItems();
}

let defaultItems = () => {
    let tempArray = [];
    let tempArrayToString = "";

    for( let index = (listArray.length - 1); index >= 0; --index){
        tempArray.push(listArray[index]);
    }

    tempArrayToString = tempArray.toString();
    tempArrayToString = tempArrayToString.replaceAll(",", "");
    // console.log(tempArrayToString);

    document.querySelector(".item-list-section > .item-list-container").innerHTML = tempArrayToString;

    let editORDelete = document.querySelectorAll('input[type="button"]');
    Array.from(editORDelete).forEach((singleEditOrDelete) => {
        singleEditOrDelete.addEventListener("click", (e) => {
            // console.log(e.target);
            if(e.target.getAttribute("class") === "delete"){
                let itemIndex = e.target.parentNode.id;
                let item = e.target.parentNode;
                listArray.splice(itemIndex, 1);
                // console.log(listArray);

                countTasks = countTasks - 1;
                document.querySelector(".task-bar-completion > p > span").innerHTML = `Tasks Added: ${countTasks}`;
                newArray(listArray);
            } else if (e.target.getAttribute("class") == "edit"){
                let item = e.target.parentNode;
                // let textarea = item.children[0];
                let textarea = item.querySelector("textarea").removeAttribute("disabled");
                item.querySelectorAll("input")[1].classList.add("hide-me");
                item.querySelectorAll("input")[0].classList.remove("hide-me");
                // console.log(textarea);
            } else if (e.target.getAttribute("class") == "save"){
                let item = e.target.parentNode;
                let textarea = item.querySelector("textarea").setAttribute("disabled", true);
                item.querySelectorAll("input")[1].classList.remove("hide-me");;
                item.querySelectorAll("input")[0].classList.add("hide-me");
            } 
        });
    });

   
}

let addBtn = document.querySelector("#add-text-btn");

addBtn.addEventListener("click", () => {
    let tempArray = [];
    let tempArrayToString = "";
    let listArrayLength = listArray.length;
    let addText = document.querySelector("#add-text").value;
    let listItem = `<li id="${listArrayLength}">
        <textarea id="item-text-${listArrayLength}" class="text-area" oninput="adjustTextareaheight(this)" disabled>${addText}</textarea>
        <input id="save-${listArrayLength}" class="hide-me save" type="button" value="Save" />
        <input id="edit-${listArrayLength}" class="edit" type="button" value="Edit" />
        <input id="delete-${listArrayLength}" class="delete" type="button" value="Delete" />
    </li>`;
    listArray.push(listItem);

    for( let index = (listArray.length - 1); index >= 0; index--){
        tempArray.push(listArray[index]);
    }

    tempArrayToString = tempArray.toString();
    tempArrayToString = tempArrayToString.replaceAll(",", "");
    // console.log(tempArrayToString);
    document.querySelector(".item-list-section > .item-list-container").innerHTML = tempArrayToString;
    
    countTasks = countTasks + 1;
    document.querySelector(".task-bar-completion > p > span").innerHTML = `Tasks Added: ${countTasks}`;

    document.querySelector("#add-text").value = "";

    let editORDelete = document.querySelectorAll('input[type="button"]');
    Array.from(editORDelete).forEach((singleEditOrDelete) => {
        singleEditOrDelete.addEventListener("click", (e) => {
            console.log(e.target);
            if(e.target.getAttribute("class") === "delete"){
                let itemIndex = e.target.parentNode.id;
                listArray.splice(itemIndex, 1);
                // console.log(listArray); 

                countTasks = countTasks - 1;
                document.querySelector(".task-bar-completion > p > span").innerHTML = `Tasks Added: ${countTasks}`;
                
                newArray(listArray);
            } else if (e.target.getAttribute("class") == "edit"){
                let item = e.target.parentNode;
                // let textarea = item.children[0];
                let textarea = item.querySelector("textarea").removeAttribute("disabled");
                item.querySelectorAll("input")[1].classList.add("hide-me");
                item.querySelectorAll("input")[0].classList.remove("hide-me");
                console.log(textarea);
            } else if (e.target.getAttribute("class") == "save"){
                let item = e.target.parentNode;
                let textarea = item.querySelector("textarea").setAttribute("disabled", true);
                item.querySelectorAll("input")[1].classList.remove("hide-me");;
                item.querySelectorAll("input")[0].classList.add("hide-me");
            } 
        });
    });

})

function adjustTextareaheight(input) {
    // console.log(input);
    input.style.height = "auto";
    input.style.height = (input.scrollHeight) + "px";
}





