document.getElementById('faq-btn').addEventListener('click',function(){
    document.getElementById('faq').scrollIntoView({behavior: 'smooth'});
})
document.getElementById('learn-btn').addEventListener('click',function(){
    document.getElementById('vocabulary').scrollIntoView({behavior: 'smooth'});
})


function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    for (let button of activeButtons) {
        button.classList.remove("active");
    }
}

function fetchLessonButtons() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((data) => displayLessonButtons(data.data));
}

function displayLessonButtons(lessons) {
    const buttonContainer = document.getElementById("button-container");
    
    for (let lesson of lessons) {
        console.log(lesson);

        const buttonWrapper = document.createElement("div");

        buttonWrapper.innerHTML = `
         <button id="${lesson.level_no}" onclick="handleLessonClick('${lesson.level_no}')"  
                    class="btn btn-outline btn-primary">
                <img src="./assets/fa-book-open.png"> Level-${lesson.level_no}
            </button>
        `;

        buttonContainer.append(buttonWrapper);
    }
}

fetchLessonButtons();
