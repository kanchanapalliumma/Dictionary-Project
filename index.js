let inpword = document.getElementById("inpword");
let input = document.getElementsByTagName("input")[0];
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    DisplayWord();
  }
});

let icon_search = document.getElementById("icon-search");
icon_search.addEventListener("click", function (e) {
  DisplayWord();
});

let audio;
async function Givemeaning() {
  let div_container = document.getElementsByClassName("div-container")[0];
  fetchurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inpword.value}`;
  let loading = document.getElementById("loading");
  loading.style.display = "block";
  let loading_message = document.getElementById("loading-message");
  loading_message.style.display = "block";
  let phonetic_word = document.getElementById("phonetic-word");
  phonetic_word.innerText = "";
  let partsofspeech_parent = document.getElementsByClassName(
    "partsofspeech-section"
  )[0];
  partsofspeech_parent.innerText = "";
  let source = document.getElementById("source");
  source.innerText = "";
  let word = document.getElementById("word");
  word.innerText = "";
  let source_heading = document.getElementById("source-heading");
  source_heading.style.display = "none";
  let audio_icon = document.getElementById("audio");
  audio_icon.style.display = "none";
  let source_line = document.getElementsByClassName("source-line")[0];
  source_line.style.display = "none";

  await fetch(fetchurl)
    .then((response) => response.json())
    .then((data) => {
      let datainside = data[0];
      console.log(data[0]);
      let informMesssage = document.getElementById("informMessage");
      informMesssage.innerText = "";
      let div_container = document.getElementsByClassName("div-container")[0];
      div_container.style.backgroundColor = "white";

      //WORD//

      loading.style.display = "none";
      loading_message.style.display = "none";
      let word = document.getElementById("word");
      word.innerText = datainside.word;
      let audio_icon = document.getElementById("audio");
      audio_icon.style.display = "block";

      //PHONETICS//
      let phonetic_word = document.getElementById("phonetic-word");
      let phonetic = datainside.phonetics;
      if (datainside.phonetics.length != 0) {
        for (i = 0; i < phonetic.length; i++) {
          if (phonetic[i].audio === "") {
            i = i + 1;
            audio = new Audio("");
          } else {
            phonetic_word.innerText = phonetic[i].text;
            audio = new Audio(data[0].phonetics[i].audio);
            console.log(audio);
            break;
          }
        }
      }
      console.log(phonetic_word);

      //MEANINGS//

      let meaning_section = datainside.meanings;
      let partsofspeech_parent = document.getElementsByClassName(
        "partsofspeech-section"
      )[0];
      for (i = 0; i < meaning_section.length; i++) {
        let partsOfSpeech = document.createElement("h4");
        let div_line = document.createElement("div");
        div_line.classList.add("div-line");
        var line = document.createElement("hr");
        line.classList.add("hr-line");
        line.style.border = "none";
        line.style.borderTop = "1px solid";
        line.style.width = "500px";
        partsOfSpeech.innerHTML = meaning_section[i].partOfSpeech;
        partsOfSpeech.classList.add("partsofspeech-word");

        div_line.appendChild(partsOfSpeech);
        div_line.appendChild(line);
        partsofspeech_parent.appendChild(div_line);

        let firstdiv = document.createElement("div");
        firstdiv.classList.add("first-divof-meaning");
        let meaningHeading = document.createElement("h5");
        let insde_div = document.createElement("div");
        insde_div.classList.add("meanings-section-div");
        let unorderdlist = document.createElement("ul");
        unorderdlist.classList.add("ul-of-meanings");

        for (j = 0; j < meaning_section[i].definitions.length; j++) {
          let listItem = document.createElement("li");
          let example = document.createElement("li");
          example.classList.add("example");
          example.style.color = "  rgb(163, 160, 160)";
          example.style.listStyle = "none";
          listItem.innerHTML = meaning_section[i].definitions[j].definition;
          example.innerHTML = `"${meaning_section[i].definitions[j].example}"`;
          unorderdlist.appendChild(listItem);
          if (meaning_section[i].definitions[j].example) {
            unorderdlist.appendChild(example);
          } else {
            example.innerHTML = "";
          }
        }
        console.log(unorderdlist);
        meaningHeading.innerHTML = "meaning";

        meaningHeading.classList.add("meanings");
        firstdiv.appendChild(meaningHeading);
        insde_div.appendChild(unorderdlist);
        firstdiv.appendChild(insde_div);
        partsofspeech_parent.appendChild(firstdiv);

        //SYNONYM//

        let synonym_section = document.createElement("div");
        synonym_section.classList.add("synonym-section");
        let synonym = document.createElement("h4");
        synonym.classList.add("meanings");
        synonym.innerHTML = "Synonyms";
        let synonym_index = meaning_section[i].synonyms;
        let Totalsynonyms = "";
        let synonyms_div = document.createElement("div");
        synonyms_div.classList.add("synonyms-div");
        let synonyms = document.createElement("p");
        synonyms.classList.add("synonyms-words");
        if (synonym_index.length != 0) {
          for (k = 0; k < synonym_index.length; k++) {
            Totalsynonyms =
              Totalsynonyms + meaning_section[i].synonyms[k] + ",";
          }
          synonyms.innerHTML = Totalsynonyms;
          synonyms_div.appendChild(synonyms);
          synonym_section.appendChild(synonym);
          synonym_section.appendChild(synonyms_div);
          firstdiv.appendChild(synonym_section);
        } else {
          synonym.style.display = "none";
        }

        const mode = document.getElementById("mode");
        const isDarkMode = mode.classList.contains("active");
        if (isDarkMode) {
          let div_container =
            document.getElementsByClassName("div-container")[0];
          div_container.style.backgroundColor = "black";
          let partsOfSpeech =
            document.getElementsByClassName("partsofspeech-word");
          for (i = 0; i < partsOfSpeech.length; i++) {
            partsOfSpeech[i].style.color = "white";
            console.log(partsOfSpeech);
          }
        }
      }
      let source_line = document.getElementsByClassName("source-line")[0];
      source_line.style.border = "none";
      source_line.style.borderTop = "1px solid gray";
      source_line.style.width = "auto";
      source_line.style.display = "block";
      source_line.style.marginBottom = "30px";
      let source = document.getElementById("source");
      let sources = datainside.sourceUrls;
      let source_heading = document.getElementById("source-heading");
      source_heading.style.display = "block ";
      console.log(sources);
      source.innerText = sources;
    })
    .catch((error) => {
      let phonetic_word = document.getElementById("phonetic-word");
      phonetic_word.innerText = "";
      let partsofspeech_parent = document.getElementsByClassName(
        "partsofspeech-section"
      )[0];
      partsofspeech_parent.innerText = "";
      let source = document.getElementById("source");
      source.innerText = "";
      let word = document.getElementById("word");
      word.innerText = "";
      let audio_icon = document.getElementById("audio");
      audio_icon.style.display = "none";
      let source_heading = document.getElementById("source-heading");
      source_heading.style.display = "none";
      let informMesssage = document.getElementById("informMessage");
      informMesssage.innerText = `We can't find the meaning of "${inpword.value}"`;
      informMesssage.style.backgroundColor = "rgb(234, 237, 237)";
      informMesssage.style.width = "10px 5px";
      console.log(error);
    });
}
let displaytrue = false;
function DisplayWord() {
  let inpword = document.getElementById("inpword").value;
  let informMesssage = document.getElementById("informMessage");
  let regex = /^[a-zA-Z]+$/;
  if (inpword === "") {
    informMesssage.innerText = "Enter any word";
    informMesssage.style.backgroundColor = "rgb(234, 237, 237)";
    let phonetic_word = document.getElementById("phonetic-word");
    phonetic_word.innerText = "";
    let partsofspeech_parent = document.getElementsByClassName(
      "partsofspeech-section"
    )[0];
    partsofspeech_parent.innerText = "";
    let source = document.getElementById("source");
    source.innerText = "";
    let word = document.getElementById("word");
    word.innerText = "";
    let source_heading = document.getElementById("source-heading");
    source_heading.style.display = "none";
    let audio_icon = document.getElementById("audio");
    audio_icon.style.display = "none";
    let source_line = document.getElementsByClassName("source-line")[0];
    source_line.style.display = "none";
    return false;
  } else {
    informMesssage.innerText = "";
    if (!inpword.match(regex)) {
      informMesssage.innerText =
        "Special characters and numbers are not allowed";
      let phonetic_word = document.getElementById("phonetic-word");
      phonetic_word.innerText = "";
      let partsofspeech_parent = document.getElementsByClassName(
        "partsofspeech-section"
      )[0];
      partsofspeech_parent.innerText = "";
      let source = document.getElementById("source");
      source.innerText = "";
      let word = document.getElementById("word");
      word.innerText = "";
      let source_heading = document.getElementById("source-heading");
      source_heading.style.display = "none";
      let audio_icon = document.getElementById("audio");
      audio_icon.style.display = "none";
      return false;
    } else {
      informMesssage.innerText = "";
      Givemeaning();
      return true;
    }
  }
}
let audioplay = document.getElementById("audio");
audioplay.addEventListener("click", function () {
  audio.play();
});

