function handleLessonClick(level) {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then((response) => response.json())
        .then((data) => {
            
            removeActiveClass();
            const selectedButton = document.getElementById(`${level}`);
            
            selectedButton.classList.add("active");
            

            console.log(selectedButton);
            displayLessonCards(data);
        });
}

function displayLessonCards(data) {
    const cardContainer = document.getElementById("words-container");
    cardContainer.innerHTML = "";

    if (!data || !data.data || data.data.length === 0) {
        cardContainer.innerHTML = `
         <section class="col-span-full">
                <div class="py-[64px] text-center rounded-3xl">
                    <div class="flex justify-center my-5">
                        <img class="w-[96px]" src="./assets/alert-error.png">
                    </div>
                    <p class="text-[13px] text-[#79716B] hind-siligur mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h1 class="text-[36px] font-medium poppins">নেক্সট Lesson এ যান</h1>
                </div>
            </section>
        `;
        hideLoader();
        return;
    }

    for (let vocabulary of data.data) {
        const card = document.createElement("div");

        card.innerHTML = `
        <div class="bg-white hover:bg-sky-50 rounded-xl p-7 h-full flex flex-col ">
               
                <div class="text-center">
                    <h1 class="font-bold poppins text-2xl mt-2 mb-5">${vocabulary.word}</h1>
                    <p class="font-medium text-xl hind-siligur mb-2">Meaning /Pronunciation</p>
                    <h2 class="text-xl text-slate-500 mb-7 hind-siligur">"${vocabulary.meaning ?vocabulary.meaning : 'অর্থ নেই'} / ${vocabulary.pronunciation} "</h2>
                </div>
                <div class="text-end">
                <div class="flex justify-between  mb-3 mx-3">
                    <div onclick=loadWordDetails(${vocabulary.id}) class="bg-[#1A91FF10] p-2 rounded-sm">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div onclick="pronounceWord('${vocabulary.word}')" class="bg-[#1A91FF10] p-2 rounded-sm">
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
                </div>
               
            </div>
        `;

        cardContainer.append(card);
    }
    hideLoader();
}


function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US'; 
    window.speechSynthesis.speak(utterance);
  }


const loadWordDetails=(vocabularyId)=>{
console.log(vocabularyId);
const url =`https://openapi.programming-hero.com/api/word/${vocabularyId} `;
fetch(url)
.then(res=> res.json())
.then((data) => displayDetails(data.data));
}
const displayDetails=(card)=>{

document.getElementById("card_details").showModal();
const detailsContainer = document.getElementById("details-container");


  detailsContainer.innerHTML=`
   <div class="rounded-xl border-[#D7E4EF] border-1 p-5 ">
        <h1 class="mb-7 font-semibold text-2xl poppins">
            ${card.word} (<i class="fa-solid fa-microphone-lines"></i> : ${card.pronunciation})
        </h1>
        <p class="font-medium poppins text-2xl mb-1">Meaning</p>
        <p class=" poppins text-xl mb-4">${card.meaning ? card.meaning:'অর্থ পাওয়া যায়নি'}</p>
        <h3 class="font-medium poppins text-2xl mb-1">Example</h3>
        <p class=" poppins text-xl text-slate-600 mb-5" >${card.sentence}</p>
        <h3 class="font-medium poppins text-2xl mb-3" >সমার্থক শব্দ গুলো</h3>
       <div class="flex gap-5 flex-wrap">
    ${card.synonyms && card.synonyms.length > 0 ? 
        card.synonyms.map(synonym => `
            <div class="bg-[#EDF7FF] text-slate-600 p-2 border-slate-200 border rounded">
                ${synonym}
            </div>
        `).join('') : 
        `<p class="text-xl text-slate-600"></p>`
    }
</div>
    </div>
  `
  
}
