let data=[],i=0,score=Number(localStorage.getItem('starengScore')||0),answered=false;
const $=id=>document.getElementById(id); function screens(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active')}
function updateScore(){$('score').textContent='Puan: '+score} updateScore();
function goHome(){screens('home')} function openLearn(l){data=l==='A1'?A1:A2;i=0;screens('learn');showWord(l)}
function showWord(l){let x=data[i];$('level').textContent=l+' • '+(i+1)+' / '+data.length;$('word').textContent=x.w;$('meaning').textContent=x.m;$('sentence').textContent=x.s;$('translation').textContent=x.t}
function nextWord(){i=(i+1)%data.length;showWord(data===A1?'A1':'A2')} function prevWord(){i=(i-1+data.length)%data.length;showWord(data===A1?'A1':'A2')}
function openQuiz(l){data=l==='A1'?A1:A2;i=0;screens('quiz');showQuestion(l)}
function showQuestion(l){answered=false;$('feedback').textContent='';$('qlevel').textContent=l+' Test • '+(i+1)+' / '+data.length;let q=data[i];$('question').textContent='“'+q.w+'” kelimesinin anlamı nedir?';let opts=[q,...data.filter(x=>x!==q).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);$('answers').innerHTML='';opts.forEach(o=>{let b=document.createElement('button');b.textContent=o.m;b.onclick=()=>answer(o===q,b);$('answers').appendChild(b)})}
function answer(ok,b){if(answered)return;answered=true;if(ok){score+=10;localStorage.setItem('starengScore',score);updateScore();$('feedback').textContent='✓ Doğru! +10 puan'}else $('feedback').textContent='✗ Tekrar deneyerek öğreneceksin.'}
function nextQuestion(){i=(i+1)%data.length;showQuestion(data===A1?'A1':'A2')}
if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js');