let font_selection = document.getElementById("font-selection");
font_selection.addEventListener("change", function () {
  const selection = document.getElementById("font-selection").value;
  let container = document.getElementsByClassName("div-container")[0];
  if (selection == "Arial") {
    container.style.fontFamily = selection;
  } else if (selection == "Tahoma") {
    container.style.fontFamily = selection;
  } else if (selection == "Serif") {
    container.style.fontFamily = selection;
  } else if (selection == "Sans-Serif") {
    container.style.fontFamily = selection;
  } else if (selection == "Cursive") {
    container.style.fontFamily = selection;
  } else if (selection == "Fantasy") {
    container.style.fontFamily = selection;
  }
});

const content = document.getElementsByTagName("body")[0];
const mode = document.getElementById("mode");
mode.addEventListener("click", function () {
  mode.classList.toggle("active");
  content.classList.toggle("night");
  let moon = document.getElementById("moon");
  moon.style.color = "grey";
  moon.classList.toggle("moon");
  let input = document.getElementsByTagName("input")[0];
  input.style.color = "white";
  input.style.backgroundColor = "rgb(93, 91, 91)";
  let word = document.getElementById("word");
  word.style.color = "white";
  let font_selection = document.getElementById("font-selection");
  font_selection.style.color = "white";
  font_selection.style.backgroundColor = "black";
  let informMesssage = document.getElementById("informMessage");
  informMesssage.style.backgroundColor = "black";
  if (
    informMesssage.innerText ==
    `We can't find the meaning of "${inpword.value}"`
  ) {
    let div_container = document.getElementsByClassName("div-container")[0];
    div_container.style.backgroundColor = "black";
  } else {
    let div_container = document.getElementsByClassName("div-container")[0];
    div_container.style.backgroundColor = "black";
    let partsOfSpeech = document.getElementsByClassName("partsofspeech-word");
    for (i = 0; i < partsOfSpeech.length; i++) {
      partsOfSpeech[i].style.color = "white";
    }
  }
  let div_container = document.getElementsByClassName("div-container")[0];
  div_container.style.backgroundColor = "black";
});

const content_one = document.getElementsByTagName("body")[0];
const mode_one = document.getElementById("mode");
mode_one.addEventListener("click", function () {
  const isDarkMode = mode_one.classList.contains("active");
  if (!isDarkMode) {
    mode_one.classList.toggle("label");
    let moon = document.getElementById("moon");
    moon.style.color = "black";
    moon.classList.toggle("moon");
    let input = document.getElementsByTagName("input")[0];
    input.style.color = "black";
    input.style.backgroundColor = "rgb(234, 237, 237)";
    let word = document.getElementById("word");
    word.style.color = "black";
    let font_selection = document.getElementById("font-selection");
    font_selection.style.color = "black";
    font_selection.style.backgroundColor = "white";
    let div_container = document.getElementsByClassName("div-container")[0];
    div_container.style.backgroundColor = "white";
    let partsOfSpeech = document.getElementsByClassName("partsofspeech-word");
    for (i = 0; i < partsOfSpeech.length; i++) {
      partsOfSpeech[i].style.color = "black";
    }
  }
});
