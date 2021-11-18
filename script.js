async function posliZpravu() {
  let p = document.getElementById("prezdivka").value;
  let z = document.getElementById("zprava").value;

  let url = "https://nodejs-3260.rostiapp.cz/chat2/addMsg?nick=" + p + "&msg=" + z;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data);

  document.getElementById("zprava").value = ""; //vymaze text zpravy
  document.getElementById("zprava").focus(); //blika kurzor ve zprave
} 

async function obnovZpravy() {
  let url = "https://nodejs-3260.rostiapp.cz/chat2/listMsgs";
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data);

  let s = "";
  for (let o of data) {
    s = o.time + " " + o.nick + ":<br><b>" + o.msg + "</b><br>" + s;
  }
  document.getElementById("seznamZprav").innerHTML = s;
} 

function stiskKlavesyDolu(udalost) {
  console.log(udalost.key);
  if (udalost.key == "Enter") { //odeslani zpravy po stisku Enter
    posliZpravu();
  }
}

function poNacteni() {
  document.getElementById("zprava").addEventListener("keydown", stiskKlavesyDolu);

  setInterval(obnovZpravy, 1000);
}