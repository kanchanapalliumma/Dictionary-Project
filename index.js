let inpword = document.getElementById("inpword");
let searchwords = inpword.value;
// console.log(inpword.value);
let icon_search = document.getElementById("icon-search");
icon_search.addEventListener("click", function (e) {
  let inpword = document.getElementById("inpword");
  let searchwords = inpword.value;
  DisplayWord();
  // if (!(searchwords)==""){
  // Givemeaning(searchwords)
  // }else{
  // let main_div=document.getElementsByClassName("main-div")
  // let phonetic_word = document.getElementById("phonetic-word");
  // phonetic_word.innerText=""
  // let partsofspeech_parent = document.getElementsByClassName("partsofspeech-section")[0];
  // partsofspeech_parent.innerText=""
  // let source = document.getElementById("source");
  // source.innerText=""
  // let word = document.getElementById("word");
  // word.innerText =""
  // let informMesssage=document.getElementById("informMessage")
  // informMesssage.innerText="PLease enter a word"
});
// let inpword = document.getElementById("inpword");
// console.log(inpword.value);
let audio;
async function Givemeaning() {
  let div_container = document.getElementsByClassName("div-container")[0];
  // if ()
  // div_container.style.backgroundColor="white"
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
  // let source_line = document.getElementById("source-line");
  // source_line.style.display = "none";
  // source_line.classList.add("source-line");
  //PHONETICS//
  // let informMesssage = document.getElementById("informMessage");
  // informMesssage.innerText=loading
  await fetch(fetchurl)
    .then((response) => response.json())
    .then((data) => {
      //   let firstindex=data[0];
      //   let inside=firstindex.meanings
      //   let meaning=inside[0]
      //   console.log(meaning.synonyms)
      let datainside = data[0];
      console.log(data[0]);
      let informMesssage = document.getElementById("informMessage");
      informMesssage.innerText = "";
      let div_container = document.getElementsByClassName("div-container")[0];
      div_container.style.backgroundColor = "white";
      // DisplayWord()

      //WORD//
      // informMesssage.innerText=""
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
          } else {
            phonetic_word.innerText = phonetic[i].text;
            // let audio = document.getElementById("audio");
            audio = new Audio(data[0].phonetics[i].audio);
            break;
          }
        }
      }
      // } else {
      // phonetic_word.innerText =
      // }

      console.log(phonetic_word);
      // let audio=document.getElementById("audio")
      // audio

      //MEANINGS//

      let meaning_section = datainside.meanings;
      let partsofspeech_parent = document.getElementsByClassName(
        "partsofspeech-section"
      )[0];
      //   console.log(meaning_section)
      for (i = 0; i < meaning_section.length; i++) {
        let partsOfSpeech = document.createElement("h4");
        let div_line = document.createElement("div");
        div_line.classList.add("div-line");
        var line = document.createElement("hr");
        line.classList.add("hr-line");
        line.style.border = "none";
        line.style.borderTop = "1px solid";
        line.style.width = "500px";
        // let partsOfSpeech_one = meaning_section[i].partOfSpeech;
        partsOfSpeech.innerHTML = meaning_section[i].partOfSpeech;
        partsOfSpeech.classList.add("partsofspeech-word");
        div_line.appendChild(partsOfSpeech);
        div_line.appendChild(line);
        partsofspeech_parent.appendChild(div_line);
        // set line stroke and line width
        //     ctx.strokeStyle = 'red';
        //     ctx.lineWidth = 5;

        //     // draw a red line
        //     ctx.beginPath();
        //     ctx.moveTo(100, 100);
        //     ctx.lineTo(300, 100);
        //     ctx.stroke();

        // }
        // draw();
        // let line = document.createElement("hr");
        // line.innerHTML = hr;g
        // partsofspeech_parent.appendChild(line);
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
          let objectItem = meaning_section[i].definitions[j];
          listItem.innerHTML = objectItem.definition;
          example.innerHTML = `"${objectItem.example}"`;
          unorderdlist.appendChild(listItem);
          if (objectItem.example) {
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
        // synonym_section.classList.add("meanings")
        let synonym = document.createElement("h4");
        synonym.classList.add("meanings");
        synonym.innerHTML = "Synonyms";
        let synonym_index = meaning_section[i].synonyms;
        let Totalsynonyms = "";
        let synonyms = document.createElement("p");
        synonyms.classList.add("synonyms-words");
        if (synonym_index.length != 0) {
          for (k = 0; k < synonym_index.length; k++) {
            Totalsynonyms =
              Totalsynonyms + meaning_section[i].synonyms[k] + ",";
          }
        } else {
          synonym.style.display = "none";
        }
        synonyms.innerHTML = Totalsynonyms;
        synonym_section.appendChild(synonym);
        synonym_section.appendChild(synonyms);
        firstdiv.appendChild(synonym_section);
      }
      let source_line = document.getElementsByClassName("source-line")[0];
      // source_line.classList.add("source-line");
      source_line.style.border = "none";
      source_line.style.borderTop = "1px solid gray";
      source_line.style.width = "auto";
      let source = document.getElementById("source");
      let sources = datainside.sourceUrls;
      let source_heading = document.getElementById("source-heading");
      source_heading.style.display = "block ";
      console.log(sources);
      //   for (m = 0; m < sources.length; m++) {
      //     let newsources = document.createElement("a");
      //     newsources.innerHTML = sources = data[0].sourceUrls[m];
      source.innerText = sources;
      //     console.log(newsources);
      // }
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
      let source_line = document.getElementById("source-line");
      // source_line.style.display = "none";
      let source_heading = document.getElementById("source-heading");
      source_heading.style.display = "none";
      let informMesssage = document.getElementById("informMessage");
      let div_container = document.getElementsByClassName("div-container")[0];
      div_container.style.backgroundColor = "rgb(255, 206, 213)";
      // informMesssage.classList.add("infomessage")
      informMesssage.innerText = `We can't find the meaning of "${inpword.value}"`;
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
    let div_container = document.getElementsByClassName("div-container")[0];
    div_container.style.backgroundColor = "rgb(255, 206, 213)";

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
      let div_container = document.getElementsByClassName("div-container")[0];
      div_container.style.backgroundColor = "rgb(255, 206, 213)";
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
  if (
    informMesssage.innerText ==
    `We can't find the meaning of "${inpword.value}"`
  ) {
    let div_container = document.getElementsByClassName("div-container")[0];
    div_container.style.backgroundColor = "black";
  } else {
    let div_container = document.getElementsByClassName("div-container")[0];
    div_container.style.backgroundColor = "rgb(255, 206, 213)";
  }
  // div_container.style.backgroundColor = "rgb(255, 206, 213)";
});

