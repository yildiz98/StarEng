const lessons={
alphabet:{title:"Alfabe",storage:"alphabet",data:LESSON_ALPHABET,back:"baslangic"},
numbers:{title:"Sayılar",storage:"numbers",data:LESSON_NUMBERS,back:"baslangic"},
colors:{title:"Renkler",storage:"colors",data:LESSON_COLORS,back:"baslangic"},
family1:{title:"Aile ve İnsanlar I",storage:"l1",data:LESSON_01,back:"kelimeler"},
family2:{title:"Aile ve İnsanlar II",storage:"l2",data:LESSON_02,back:"kelimeler"},
animals:{title:"Hayvanlar",storage:"animals",data:LESSON_ANIMALS,back:"kelimeler"},
fruits:{title:"Meyveler",storage:"fruits",data:LESSON_FRUITS,back:"kelimeler"},
objects:{title:"Eşyalar",storage:"objects",data:LESSON_OBJECTS,back:"kelimeler"},
verbs:{title:"Temel Fiiller",storage:"verbs",data:LESSON_VERBS,back:"fiiller"}
};

const modules={
baslangic:{no:"01 • TEMEL BAŞLANGIÇ",title:"Başlangıç",desc:"A1 için temel: harf, sayı ve renk.",cards:[
["🔤 Alfabe","26 harf ve örnek kelimeler.","alphabet"],["🔢 Sayılar","0–100 temel sayılar.","numbers"],["🎨 Renkler","Günlük kullanılan renkler.","colors"],["📅 Günler ve Aylar","Yakında eklenecek.","soon"],["🕒 Saat","Yakında eklenecek.","soon"],["🧭 Temel Komutlar","Yakında eklenecek.","soon"]]},
kelimeler:{no:"02 • KELİME DÜNYASI",title:"Kelimeler",desc:"Kelimeleri konu gruplarıyla öğren ve yazarak pekiştir.",cards:[
["👨‍👩‍👧 Aile ve İnsanlar I","Ders 1: ilk 10 kelime.","family1"],["👥 Aile ve İnsanlar II","Ders 2: sonraki 10 kelime.","family2"],["🐾 Hayvanlar","10 temel hayvan kelimesi.","animals"],["🍎 Meyveler","10 temel meyve kelimesi.","fruits"],["🏠 Eşyalar","10 temel eşya kelimesi.","objects"],["👕 Kıyafetler","Yakında eklenecek.","soon"]]},
fiiller:{no:"03 • VERB CENTER",title:"Fiiller",desc:"Cümle kurmanın motoru olan temel A1 fiilleri.",cards:[
["⚡ Temel Fiiller","12 temel fiil ve örnek cümle.","verbs"],["Günlük Rutin","Yakında eklenecek.","soon"],["İletişim","Yakında eklenecek.","soon"],["Öğrenme","Yakında eklenecek.","soon"],["İstek ve İhtiyaç","Yakında eklenecek.","soon"],["Hareket","Yakında eklenecek.","soon"]]},
cumle:{no:"04 • SENTENCE LAB",title:"Cümle Kurma",desc:"Öğrendiğin kelime ve fiilleri basit cümlelere dönüştür.",cards:[
["Ben kimim?","I am a student. / I am happy.","soon"],["Sahiplik","I have a car. / She has a book.","soon"],["Günlük eylemler","I drink tea. / I read a book.","soon"],["Olumsuz cümle","I do not like coffee.","soon"],["Soru sorma","Do you like tea? / Where do you live?","soon"],["Cümle büyütme","I eat a red apple every morning.","soon"]]},
konusma:{no:"05 • DAILY ENGLISH",title:"Günlük Konuşma",desc:"A1 düzeyinde kısa diyaloglar.",cards:[
["👋 Tanışma","Yakında eklenecek.","soon"],["🛒 Alışveriş","Yakında eklenecek.","soon"],["🍽️ Restoran","Yakında eklenecek.","soon"],["🗺️ Yol Sorma","Yakında eklenecek.","soon"],["📞 Telefon","Yakında eklenecek.","soon"],["🏠 Günlük Rutin","Yakında eklenecek.","soon"]]},
final:{no:"06 • A1 FINAL",title:"A1 Final Testi",desc:"Tüm öğrenme yolunu tamamladıktan sonra kendini ölç.",cards:[
["Kelime Testi","Yakında eklenecek.","soon"],["Yazma Testi","Yakında eklenecek.","soon"],["Fiil Testi","Yakında eklenecek.","soon"],["Cümle Testi","Yakında eklenecek.","soon"],["Diyalog Testi","Yakında eklenecek.","soon"],["A1 Sonuç","Yakında eklenecek.","soon"]]}
};

let current=0,activeKey="alphabet",activeData=LESSON_ALPHABET,done=[];
function page(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0)}
function showRoadmap(){page("roadmap")}
function openModule(key){
 const m=modules[key];document.getElementById("moduleNo").textContent=m.no;document.getElementById("moduleTitle").textContent=m.title;document.getElementById("moduleDesc").textContent=m.desc;
 const box=document.getElementById("moduleContent");box.innerHTML="";
 m.cards.forEach(c=>{const d=document.createElement("div");d.className="card";const active=c[2]&&c[2]!=="soon";d.innerHTML=`<h3>${c[0]}</h3><p>${c[1]}</p><button class="${active?"primary":""}">${active?"Derse Başla":"Yakında"}</button>`;if(active)d.querySelector("button").onclick=()=>startStudy(c[2]);box.appendChild(d)});
 page("module");
}
function startStudy(key){
 activeKey=key;const l=lessons[key];activeData=l.data||[];current=0;done=JSON.parse(localStorage.getItem("stareng_"+l.storage)||"[]");
 document.getElementById("studyTitle").textContent=l.title;document.getElementById("studyBack").onclick=()=>openModule(l.back);
 render();page("study");
}
function render(){
 if(!activeData.length){word.textContent="Yakında";meaning.textContent="";sentence.textContent="Bu ders hazırlanıyor.";translation.textContent="";count.textContent="0 / 0";return}
 const x=activeData[current];word.textContent=x.letter?x.letter+" • "+x.word:x.word;meaning.textContent=x.meaning;sentence.textContent=x.sentence;translation.textContent=x.translation;count.textContent=(current+1)+" / "+activeData.length;status.textContent=done.includes(x.id)?"✓ Öğrenildi olarak işaretlendi":"";
}
function nextWord(){current=(current+1)%activeData.length;render()}
function prevWord(){current=(current-1+activeData.length)%activeData.length;render()}
function markLearned(){const l=lessons[activeKey];const id=activeData[current].id;if(!done.includes(id)){done.push(id);localStorage.setItem("stareng_"+l.storage,JSON.stringify(done))}render()}
