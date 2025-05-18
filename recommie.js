// Updated questions from Q and A for Recommie PDF
const questions = [
  {
    question: "What is the correct way to declare a variable in JavaScript that can be reassigned?",
    options: {
      A: "const name = \"John\"",
      B: "let name = \"John\"",
      C: "var name = \"John\"",
      D: "Both B and C"
    },
    correct: "D"
  },
  {
    question: "Which of the following is the correct way to create a function in JavaScript?",
    options: {
      A: "function myFunction() {}",
      B: "var myFunction = function() {}",
      C: "const myFunction = () => {}",
      D: "All of the above"
    },
    correct: "D"
  },
  {
    question: "How do you access the third element in an array called \"students\"?",
    options: {
      A: "students.3",
      B: "students[2]",
      C: "students[3]",
      D: "students.get(3)"
    },
    correct: "B"
  },
  {
    question: "What will be the output of: console.log(2 + \"2\")?",
    options: {
      A: "4",
      B: "\"22\"",
      C: "22",
      D: "Error"
    },
    correct: "C"
  },
  {
    question: "Which method is used to add a new element to the end of an array?",
    options: {
      A: "push()",
      B: "append()",
      C: "add()",
      D: "insert()"
    },
    correct: "A"
  },
  {
    question: "What is the purpose of the \"addEventListener\" method in JavaScript?",
    options: {
      A: "To create new HTML elements",
      B: "To handle events like clicks or key presses",
      C: "To add CSS styles",
      D: "To connect to a database"
    },
    correct: "B"
  },
  {
    question: "How do you write an if statement in JavaScript that executes code if \"x\" is equal to 10?",
    options: {
      A: "if x = 10 then",
      B: "if (x == 10)",
      C: "if x == 10",
      D: "if (x = 10)"
    },
    correct: "B"
  },
  {
    question: "What does JSON.parse() do in JavaScript?",
    options: {
      A: "Converts a JavaScript object to a JSON string",
      B: "Converts a JSON string to a JavaScript object",
      C: "Parses HTML content",
      D: "Creates a new JSON file"
    },
    correct: "B"
  },
  {
    question: "Which loop will always execute at least once?",
    options: {
      A: "for loop",
      B: "while loop",
      C: "do...while loop",
      D: "forEach loop"
    },
    correct: "C"
  },
  {
    question: "What is the correct way to check if a variable \"student\" is of type object?",
    options: {
      A: "typeof(student === \"object\")",
      B: "typeof student === \"object\"",
      C: "student.type === object",
      D: "student instanceof Object"
    },
    correct: "B"
  }
];

// Study Habits Questions from the PDF
const studyHabitsQuestions = [
  {
    question: "How often do you review your programming notes or materials?",
    options: {
      A: "Daily or after each class session",
      B: "Weekly",
      C: "Only before exams",
      D: "Rarely or never"
    }
  },
  {
    question: "Which learning approach do you prefer when studying coding?",
    options: {
      A: "Reading documentation and tutorials",
      B: "Watching video tutorials",
      C: "Hands-on practice and building projects",
      D: "Group study with peers"
    }
  },
  {
    question: "How do you typically manage your time for programming assignments?",
    options: {
      A: "I use digital tools or planners to schedule study time",
      B: "I work on assignments right before they're due",
      C: "I break large projects into smaller tasks with deadlines",
      D: "I don't have a specific approach"
    }
  },
  {
    question: "When you encounter a difficult coding problem, what do you usually do?",
    options: {
      A: "Keep trying different solutions until it works",
      B: "Immediately seek help from instructors or peers",
      C: "Look up similar problems and solutions online",
      D: "Skip it and move on to something else"
    }
  },
  {
    question: "How often do you practice coding outside of required assignments?",
    options: {
      A: "Daily",
      B: "2-3 times per week",
      C: "Occasionally when I have time",
      D: "Never"
    }
  }
];

// Global variables to track state
let currentStudent = "";
let currentQuestionIndex = 0;
let studentStats = {
  correct: 0,
  incorrect: 0,
  answers: [],
  studyHabits: []
};

