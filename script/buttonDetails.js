function handleLessonClick(level) {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            removeActiveClass();
            const selectedButton = document.getElementById(`${level}`);
            selectedButton.classList.toggle("active");

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
                    <p class="text-[13px] text-[#79716B] mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h1 class="text-[36px] font-medium poppins">নেক্সট Lesson এ যান</h1>
                </div>
            </section>
        `;
        return;
    }

    for (let vocabulary of data.data) {
        const card = document.createElement("div");

        card.innerHTML = `
        <div class="bg-white rounded-xl p-7">
                <div class="text-center">
                    <h1 class="font-bold poppins text-3xl my-2">${vocabulary.word}</h1>
                    <p class="font-medium text-xl poppins mb-2">Meaning /Pronunciation</p>
                    <h2 class="font-semibold text-3xl text-slate-500 mb-7">"${vocabulary.meaning} / ${vocabulary.pronunciation} "</h2>
                </div>
                <div class="flex justify-between mb-3 mx-3">
                    <div onclick=loadWordDetails(${vocabulary.id}) class="bg-[#1A91FF10] p-2 rounded-sm">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div class="bg-[#1A91FF10] p-2 rounded-sm">
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
            </div>
        `;

        cardContainer.append(card);
    }
}

