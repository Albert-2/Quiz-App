const data = [
  {
    id: "622a1c3c7cc59eab6f951a41",
    correctAnswer: "Ghana",
    correctAnswerIndex: 3,
    options: ["India", "Australia", "Egypt", "Ghana"],
    question:
      "The Gold Coast gained its independence from Great Britain in 1957 and formed part of which new country?",
  },
  {
    id: "622a1c347cc59eab6f94f947",
    correctAnswer: "Pirates of the Caribbean",
    correctAnswerIndex: 1,
    options: [
      "The Godfather",
      "Pirates of the Caribbean",
      "The Silence of the Lambs",
      "The Birds",
    ],
    question: "Which film contains the character 'Captain Jack Sparrow'?",
  },
  {
    id: "6461407d4d46e537ca8cd9d7",
    correctAnswer: "Magnetron",
    correctAnswerIndex: 1,
    options: ["Resistor", "Magnetron", "Diode", "Transistor"],
    question: "What kind of electronic tube is used to produce microwaves?",
  },
  {
    id: "622a1c3a7cc59eab6f95135a",
    correctAnswer: "Baroque",
    correctAnswerIndex: 2,
    options: ["Classical", "Renaissance", "Baroque", "Gothic"],
    question:
      "Which 17th and early 18th century movement in painting is characterized by great drama, deep colour, intense light and dark shadows?",
  },
  {
    id: "62611fc34b176d54800e3d6f",
    correctAnswer: "1971",
    correctAnswerIndex: 0,
    options: ["1971", "1957", "1964", "1978"],
    question: "When was the first email sent?",
  },
  {
    id: "6293ebc77f41d6338b96eebf",
    correctAnswer: "Christopher Columbus",
    correctAnswerIndex: 3,
    options: [
      "Napoleon Bonaparte",
      "Martin Luther",
      "Marco Polo",
      "Christopher Columbus",
    ],
    question:
      "Which of these people was an Italian explorer who landed in America?",
  },
  {
    id: "6237403bcb85f7ce9e949ce9",
    correctAnswer: "Dominica",
    correctAnswerIndex: 3,
    options: ["Romania", "Sierra Leone", "Antigua and Barbuda", "Dominica"],
    question: "Roseau is the capital city of which country?",
  },
  {
    id: "622a1c347cc59eab6f94f95b",
    correctAnswer: "Post Office",
    correctAnswerIndex: 2,
    options: ["Tinker", "My Life As a Man", "Post Office", "Nine Stories"],
    question: "Which book contains the character 'Henry Chinaski'?",
  },
  {
    id: "622a1c397cc59eab6f950e7e",
    correctAnswer: "Voltaire",
    correctAnswerIndex: 0,
    options: ["Voltaire", "Stendhal", "Paulo Coelho", "Isabel Allende"],
    question: "Which author wrote 'Candide'?",
  },
  {
    id: "622a1c397cc59eab6f950c7e",
    correctAnswer: "U2",
    correctAnswerIndex: 1,
    options: ["Public Image Ltd.", "U2", "The Script", "The Cure"],
    question:
      "Which Irish rock band released the studio album 'All That You Can't Leave Behind'?",
  },
];
let start = document.querySelector(".start");
let profile = document.querySelector("#profile");
let userName = document.querySelector(".name");
let wrapper = document.querySelector(".wrapper");
let total = document.querySelector(".totalScore");
let right = document.querySelector(".rightScore");
let wrong = document.querySelector(".wrongScore");
let count = 0;
let rigthCount = 0;
let wrongCount = 0;
let scoreSeconds = 0;
start.addEventListener("click", function () {
  if (userName.value && isNaN(userName.value - 0)) {
    document.body.classList.remove("bodyBack");
    wrapper.classList.add("hidden");
    profile.textContent += userName.value;
    displayQues();
    timer.start();
  }
});

let seconds = 10;
function Timer() {
  let interval;

  function start() {
    interval = setInterval(function () {
      seconds--;
      document.querySelector(".timer").textContent = seconds;
      if (seconds <= 0) {
        clearInterval(interval);
        count++;
        displayQues();
        timer.start();
      }
    }, 1000);
  }

  function reset() {
    clearInterval(interval);
    seconds = 10;
    document.querySelector(".timer").textContent = seconds;
  }

  return {
    start: start,
    reset: reset,
  };
}

let timer = Timer();

function displayQues() {
  if (count < data.length) {
    let demo = data.slice(count, count + 1);
    let temp = demo.map(function (item) {
      return `<div class="question w-[90%] text-center">
            <h3
              class="font-semibold text-2xl p-5 m-5 rounded-2xl border-2 border-[#d37e07] bg-gradient-to-b from-[#02023c] to-[#030365]">${item.question}</h3>
          </div>
          <div class="options w-[90%] text-center flex flex-wrap">
            <div class="option optionsStyle border-2 border-[#d37e07]">A.${item.options[0]}</div>
            <div class="option optionsStyle border-2 border-[#d37e07]">B.${item.options[1]}</div>
            <div class="option optionsStyle border-2 border-[#d37e07]">C.${item.options[2]}</div>
            <div class="option optionsStyle border-2 border-[#d37e07]">D.${item.options[3]}</div>
          </div>`;
    });
    document.querySelector(".questionMain").innerHTML = temp;
    let options = document.querySelectorAll(".option");
    options.forEach((ans, index) => {
      ans.addEventListener("click", function (e) {
        if (index === demo[0].correctAnswerIndex) {
          ans.classList.add("correct");
        } else {
          ans.classList.add("wrong");
        }
        if (e.target.textContent.substring(2) === demo[0].correctAnswer) {
          scoreSeconds += seconds;
          setTimeout(() => {
            total.textContent = "Score:" + scoreSeconds;
            timer.reset();
            count++;
            displayQues();
            timer.start();
            rigthCount++;
            right.textContent = "Correct:" + rigthCount;
          }, 1000);
        } else {
          setTimeout(() => {
            timer.reset();
            count++;
            displayQues();
            timer.start();
            wrongCount++;
            wrong.textContent = "Wrong:" + wrongCount;
          }, 1000);
        }
      });
      timer.reset();
    });
  } else {
    timer.reset();
    document.body.classList.add("bodyBack");
    wrapper.classList.remove("hidden");
    document.querySelector(".demo").innerHTML = `
        <h1 class="text-6xl">Thanks For playing...!!</h1>
        <p class="font-semibold text-3xl endScore">Your Score : </p>
        <button
          type="submit"
          class="replay border-2 border-white px-10 py-2 text-2xl"
        >Replay</button>`;
    let endScore = document.querySelector(".endScore");
    endScore.textContent = "Your Score : " + scoreSeconds;
    document.querySelector(".replay").addEventListener("click", function () {
      window.location.reload();
    });
  }
}
