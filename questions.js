// timer
var sec = 75;
var time = setInterval(myTimer, 1000);

function myTimer() {
  document.getElementById("timer").innerHTML = sec;
  sec--;
  if (sec == -1) {
    clearInterval(time);
    alert("หมดเวลาจ้า!!!");
  }
}

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "คำถามที่ " +
    currentQuestionNumber +
    " จากทั้งหมด " +
    quiz.questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>คุณจำได้ดีแค่ไหน</h1>";
  gameOverHTML += "<h2 id='score'> คะแนน: " + quiz.score + "</h2>";
  gameOverHTML +=
    "<button id='facebookShareButton'>แชร์คะแนนนี้บน facebook</button>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;

  var facebookShareButton = document.getElementById("facebookShareButton");
  facebookShareButton.onclick = function () {
    shareScoreOnFacebook(quiz.score);
  };
}

function shareScoreOnFacebook(score) {
  var shareUrl = window.location.href;
  var shareText = "I scored " + score + " in the Pop Quiz!";
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 200;
  context.fillStyle = "#FFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#000";
  context.font = "30px Arial";
  context.fillText("I scored " + score + " in the Pop Quiz!", 50, 100);

  var dataUrl = canvas.toDataURL("image/png");

  var facebookShareUrl =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(shareUrl) +
    "&quote=" +
    encodeURIComponent(shareText);

  var newWindow = window.open(facebookShareUrl, "_blank");
  if (newWindow) {
    newWindow.onload = function () {
      var img = new Image();
      img.src = dataUrl;
      newWindow.document.body.appendChild(img);
    };
  }
}

//question
var questions = [
  new Question(
    "ใครเป็นผู้นำการรัฐประหารปี 2557 ในประเทศไทย?",
    [
      "ยิ่งลักษณ์ ชินวัตร",
      "ทักษิณ ชินวัตร",
      "ประยุทธ์ จันทร์โอชา",
      "อภิสิทธิ์ เวชชาชีวะ",
    ],
    "ประยุทธ์ จันทร์โอชา"
  ),
  new Question(
    "รัฐประหารปี 2557 ในประเทศไทยเกิดขึ้นในวันที่เท่าไร?",
    ["22 พฤษภาคม 2557", "1 มิถุนายน 2557", "30 เมษายน 2557", "15 พฤษภาคม 2557"],
    "22 พฤษภาคม 2557"
  ),
  new Question(
    "เหตุผลหลักที่กองทัพให้สำหรับการรัฐประหารปี 2557 คืออะไร?",
    [
      "วิกฤตเศรษฐกิจ",
      "ความไม่มั่นคงทางการเมืองและการทุจริต",
      "การแทรกแซงจากต่างประเทศ",
      "ภัยพิบัติทางธรรมชาติ",
    ],
    "ความไม่มั่นคงทางการเมืองและการทุจริต"
  ),
  new Question(
    "ใครเป็นนายกรัฐมนตรีของประเทศไทยก่อนการรัฐประหารปี 2557?",
    [
      "อภิสิทธิ์ เวชชาชีวะ",
      "ทักษิณ ชินวัตร",
      "ยิ่งลักษณ์ ชินวัตร",
      "สมชาย วงศ์สวัสดิ์",
    ],
    "ยิ่งลักษณ์ ชินวัตร"
  ),
  new Question(
    "หน่วยงานการเมืองใดที่กองทัพจัดตั้งขึ้นหลังการรัฐประหาร?",
    [
      "สภาปฏิรูปแห่งชาติ",
      "สภานิติบัญญัติแห่งชาติ",
      "สภาความมั่นคงแห่งชาติ",
      "คณะรักษาความสงบแห่งชาติ (คสช.)",
    ],
    "คณะรักษาความสงบแห่งชาติ (คสช.)"
  ),
  new Question(
    "การเปลี่ยนแปลงที่สำคัญที่ คสช. ดำเนินการในปี 2560 คืออะไร?",
    [
      "นโยบายเศรษฐกิจใหม่",
      "การแก้ไขรัฐธรรมนูญ",
      "ระบบการศึกษาใหม่",
      "การขยายกองทัพ",
    ],
    "การแก้ไขรัฐธรรมนูญ"
  ),
  new Question(
    "การเลือกตั้งครั้งแรกหลังการรัฐประหารปี 2557 จัดขึ้นเมื่อไร?",
    ["24 มีนาคม 2562", "14 พฤษภาคม 2559", "12 สิงหาคม 2561", "10 มกราคม 2560"],
    "24 มีนาคม 2562"
  ),
  new Question(
    "ใครกลายเป็นนายกรัฐมนตรีหลังการเลือกตั้งปี 2562?",
    [
      "ประยุทธ์ จันทร์โอชา",
      "อภิสิทธิ์ เวชชาชีวะ",
      "ทักษิณ ชินวัตร",
      "อนุทิน ชาญวีรกูล",
    ],
    "ประยุทธ์ จันทร์โอชา"
  ),
  new Question(
    "พรรคการเมืองใดชนะการเลือกตั้งมากที่สุดในปี 2566?",
    ["พรรคเพื่อไทย", "พรรคพลังประชารัฐ", "พรรคก้าวไกล", "พรรคประชาธิปัตย์"],
    "พรรคก้าวไกล"
  ),
  new Question(
    "มรดกของรัฐประหารปี 2557 มักเชื่อมโยงกับอะไร?",
    [
      "การเติบโตทางเศรษฐกิจ",
      "การพัฒนาโครงสร้างพื้นฐาน",
      "อิทธิพลของกองทัพในทางการเมือง",
      "การปฏิรูปการศึกษา",
    ],
    "อิทธิพลของกองทัพในทางการเมือง"
  ),
];

// make quiz
var quiz = new Quiz(questions);

// show quiz
populate();