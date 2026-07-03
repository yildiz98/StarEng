function showPage(pageId) {
  document.querySelectorAll(".page").forEach(function(page) {
    page.classList.remove("active");
  });

  var selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function setLevel(level) {
  localStorage.setItem("stareng_level", level);
  alert(level + " seviyesi seçildi. Soru havuzu eklendiğinde bu seviye kullanılacak.");
  showPage("home");
}