function showSection(section) {
  // Hide all sections first
  document.getElementById("greeting").style.display = "none";
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("questionContainer").style.display = "none";
  document.getElementById("studyHabitsSection").style.display = "none";
  document.getElementById("resultsContainer").style.display = "none";
  document.getElementById("aboutSection").style.display = "none";
  document.getElementById("sourcesSection").style.display = "none";

  // Show the appropriate section
  if (section === 'about') {
    document.getElementById("aboutSection").style.display = "block";
  } else if (section === 'sources') {
    document.getElementById("sourcesSection").style.display = "block";
  } else if (section === 'main') {
    // Return to the main view based on state
    if (currentStudent === "") {
      // Not logged in yet
      document.getElementById("greeting").style.display = "block";
      document.getElementById("loginBox").style.display = "block";
    } else if (currentQuestionIndex < questions.length) {
      // In the middle of the quiz
      document.getElementById("questionContainer").style.display = "block";
    } else if (studentStats.studyHabits.length < studyHabitsQuestions.length) {
      // Time for study habits questions
      document.getElementById("studyHabitsSection").style.display = "block";
    } else {
      // Quiz completed
      document.getElementById("resultsContainer").style.display = "block";
    }
  }
}

function greetStudent() {
  // Get the user's name input
  let name = document.getElementById("nameInput").value.trim();

  // Check if name is entered
  if (name !== "") {
    // Store the student name
    currentStudent = name;

    // Update the greeting text
    document.getElementById("greetingText").textContent = `Welcome, ${name}! Ready to test your JavaScript knowledge?`;

    // Hide the login box and greeting
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("greeting").style.display = "none";

    // Show the question container
    document.getElementById("questionContainer").style.display = "block";

    // Show the student record and hide the description
    document.getElementById("studentRecord").style.display = "block";
    document.getElementById("description").style.display = "none";

    // Reset progress tracking for new session
    currentQuestionIndex = 0;
    studentStats = {
      correct: 0,
      incorrect: 0,
      answers: [],
      studyHabits: []
    };

    // Clear the progress list
    document.getElementById("progressList").innerHTML = "";

    // Load the first question
    loadQuestion(currentQuestionIndex);
  } else {
    alert("Please enter your name to proceed.");
  }
}

function loadQuestion(index) {
  if (index < questions.length) {
    const question = questions[index];

    // Set the question text
    document.getElementById("questionText").textContent = `Question ${index + 1} of ${questions.length}: ${question.question}`;

    // Set the option texts
    document.getElementById("A").textContent = `A: ${question.options.A}`;
    document.getElementById("B").textContent = `B: ${question.options.B}`;
    document.getElementById("C").textContent = `C: ${question.options.C}`;
    document.getElementById("D").textContent = `D: ${question.options.D}`;

    // Reset button styles
    const buttons = document.querySelectorAll(".answer-option");
    buttons.forEach(button => {
      button.style.backgroundColor = "#dbe4ff";
      button.disabled = false;
    });

    // Hide next question button initially
    document.getElementById("nextQuestion").style.display = "none";
  } else {
    // End of questions - show study habits section
    loadStudyHabitsQuestions();
  }
}

function loadStudyHabitsQuestions() {
  // Hide question container
  document.getElementById("questionContainer").style.display = "none";

  // Show study habits container
  document.getElementById("studyHabitsSection").style.display = "block";

  // Generate study habits questions
  const studyHabitsContainer = document.getElementById("studyHabitsQuestions");
  studyHabitsContainer.innerHTML = "";

  studyHabitsQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "study-habits-question";
    questionDiv.innerHTML = `
      <p>Question ${index + 1}: ${question.question}</p>
      <div class="study-habits-option">
        <input type="radio" name="studyHabit${index}" value="A" id="studyA${index}">
        <label for="studyA${index}">${question.options.A}</label>
      </div>
      <div class="study-habits-option">
        <input type="radio" name="studyHabit${index}" value="B" id="studyB${index}">
        <label for="studyB${index}">${question.options.B}</label>
      </div>
      <div class="study-habits-option">
        <input type="radio" name="studyHabit${index}" value="C" id="studyC${index}">
        <label for="studyC${index}">${question.options.C}</label>
      </div>
      <div class="study-habits-option">
        <input type="radio" name="studyHabit${index}" value="D" id="studyD${index}">
        <label for="studyD${index}">${question.options.D}</label>
      </div>
    `;
    studyHabitsContainer.appendChild(questionDiv);
  });
}

function submitStudyHabits() {
  // Collect study habits answers
  studentStats.studyHabits = [];
  let allAnswered = true;

  for (let i = 0; i < studyHabitsQuestions.length; i++) {
    const selected = document.querySelector(`input[name="studyHabit${i}"]:checked`);
    if (selected) {
      studentStats.studyHabits.push(selected.value);
    } else {
      allAnswered = false;
      break;
    }
  }

  if (!allAnswered) {
    alert("Please answer all study habits questions.");
    return;
  }

  // Show results
  showResults();
}

