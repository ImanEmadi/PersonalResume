
// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

document.addEventListener("load", function (e) {
  console.log(e);
});

//* GLOBALS */

document.getElementById('message').innerText = "";

const applyTheme = (theme) => {

  const oldLink = document.getElementById("themeCSS");

  if (oldLink) oldLink.parentElement.removeChild(oldLink);

  const linkElm = document.createElement("link");

  const id = document.createAttribute("id");
  id.value = "themeCSS";
  const rel = document.createAttribute("rel");
  rel.value = "stylesheet";
  const type = document.createAttribute("type");
  type.value = "text/css";
  linkElm.attributes.setNamedItem(rel);
  linkElm.attributes.setNamedItem(type);
  linkElm.attributes.setNamedItem(id);
  linkElm.href = "./css/";
  if (theme === 'dark')
    linkElm.href += "dark.css"
  else
    linkElm.href += "light.css"
  document.getElementsByTagName("head")[0].appendChild(linkElm);
}

const theme = window.localStorage.getItem('theme');
if (['dark', 'light'].includes(theme)) applyTheme(theme);
else applyTheme('dark');

//*  Add your javascript here

const themeBtns = document.getElementsByClassName('theme-btn');

for (const btn of themeBtns) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const themeToApply = this.getAttribute('data-theme');
    window.localStorage.setItem('theme', themeToApply);
    applyTheme(themeToApply);
  });
}

//! Translation */

const translate = (language) => {
  let languageObj;
  switch (language) {
    case "en":
      languageObj = english;
      break;
    case "pe":
      languageObj = persian;
      break;
    case "de":
      languageObj = deutsch;
      break;
    default:
      return; // invalid request
  }

  if (typeof languageObj === 'undefined') return;

  const targets = document.querySelectorAll("[data-translate]");
  let translation;
  for (const target of targets) {
    const content = target.getAttribute('data-translate');
    if (content === null) translation = "????";
    else translation = languageObj[content] ?? "????";
    target.innerHTML = translation;
  }

  const rtl = language === 'pe';

  document.body.setAttribute("dir", rtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", rtl ? "fa" : "en");

  const mdbLink = document.getElementById('mdbLink');
  if (mdbLink) mdbLink.href = "./css/" + (rtl ? "mdb.rtl.min.css" : "mdb.min.css");

}

const langBtns = document.querySelectorAll(".language-btn");
for (const langBtn of langBtns)
  langBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const lang = this.getAttribute("data-language");
    window.localStorage.setItem('lang', lang);
    translate(lang);
  });

// load language
const lang = window.localStorage.getItem("lang");
translate(lang ?? "en");