// function Fonts() {
//   const selection = document.getElementById("font-selection").value;
//   if (selection == "Arial") {
//     let body = document.getElementsByTagName("body")[0];
//     body.style.fontFamily = "Arial";
//   } else if (selection == "Times New Roman") {
//     body.style.fontFamily = "Arial";
//   } else if (selection == "Tahoma") {
//     body.style.fontFamily = "Arial";
//   }
// }
let font_selection = document.getElementById("font-selection");
font_selection.addEventListener("change", function () {
  const selection = document.getElementById("font-selection").value;
  if (selection == "Arial") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  } else if (selection == "Times New Roman") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  } else if (selection == "Tahoma") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  } else if (selection == "Serif") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  } else if (selection == "Sans-Serif") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  } else if (selection == "Cursive") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  } else if (selection == "Fantasy") {
    let container = document.getElementsByClassName("div-container")[0];
    container.style.fontFamily = selection;
  }
});
// const selection = document.getElementById("arial")
// selection.addEventListener("click",function(){
//   let body = document.getElementsByTagName("body")[0];
//     body.style.fontFamily = "Arial";
// })
// const thomas = document.getElementById("tahoma")
// thomas.addEventListener("click",function(){
//   let body = document.getElementsByTagName("body")[0];
//     body.style.fontFamily = "Tahoma";
// })

// let label=document.getElementsByTagName("label")
// label.addEventListener("click",function(){
//   let moon=document.getElementById("moon")
//   moon.style.color="black"
//   label.style.color="voilet"

// })
