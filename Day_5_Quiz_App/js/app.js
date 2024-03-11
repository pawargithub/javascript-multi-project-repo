

let count = 1;
let score = 0;
let i = 0;

function askQuestion(indexOfObj) {
    if(indexOfObj < questionObj.length) {
        // console.log(indexOfObj);
        // console.log(questionObj[indexOfObj]);

        let setQuestion = questionObj[indexOfObj].question;
        let option1 = questionObj[indexOfObj].questionOption[0];
        let option2 = questionObj[indexOfObj].questionOption[1];
        let option3 = questionObj[indexOfObj].questionOption[2];
        let option4 = questionObj[indexOfObj].questionOption[3];


        let questionToRenderInString = 
        `<div class="question">${setQuestion}</div>
        <ul class="question-options">
        <li class="option"><input type="radio"  value="${option1}" name="question" > <span>${option1}</span></li>
        <li class="option"><input type="radio" value="${option2}" name="question"> <span>${option2}</span></li>
        <li class="option"><input type="radio" value="${option3}" name="question"> <span>${option3}</span></li>
        <li class="option"><input type="radio" value="${option4}" name="question"> <span>${option4}</span></li>
        </ul>
        </div>`

        let quizQuestionSection = document.querySelector(".quiz-question-section");
        quizQuestionSection.innerHTML = questionToRenderInString;

        let questionNumber = `${count} of 10 question`

        let buttonAndQuestionToRender = 
        `<span class="question-number-info">${questionNumber}</span>
         <input class="next-btn" type="button" value="Next" disabled>`

        let NextNumber = document.querySelector(".number-next");
        NextNumber.innerHTML = buttonAndQuestionToRender;


        let answer = questionObj[indexOfObj].questionOption[questionObj[indexOfObj].questionAnswer];
        // console.log(answer);

        //Add a event listener to each input radio field such that when the one of the radio button is clicked it should be grab the value like which radio button is clicked. once it click it should disabled all the button.
        let selectOption = document.querySelectorAll(".option > input");
        Array.from(selectOption).forEach((singleSelectOption) => {
            // console.log(singleSelectOption);
            singleSelectOption.addEventListener("click", (e) => {
                // console.log(e.target);
                // let selectInputName = e.target.name;
                let selectInputValue = e.target.value;
                // console.log(selectInputValue);
                let inputs = document.querySelectorAll(".option > input");
                Array.from(inputs).forEach((singleInput) => {
                    singleInput.setAttribute("disabled", true);
                    // console.log(singleInput);
                    // let singleInputName = singleInput.name;
                    let singleInputValue = singleInput.value;
                    // console.log(singleInputValue);
                    if (selectInputValue === singleInputValue) {
                        // console.log("selected: " + singleInputValue);
                        if (selectInputValue === answer) {
                            // console.log(true);
                            // console.log(e.target.parentNode);
                            e.target.parentNode.classList.add("right-answer");
                            let nextBtn = document.querySelector(".next-btn");
                            nextBtn.removeAttribute("disabled");
                            nextBtn.classList.add("enabled-color-btn");
                            nextBtn.style.cursor = "pointer";
                            score = score + 1;
                        } else {
                            // console.log(false);
                            // console.log(e.target.parentNode);
                            e.target.parentNode.classList.add("wrong-answer");
                            let ListInputArray = document.querySelectorAll(".option > input");
                            Array.from(ListInputArray).forEach((listInputElement) => {
                                let listInputElementValue = listInputElement.value;
                                if(listInputElementValue === answer){
                                    let listInputElementParent = listInputElement.parentNode;
                                    listInputElementParent.classList.add("right-answer");
                                }
                            });
                            let nextBtn = document.querySelector(".next-btn");
                            nextBtn.removeAttribute("disabled");
                            nextBtn.classList.add("enabled-color-btn");
                        }
                    } else if (selectInputValue !== singleInputValue) {
                        // console.log("unselected: " + singleInputValue);
                    }
                })
            })
        })


        document.querySelector(".next-btn").addEventListener("click", (e) => {
            // console.log(count);
            let nextButton = e.target;
            let inputs = document.querySelectorAll(".question-options > li > input");
            Array.from(inputs).forEach((singleInput) => {
                singleInput.checked = false;
                let singleInputParent = singleInput.parentNode;
                if(singleInputParent.classList[1] === "right-answer"){
                    // console.log("right-answer");
                    // console.log(singleInput.parentNode);
                    singleInputParent.classList.remove("right-answer");
                } else if(singleInputParent.classList[1] === "wrong-answer"){
                    // console.log("wrong-answer");
                    // console.log(singleInput.parentNode);
                    singleInputParent.classList.remove("wrong-answer");
                    let ListInputArray = document.querySelectorAll(".option > input");
                    Array.from(ListInputArray).forEach((listInputElement) => {
                        let listInputElementValue = listInputElement.value;
                        if(listInputElementValue === answer){
                            let listInputElementParent = listInputElement.parentNode;
                            listInputElementParent.classList.remove("right-answer");
                        }
                    });
                }
            });
            nextButton.classList.add("disabled-color-btn");
            nextButton.setAttribute("disabled", true);
            count++;
            nextIndexObj(++i);
        })
    } else {
        let quizContainer = document.querySelector(".quiz-container");
        quizContainer.innerHTML = `<div class="result">You Scored <span class="scored-point"></span> out of <span class="scored-point-out-of"></span></div>`;
        let result = document.querySelector(".result");
        let scoredPoint = document.querySelector(".scored-point");
        let scoredPointOutOf = document.querySelector(".scored-point-out-of");
        
        result.style.paddingBottom = "20px";
        scoredPoint.style.fontWeight = "bold";
        scoredPointOutOf.style.fontWeight = "bold";
        scoredPoint.innerHTML = score;
        scoredPointOutOf.innerHTML = newCreatedQuestionIndex.length;
    }
}



