const inputEl = document.querySelector("#input");
const infoTextEl = document.querySelector(".info-text");
const answerboxEl = document.querySelector(".answer-box");
const titleEl = document.getElementById("title")
const meaningEl = document.getElementById("meaning")
const audioEl = document.getElementById("audio")

async function fetchAPI(word) {

   try {
      infoTextEl.style.display= "block"
      answerboxEl.style.display= "none"
      infoTextEl.innerText = `Please wait. Searching the meaning of "${word}"`
      const APIurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      const response = await fetch(APIurl)
      const data = await response.json();
if (data.title){
   answerboxEl.style.display= "block"
   infoTextEl.style.display= "none"
   titleEl.innerText = word;
   meaningEl.innerText = data.message
   audioEl.style.display = "none";
   // console.log(titleEl);

} else {
   infoTextEl.style.display= "none"
   answerboxEl.style.display= "block"
   titleEl.innerText = word
   meaningEl.innerText = data[0].meanings[0].definitions[0].definition
   audioEl.src = data[0].phonetics[0].audio
   audioEl.style.display = "inline-flex";

}

      

   } catch (error) {
      console.log(error) 
      infoTextEl.innerText = `An error happened. Try again later`
  
   }
  

}

inputEl.addEventListener("keyup", (e)=>{
 if (e.target.value && e.key === "Enter"){
    fetchAPI(e.target.value)
 }
})