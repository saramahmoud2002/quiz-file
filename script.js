const questions = [
    "هل أنت مهتم بدراسة كيفية تأثير العرض والطلب على الأسعار والأسواق؟",
    "هل تحب فهم كيفية عمل الاقتصاد وتأثيره على الأعمال التجارية؟",
    "هل أنت مهتم بالأسواق المالية وكيفية عملها؟",
    "هل تحب التفكير في كيفية إدارة الأموال واستثمارها بشكل ذكي؟",
    "هل تستمتع بتحليل البيانات المالية والمعاملات المالية؟",
    "هل تحب التعامل مع الأرقام والبيانات المالية؟",
    "هل تحب التفاعل مع العملاء وفهم احتياجاتهم؟",
    "هل تحب تنظيم الأشياء وتوجيه الفرق لتحقيق الأهداف المشتركة؟",
    "هل تستمتع بدراسة السياسات الحكومية والتأثيرات التي لها على حياة المواطنين؟",
    "هل لديك اهتمام بالبحث في مفاهيم مثل العدالة الاجتماعية والحقوق الإنسانية؟",
    "هل تحب استخدام التكنولوجيا لتحسين عمليات الأعمال وتطوير حلول فعالة؟",
    "هل لديك الرغبة في الجلوس أمام أجهزة الكمبيوتر لفترة طويلة؟"
];

const questionsEnglish = [
    "Are you interested in studying how supply and demand affect prices and markets?",
    "Do you enjoy understanding how economics works and its impact on business?",
    "Are you interested in financial markets and how they operate?",
    "Do you enjoy thinking about how to manage money and invest it wisely?",
    "Do you enjoy analyzing financial data and transactions?",
    "Do you enjoy working with financial numbers and data?",
    "Do you like interacting with customers and understanding their needs?",
    "Do you enjoy organizing things and directing teams to achieve common goals?",
    "Do you enjoy studying government policies and their impact on citizens' lives?",
    "Are you interested in researching concepts like social justice and human rights?",
    "Do you enjoy using technology to improve business operations and develop effective solutions?",
    "Do you have a desire to sit in front of computers for long periods of time?"
];

const results = {
    "economics": "Economics",
    "finance": "Finance",
    "accounting": "Accounting",
    "business": "Business Administration",
    "political": "Political Science",
    "information_system": "Information Systems"
};

let currentQuestion = 0;
let answers = [];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const prevButton = document.getElementById('prev-btn');
const choiceText = document.getElementById('choice-text');

function displayQuestion() {
    const currentQArabic = questions[currentQuestion];
    const currentQEnglish = questionsEnglish[currentQuestion];
    questionElement.innerHTML = `<div>${currentQEnglish}</div><div>${currentQArabic}</div>`;
    optionsElement.innerHTML = '';

    const option1 = createOptionButton("Yes");
    const option2 = createOptionButton("No");

    optionsElement.appendChild(option1);
    optionsElement.appendChild(option2);
}

function createOptionButton(text) {
    const option = document.createElement('button');
    option.textContent = text;
    option.classList.add('option-button');
    option.addEventListener('click', () => {
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => button.classList.remove('selected'));
        option.classList.add('selected');
        answers[currentQuestion] = text === "Yes" ? "likely" : "dislikely";
        showNextQuestion(); // Call the function to show the next question directly
    });
    return option;
}

function showNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        if (currentQuestion > 0) {
            prevButton.style.display = 'block'; // Show the Previous button from the second question onwards
        }
    } else {
        displayResult();
    }
}

function displayResult() {
    let selectedMajors = [];

    if (answers.every(answer => answer === "likely")) {
        selectedMajors = Object.keys(results);
    } else {
        if (answers[0] === "likely" && answers[1] === "likely") {
            selectedMajors.push("economics");
        }
        if (answers[2] === "likely" && answers[3] === "likely") {
            selectedMajors.push("finance");
        }
        if (answers[4] === "likely" && answers[5] === "likely") {
            selectedMajors.push("accounting");
        }
        if (answers[6] === "likely" && answers[7] === "likely") {
            selectedMajors.push("business");
        }
        if (answers[8] === "likely" && answers[9] === "likely") {
            selectedMajors.push("political");
        }
        if (answers[10] === "likely" && answers[11] === "likely") {
            selectedMajors.push("information_system");
        }
    }

    if (selectedMajors.length > 0) {
        resultElement.textContent = selectedMajors.join(" or ");
        choiceText.style.display = 'block'; // Display the choice text
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    } else {
        resultElement.textContent = "No suitable major has been selected";
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    }
}

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        if (currentQuestion === 0) {
            prevButton.style.display = 'none'; // Hide the Previous button on the first question
        }
    }
});

displayQuestion();