let firstTime = true;
let newCreatedQuestionIndex = [];
function nextIndexObj(i) {
    if (firstTime === true) {
        let exist = false;
        for (let i = 0; i < 10; i++) {
            let generateRandom = Math.floor(Math.random() * 45);
            // console.log(generateRandom);

            for (let j = 0; j < newCreatedQuestionIndex.length; j++) {
                if (newCreatedQuestionIndex[j] === generateRandom) {
                    exist = true;
                    i--;
                    break;
                }
            }
            if (exist === false) {
                newCreatedQuestionIndex.push(generateRandom);
            } else {
                exist = false;
            }
        }
        firstTime = false;
        // console.log(newCreatedQuestionIndex);
    }
    let index = newCreatedQuestionIndex[i];
    askQuestion(index);
}

let questionObj = [
    {
        id: "1",
        category: "Animal",
        question: "What is the young one of lion is called?",
        questionOption: ["Pup", "Kitten", "Puppy", "Cub"],
        questionAnswer: 3,
    },
    {
        id: "2",
        category: "Animal",
        question: "What is the youn one of tiger is called?",
        questionOption: ["Calf", "Cub", "Fawn", "Chick"],
        questionAnswer: 1,
    },
    {
        id: "3",
        category: "Animal",
        question: "What is the young one of goad called as?",
        questionOption: ["Kid", "Calf", "String", "Pup"],
        questionAnswer: 0,
    },
    {
        id: "4",
        category: "Animal",
        question: "What is the young of kangaroo called as?",
        questionOption: ["Duckling", "Joey", "Infant", "String"],
        questionAnswer: 1,
    },
    {
        id: "5",
        category: "Animal",
        question: "What is the young ones of sheep called as?",
        questionOption: ["Calf", "Kid", "Young", "Lamb"],
        questionAnswer: 3,
    },
    {
        id: "6",
        category: "Animal",
        question: "Which animal is known as the 'Ship of the Desert'?",
        questionOption: ["Polar Bear", "Kangaroo", "Scorpions", "Camel"],
        questionAnswer: 3,
    },
    {
        id: "7",
        category: "Animal",
        question: "Where Does a rat live?",
        questionOption: ["Den", "Burrow", "Barn", "Hole"],
        questionAnswer: 3,
    },
    {
        id: "8",
        category: "Animal",
        question: "Where Does a Dog live?",
        questionOption: ["Kennel", "Hole", "Barn", "Den"],
        questionAnswer: 0,
    },
    {
        id: "9",
        category: "Animal",
        question: "Where Does a Rabbit live?",
        questionOption: ["Barn", "Burrow", "Shed", "Lair"],
        questionAnswer: 1,
    },
    {
        id: "10",
        category: "Animal",
        question: "What sounds does the Dog make?",
        questionOption: ["Trumpets", "Mew", "Barks", "Neighs"],
        questionAnswer: 2,
    },
    {
        id: "11",
        category: "General Knowledge",
        question: "When is Teacher's Day is celebrated in India?",
        questionOption: ["18th October", "14th November", "6th December", "5th September"],
        questionAnswer: 3,
    },
    {
        id: "12",
        category: "General Knowledge",
        question: "When is Children's Day is celebrated in India?",
        questionOption: ["18th October", "14th November", "6th December", "5th September"],
        questionAnswer: 1,
    },
    {
        id: "13",
        category: "General Knowledge",
        question: "Which Fruits keep the Doctor Away?",
        questionOption: ["Banana", "Papaya", "Apple", "Mango"],
        questionAnswer: 2,
    },
    {
        id: "14",
        category: "General Knowledge",
        question: "What is the opposite of Day?",
        questionOption: ["Midnight", "Night", "Dawn", "Evening"],
        questionAnswer: 1,
    },
    {
        id: "15",
        category: "General Knowledge",
        question: "What is the opposite of tall?",
        questionOption: ["Fat", "Small", "Short", "Tiny"],
        questionAnswer: 2,
    },
    {
        id: "16",
        category: "General Knowledge",
        question: "What is the opposite of cold?",
        questionOption: ["Wet", "Hot", "Warm", "Cool"],
        questionAnswer: 1,
    },
    {
        id: "17",
        category: "General Knowledge",
        question: "Who works in a police station?",
        questionOption: ["Doctor", "Police", "Engineer", "Painter"],
        questionAnswer: 1,
    },
    {
        id: "18",
        category: "General Knowledge",
        question: "What shows time?",
        questionOption: ["Watch", "clock", "None of them", "Both of them"],
        questionAnswer: 3,
    },
    {
        id: "19",
        category: "General Knowledge",
        question: "What is the shape of the letter 'O'?",
        questionOption: ["Oval", "Circle", "Square", "Rectangle"],
        questionAnswer: 1,
    },
    {
        id: "20",
        category: "General Knowledge",
        question: "How many toes do one generally have?",
        questionOption: ["5", "10", "12", "2"],
        questionAnswer: 3,
    },
    {
        id: "21",
        category: "General Knowledge",
        question: "For which festival we generally fire crackers in India?",
        questionOption: ["Deepawali", "Holi", "Raksha Bandhan", "Christmas"],
        questionAnswer: 0,
    },
    {
        id: "22",
        category: "General Knowledge",
        question: "Which festival is linked with Santa Claus?",
        questionOption: ["Deepawali", "Holi", "Raksha Bandhan", "Christmas"],
        questionAnswer: 3,
    },
    {
        id: "23",
        category: "General Knowledge",
        question: "What is the fastest computing electronic device?",
        questionOption: ["Calculator", "Computer", "Bulb", "Backup charger"],
        questionAnswer: 1,
    },
    {
        id: "24",
        category: "General Knowledge",
        question: "What one will call father's father and father's mother?",
        questionOption: ["Great Grandfather and Great Grandmother", "Grandfather and Grandmother", "Dad and Mom", "Father's father and Father's mother"],
        questionAnswer: 1,
    },
    {
        id: "25",
        category: "General Knowledge",
        question: "What is the use of vaccum cleaner?",
        questionOption: ["Cleaning House", "Cleaning Garden", "Washing Cloth", "Ironing"],
        questionAnswer: 0,
    },
    {
        id: "26",
        category: "General Knowledge",
        question: "Who was the first president of United States?",
        questionOption: ["George Washington", "Abraham Lincoln", "Donald Trump", "Barack Obama"],
        questionAnswer: 0,
    },
    {
        id: "27",
        category: "General Knowledge",
        question: "Which ocean is the largest in the world?",
        questionOption: ["The Arctic", "The Indian Ocean", "The Pacific Ocean", "The Atlantic"],
        questionAnswer: 2,
    },
    {
        id: "28",
        category: "General Knowledge",
        question: "What is the capital of France?",
        questionOption: ["Toulouse", "Paris", "Bordeaux", "Tokyo"],
        questionAnswer: 1,
    },
    {
        id: "29",
        category: "General Knowledge",
        question: "In which year did Christopher Columbus Discovered America?",
        questionOption: ["1495", "1503", "1606", "1492"],
        questionAnswer: 3,
    },
    {
        id: "30",
        category: "General Knowledge",
        question: "Which country is known as Land of Rising Sun?",
        questionOption: ["Japn", "China", "India", "America"],
        questionAnswer: 0,
    },
    {
        id: "31",
        category: "General Knowledge",
        question: "Which is the longest river in the world?",
        questionOption: ["The Mississippi", "The Nile River", "The Amazon River", "The Ganges"],
        questionAnswer: 1,
    },
    {
        id: "32",
        category: "General Knowledge",
        question: "Who wrote the famous play 'Romeo and Juliet'?",
        questionOption: ["William Shakespear", "Maya Angelou", "Walk Whitman", "William"],
        questionAnswer: 0,
    },
    {
        id: "33",
        category: "General Knowledge",
        question: "Which ancient wonder of the world i s located in Egypt and is known for its trigular shape?",
        questionOption: ["The Great Wall of China", "Taj Mahal", "Machu Picchu", "The Great Pyramid of Giza"],
        questionAnswer: 3,
    },
    {
        id: "34",
        category: "General Knowledge",
        question: "What mountain is tallest in the world?",
        questionOption: ["Nanga Parbar", "Dhaulagiri", "K2", "Mount Everest"],
        questionAnswer: 3,
    },
    {
        id: "35",
        category: "Science and Nature",
        question: "What is the center of our Solar System?",
        questionOption: ["Earth", "The Star", "The Sun", "Moon"],
        questionAnswer: 2,
    },
    {
        id: "36",
        category: "Science and Nature",
        question: "How many continents are their in the world?",
        questionOption: ["7 continents", "5 continents", "10 continents", "no continents"],
        questionAnswer: 0,
    },
    {
        id: "37",
        category: "Science and Nature",
        question: "What gas do plants absorb from the air and release oxygen during photosynthesis?",
        questionOption: ["Carbon dioxide(C02)", "Carbon monoxide(C0)", "Oxygen(02)", "Hydrogen dixoide(H20)"],
        questionAnswer: 0,
    },
    {
        id: "38",
        category: "Science and Nature",
        question: "What is the process where water turn into vapour due to heat?",
        questionOption: ["Condensation", "Evaporation", "Desposition", "Sublimation"],
        questionAnswer: 1,
    },
    {
        id: "39",
        category: "Science and Nature",
        question: "What is the largest planet in our solar system?",
        questionOption: ["Mars", "Saturn", "Earth", "Jupiter"],
        questionAnswer: 3,
    },
    {
        id: "40",
        category: "Science and Nature",
        question: "What do you call study of stars, planets and space?",
        questionOption: ["Meteorology", "Cosmology", "Astronomy", "Astrology"],
        questionAnswer: 2,
    },
    {
        id: "41",
        category: "Science and Nature",
        question: "Which gas do human breathe in and use for respiration?",
        questionOption: ["Nitric Oxide (NO)", "Carbon dioxide (CO2)", "Methane (CH 4)", "Oxygen (02)"],
        questionAnswer: 3,
    },
    {
        id: "42",
        category: "Science and Nature",
        question: "Which gas do human breathe in and use for respiration?",
        questionOption: ["Nitric Oxide (NO)", "Carbon dioxide (CO2)", "Methane (CH 4)", "Oxygen (02)"],
        questionAnswer: 3,
    },
    {
        id: "43",
        category: "Science and Nature",
        question: "Which is the smallest planet in our solar system?",
        questionOption: ["Pluto", "Mercury", "Venus", "Jupiter"],
        questionAnswer: 1,
    },
    {
        id: "44",
        category: "Science and Nature",
        question: "What specific causes the seasons on Earth?",
        questionOption: ["revolution", "rotation", "sphericity", "The Earth's tilted Axis"],
        questionAnswer: 3,
    },
    {
        id: "45",
        category: "Science and Nature",
        question: "What is the Process by which plants make their own food using sunlight?",
        questionOption: ["Photosynthesis", "Ingestion", "Digestion", "Absorption"],
        questionAnswer: 0,
    },
];


function start() {
    let buttonToRender = `<button class="start-btn">Start</button>`;
    let quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = buttonToRender;
    quizContainer.classList.add("row-container");
    

    document.querySelector(".start-btn").addEventListener("click", () => {
        quizContainer.classList.remove("row-container");
        quizContainer.innerHTML = 
        `
        <div class="question-category">General Knowledge</div>
        <div class="quiz-question-section">
        </div>
        <div class="number-next">
          
        </div>
        `
        nextIndexObj(0);
    })
}