function checkAnswer(selected) {
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selected === currentQuestion.correct;

  // Disable all buttons to prevent multiple answers
  const buttons = document.querySelectorAll(".answer-option");
  buttons.forEach(button => {
    button.disabled = true;
  });

  // Highlight the selected answer
  const selectedButton = document.getElementById(selected);
  selectedButton.style.backgroundColor = isCorrect ? "#a8e6a8" : "#ffb3b3";

  // Highlight the correct answer if wrong answer was selected
  if (!isCorrect) {
    document.getElementById(currentQuestion.correct).style.backgroundColor = "#a8e6a8";
  }

  // Update stats
  if (isCorrect) {
    studentStats.correct++;
  } else {
    studentStats.incorrect++;
  }

  // Store the answer
  studentStats.answers.push({
    question: currentQuestion.question,
    userAnswer: selected,
    correctAnswer: currentQuestion.correct,
    isCorrect: isCorrect
  });

  // Update the progress list
  updateProgressList(currentQuestion, selected, isCorrect);

  // Show next question button
  document.getElementById("nextQuestion").style.display = "block";
}

function updateProgressList(question, userAnswer, isCorrect) {
  const progressList = document.getElementById("progressList");
  const progressItem = document.createElement("div");
  progressItem.className = `progress-item ${isCorrect ? 'correct' : 'incorrect'}`;
  progressItem.innerHTML = `
    <p><strong>Q${currentQuestionIndex + 1}:</strong> ${isCorrect ? '✓' : '✗'}
    ${question.question.length > 30 ? question.question.substring(0, 30) + '...' : question.question}</p>
  `;
  progressList.appendChild(progressItem);
}

function loadNextQuestion() {
  currentQuestionIndex++;
  loadQuestion(currentQuestionIndex);
}

function showResults() {
  // Hide study habits section
  document.getElementById("studyHabitsSection").style.display = "none";
  
  // Hide progress tracker when showing results
  document.getElementById("studentRecord").style.display = "none";

  // Show results container
  document.getElementById("resultsContainer").style.display = "block";

  // Show thank you message
  document.getElementById("thankYouBox").style.display = "block";

  // Generate results summary
  const resultsSummary = document.getElementById("resultsSummary");
  const totalQuestions = questions.length;
  const score = studentStats.correct;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine tier based on JavaScript score
  let tier = "";
  let tierClass = "";
  let recommendations = "";

  if (score <= 4) {
    tier = "Tier 1: Beginner Level";
    tierClass = "tier-1";
    recommendations = `
      <h3>Recommended Study Habits for Beginner Level:</h3>
      <ol>
        <li><strong>Consistent Study Schedule:</strong> Set aside regular times for studying JavaScript, rather than cramming before exams.</li>
        <li><strong>Active Learning with Code Comprehension:</strong> Begin by reading and tracing existing code examples before writing your own.</li>
        <li><strong>Utilize Beginner-Friendly Online Resources:</strong> Start with structured platforms like freeCodeCamp, Khan Academy, or W3Schools.</li>
      </ol>
    `;
  } else if (score <= 7) {
    tier = "Tier 2: Intermediate Level";
    tierClass = "tier-2";
    recommendations = `
      <h3>Recommended Study Habits for Intermediate Level:</h3>
      <ol>
        <li><strong>Apply Time Management Techniques:</strong> Use the Pomodoro Technique to maintain concentration during longer coding sessions.</li>
        <li><strong>Join or Form Study Groups:</strong> Collaborate with peers to discuss concepts and work through challenging problems together.</li>
        <li><strong>Implement Active Recall Strategies:</strong> Incorporate self-quizzing, practice tests, or digital flashcards for JavaScript concepts.</li>
      </ol>
    `;
  } else {
    tier = "Tier 3: Advanced Level";
    tierClass = "tier-3";
    recommendations = `
      <h3>Recommended Study Habits for Advanced Level:</h3>
      <ol>
        <li><strong>Build Real-World Projects:</strong> Apply your JavaScript knowledge to personal projects that interest you.</li>
        <li><strong>Adopt Spaced Practice and Regular Review:</strong> Review concepts at gradually increasing intervals to strengthen memory retention.</li>
        <li><strong>Track Progress and Celebrate Small Wins:</strong> Use GitHub to log your work or participate in coding challenges.</li>
      </ol>
    `;
  }

  resultsSummary.innerHTML = `
    <h3>${currentStudent}'s Results</h3>
    <div class="tier-badge ${tierClass}">${tier}</div>
    <p>JavaScript Score: ${score} out of ${totalQuestions} (${percentage}%)</p>
    <div class="progress-bar">
      <div class="progress-value" style="width: ${percentage}%"></div>
    </div>
  `;

  // Add personalized recommendations based on tier
  const recommendationBox = document.getElementById("recommendationBox");
  recommendationBox.innerHTML = `<h3>Personalized Study Recommendations</h3>
    ${recommendations}`;

  // Study Habits Analysis
  let studyHabitsAnalysis = "<h3>Study Habits Analysis:</h3><ul>";
  let aAndBCount = 0;

  studentStats.studyHabits.forEach((answer, index) => {
    const habitQuestion = studyHabitsQuestions[index].question;
    const selectedOption = studyHabitsQuestions[index].options[answer];

    if (answer === 'A' || answer === 'B') {
      aAndBCount++;
    }

    studyHabitsAnalysis += `<li><strong>${habitQuestion}</strong>: ${selectedOption}</li>`;
  });
  studyHabitsAnalysis += "</ul>";

  // Add study habits analysis to recommendation box
  recommendationBox.innerHTML += studyHabitsAnalysis;

  // Add study habits quality assessment
  let studyHabitsQuality = "";
  if (aAndBCount >= 4) {
    studyHabitsQuality = "You have well-established study habits. Continue with your current approach and consider mentoring others.";
  } else if (aAndBCount >= 2) {
    studyHabitsQuality = "You have somewhat established study habits. Focus on consistency and try incorporating more active learning techniques.";
  } else {
    studyHabitsQuality = "Your study habits could use improvement. Consider establishing a regular study schedule and using more interactive learning resources.";
  }

  recommendationBox.innerHTML += `<p><strong>Study Habits Assessment:</strong> ${studyHabitsQuality}</p>`;
}

