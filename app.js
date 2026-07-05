let currentIndex = 0;
let quizWord = null;
let learned = JSON.parse(localStorage.getItem("stareng_a1_learned") || "[]");

function showPage(pageId){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const selected=document.getElementById(pageId);
  if(selected){selected.classList.add("active");window.scrollTo({top:0,behavior:"smooth"});}
  updateStats();
}

function saveLearned(){localStorage.setItem("stareng_a1_learned", JSON.stringify(learned));updateStats();}

function updateStats(){
  const count=learned.length;
  const percent=Math.round((count/A1_WORDS.length)*100);
  const learnedCount=document.getElementById("learnedCount");
  const progressPercent=document.getElementById("progressPercent");
  const statLearned=document.getElementById("statLearned");
  if(learnedCount) learnedCount.textContent=count+" / "+A1_WORDS.length;
  if(progressPercent) progressPercent.textContent=percent+"%";
  if(statLearned) statLearned.textContent=count;
}

function renderLessons(){
  const grid=document.getElementById("lessonGrid");
  if(!grid) return;
  grid.innerHTML="";
  for(let l=1;l<=25;l++){
    const start=(l-1)*10+1;
    const end=l*10;
    const learnedInLesson=A1_WORDS.filter(w=>w.lesson===l && learned.includes(w.id)).length;
    const card=document.createElement("div");
    card.className="lesson-card";
    card.innerHTML=`<h3>Ders ${l}</h3><p>${start}-${end}. kelimeler<br>${learnedInLesson}/10 öğrenildi</p><button>Bu Derse Başla</button>`;
    card.querySelector("button").onclick=function(){currentIndex=(l-1)*10;showWord();showPage("learn");};
    grid.appendChild(card);
  }
}

function showWord(){
  const item=A1_WORDS[currentIndex];
  document.getElementById("cardLesson").textContent="Ders "+item.lesson+" • "+item.category;
  document.getElementById("cardIndex").textContent=item.id+" / "+A1_WORDS.length;
  document.getElementById("wordText").textContent=item.word;
  document.getElementById("meaningText").textContent=item.meaning;
  document.getElementById("sentenceText").textContent=item.sentence;
  document.getElementById("translationText").textContent=item.translation;
  document.getElementById("categoryText").textContent=learned.includes(item.id) ? "✓ Bu kelime öğrenildi olarak işaretlendi." : "Henüz öğrenildi işaretlenmedi.";
}

function nextWord(){currentIndex=(currentIndex+1)%A1_WORDS.length;showWord();}
function prevWord(){currentIndex=(currentIndex-1+A1_WORDS.length)%A1_WORDS.length;showWord();}

function markLearned(){
  const id=A1_WORDS[currentIndex].id;
  if(!learned.includes(id)){learned.push(id);saveLearned();}
  showWord();
}

function startQuiz(){showPage("quiz");nextQuiz();}

function nextQuiz(){
  document.getElementById("quizFeedback").textContent="";
  quizWord=A1_WORDS[Math.floor(Math.random()*A1_WORDS.length)];
  document.getElementById("quizQuestion").textContent=`"${quizWord.word}" kelimesinin Türkçe anlamı nedir?`;
  const options=[quizWord];
  while(options.length<4){
    const random=A1_WORDS[Math.floor(Math.random()*A1_WORDS.length)];
    if(!options.find(o=>o.id===random.id)) options.push(random);
  }
  options.sort(()=>Math.random()-0.5);
  const list=document.getElementById("answerList");
  list.innerHTML="";
  options.forEach(opt=>{
    const btn=document.createElement("button");
    btn.textContent=opt.meaning;
    btn.onclick=function(){checkAnswer(btn,opt.id===quizWord.id);};
    list.appendChild(btn);
  });
}

function checkAnswer(btn,isCorrect){
  document.querySelectorAll("#answerList button").forEach(b=>b.disabled=true);
  if(isCorrect){
    btn.classList.add("correct");
    document.getElementById("quizFeedback").textContent="✓ Doğru cevap!";
  } else {
    btn.classList.add("wrong");
    document.getElementById("quizFeedback").textContent="✗ Yanlış. Doğru cevap: "+quizWord.meaning;
  }
}

document.addEventListener("DOMContentLoaded", function(){
  renderLessons();
  showWord();
  updateStats();
});
