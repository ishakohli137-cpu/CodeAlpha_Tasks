const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;

        if(position < window.innerHeight - 100){
            section.classList.add("show");
        }
    });
});

sections.forEach(section => {
    section.classList.add("fade");
});