function resetQuiz() {
  // Reset all state variables
  currentQuestionIndex = 0;
  studentStats = {
    correct: 0,
    incorrect: 0,
    answers: [],
    studyHabits: []
  };

  // Clear the progress list
  document.getElementById("progressList").innerHTML = "";

  // Show student record again for tracking progress
  document.getElementById("studentRecord").style.display = "block";
  
  // Hide results and thank you box
  document.getElementById("resultsContainer").style.display = "none";
  document.getElementById("thankYouBox").style.display = "none";

  // Show question container
  document.getElementById("questionContainer").style.display = "block";

  // Load the first question
  loadQuestion(currentQuestionIndex);
}

function logout() {
  // Reset all state variables
  currentStudent = "";
  currentQuestionIndex = 0;
  studentStats = {
    correct: 0,
    incorrect: 0,
    answers: [],
    studyHabits: []
  };

  // Clear the progress list
  document.getElementById("progressList").innerHTML = "";

  // Reset greeting
  document.getElementById("greetingText").textContent = "Welcome, student!";

  // Hide all relevant sections
  document.getElementById("studentRecord").style.display = "none";
  document.getElementById("questionContainer").style.display = "none";
  document.getElementById("studyHabitsSection").style.display = "none";
  document.getElementById("resultsContainer").style.display = "none";
  document.getElementById("thankYouBox").style.display = "none";

  // Show description again
  document.getElementById("description").style.display = "block";

  // Return to login screen
  document.getElementById("greeting").style.display = "block";
  document.getElementById("loginBox").style.display = "block";

  // Name input field should be empty for new login
  document.getElementById("nameInput").value = "";
}

// Initialize the site when loaded
document.addEventListener("DOMContentLoaded", function() {
  // Show greeting and login on page load
  showSection('main');
 
  // Hide student record initially
  document.getElementById("studentRecord").style.display = "none";
  document.getElementById("thankYouBox").style.display = "none";
 
  // Make sure description is visible
  document.getElementById("description").style.display = "block";
});

// Add keyboard navigation for accessibility
document.addEventListener("keydown", function(event) {
  // Check if in question mode
  if (document.getElementById("questionContainer").style.display === "block") {
    // Number keys 1-4 for answering
    if (event.key === "1" || event.key === "a" || event.key === "A") {
      checkAnswer("A");
    } else if (event.key === "2" || event.key === "b" || event.key === "B") {
      checkAnswer("B");
    } else if (event.key === "3" || event.key === "c" || event.key === "C") {
      checkAnswer("C");
    } else if (event.key === "4" || event.key === "d" || event.key === "D") {
      checkAnswer("D");
    }
   
    // Space or Enter for Next Question when button is visible
    if ((event.key === " " || event.key === "Enter") &&
        document.getElementById("nextQuestion").style.display === "block") {
      loadNextQuestion();
    }
  }
});