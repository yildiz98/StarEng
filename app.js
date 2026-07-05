const modules={
baslangic:{no:"01 • TEMEL BAŞLANGIÇ",title:"Başlangıç",desc:"İngilizceye sıfırdan başlamak için temel yapı taşları.",cards:[
["🔤 Alfabe","26 harf, harf adları ve temel ses farkları."],["🔢 Sayılar","0–100 sayılar ve basit sayı kullanımı."],["🎨 Renkler","Temel renkleri tanı, yaz ve eşleştir."],["📅 Günler ve Aylar","Hafta günleri, aylar ve basit tarih ifadeleri."],["🕒 Saat","Tam ve yarım saatleri söylemeye giriş."],["🧭 Temel Komutlar","open, close, listen, look, write gibi sınıf komutları."]]},
kelimeler:{no:"02 • KELİME DÜNYASI",title:"Kelimeler",desc:"Kelimeleri konu gruplarıyla öğren ve yazarak pekiştir.",cards:[
["👨‍👩‍👧 Aile ve İnsanlar","Ders 1 hazır: ilk 10 kelime.","study"],["🐾 Hayvanlar","Temel evcil ve vahşi hayvanlar."],["🍎 Meyveler ve Sebzeler","Günlük yiyecek kelimeleri."],["🏠 Ev ve Eşyalar","Odalar ve sık kullanılan ev eşyaları."],["👕 Kıyafetler","Temel giyim kelimeleri."],["🏙️ Yerler ve Ulaşım","Şehir, okul, market, otobüs ve yönler."]]},
fiiller:{no:"03 • VERB CENTER",title:"Fiiller",desc:"Cümle kurmanın motoru olan temel A1 fiillerini öğren.",cards:[
["Temel Fiiller I","be, have, do, go, come, get, give, take"],["Günlük Rutin","wake, eat, drink, work, study, sleep"],["İletişim","say, tell, ask, answer, speak, listen"],["Öğrenme","read, write, learn, understand, know"],["İstek ve İhtiyaç","want, need, like, love"],["Hareket","walk, run, drive, sit, stand"]]},
cumle:{no:"04 • SENTENCE LAB",title:"Cümle Kurma",desc:"Öğrendiğin kelime ve fiilleri basit cümlelere dönüştür.",cards:[
["Ben kimim?","I am a student. / I am happy."],["Sahiplik","I have a car. / She has a book."],["Günlük eylemler","I drink tea. / I read a book."],["Olumsuz cümle","I do not like coffee."],["Soru sorma","Do you like tea? / Where do you live?"],["Cümle büyütme","I eat an apple → I eat a red apple every morning."]]},
konusma:{no:"05 • DAILY ENGLISH",title:"Günlük Konuşma",desc:"A1 düzeyinde gerçek hayattaki kısa diyaloglara hazırlan.",cards:[
["👋 Tanışma","Ad, ülke, yaş ve temel kişisel bilgi."],["🛒 Alışveriş","Fiyat sorma ve basit ürün talepleri."],["🍽️ Restoran","Sipariş verme ve isteme kalıpları."],["🗺️ Yol Sorma","Where is...? ve temel yönler."],["📞 Telefon","Basit arama ve kısa cevap kalıpları."],["🏠 Günlük Rutin","Sabah, iş, okul ve akşam rutinleri."]]},
final:{no:"06 • A1 FINAL",title:"A1 Final Testi",desc:"Tüm öğrenme yolunu tamamladıktan sonra kendini ölç.",cards:[
["Kelime Testi","Anlam ve eşleştirme."],["Yazma Testi","Türkçeden İngilizce kelime yazma."],["Fiil Testi","Doğru fiili seçme."],["Cümle Testi","Kelimeleri doğru sıraya koyma."],["Diyalog Testi","Günlük konuşmada doğru cevabı seçme."],["A1 Sonuç","Genel başarı yüzdesi ve eksik alanlar."]]}
};
let current=0,done=JSON.parse(localStorage.getItem("stareng_l1")||"[]");
function page(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0)}
function showRoadmap(){page("roadmap")}
function openModule(key){const m=modules[key];document.getElementById("moduleNo").textContent=m.no;document.getElementById("moduleTitle").textContent=m.title;document.getElementById("moduleDesc").textContent=m.desc;const box=document.getElementById("moduleContent");box.innerHTML="";m.cards.forEach(c=>{const d=document.createElement("div");d.className="card";d.innerHTML=`<h3>${c[0]}</h3><p>${c[1]}</p><button class="${c[2]==="study"?"primary":""}">${c[2]==="study"?"Derse Başla":"Yakında"}</button>`;if(c[2]==="study")d.querySelector("button").onclick=startStudy;box.appendChild(d)});page("module")}
function startStudy(){current=0;render();page("study")}
function render(){const x=LESSON_01[current];word.textContent=x.word;meaning.textContent=x.meaning;sentence.textContent=x.sentence;translation.textContent=x.translation;count.textContent=(current+1)+" / "+LESSON_01.length;status.textContent=done.includes(x.id)?"✓ Öğrenildi olarak işaretlendi":""}
function nextWord(){current=(current+1)%LESSON_01.length;render()}
function prevWord(){current=(current-1+LESSON_01.length)%LESSON_01.length;render()}
function markLearned(){const id=LESSON_01[current].id;if(!done.includes(id)){done.push(id);localStorage.setItem("stareng_l1",JSON.stringify(done))}render()}
