// #region Typewriter Effect
const typeWrite = async (el, content, delay) => {
    while (true) {
        for (const text of content) {
            for (let i = 0; i < text.length; i++) {
                el.innerHTML = `<span>${text.slice(0, i)}</span><span>|</span>`;
                await new Promise(r => setTimeout(r, delay)); 
            }
            el.innerHTML = `<span>${text}</span><span class="typewrite-cursor typewrite-cursor-blink">|</span>`;
            await new Promise(r => setTimeout(r, delay*text.length*3));
            for (let i = text.length; i > 0; i--) {
                el.innerHTML = `<span>${text.slice(0, i)}</span><span>|</span>`;
                await new Promise(r => setTimeout(r, delay)); 
            }
        }
    }
};

for (const el of document.querySelectorAll(".typewrite")) {
    typeWrite(el, el.dataset.typewriteContent.split(","), 90);
}
// #endregion
// #region Custom Scroll

// #endregion
// #region Scroll anims
document.addEventListener("scroll", (e) => {
    const rect = document.querySelector("#videos-block").getBoundingClientRect();
    console.log(document.documentElement.clientHeight - rect.top);
});
// #endregion
// #region 3D Card Pan
const maxPanX = 20
const maxPanY = 30

for (const card of document.querySelectorAll(".video-card-thumbnail-wrap")) {
    const boundingElement = card.parentElement;
    const shadow = card.children[0];
    const thumbnail = card.children[1];
    const shine = thumbnail.children[0];

    console.log(card.children);
    
    boundingElement.addEventListener("mousemove", (e) => {
        [thumbnail, shine, shadow].forEach((el) => {
            el.style.transition = "";
        });
        const rect = boundingElement.getBoundingClientRect();
        const xPan = Math.floor((e.clientX - rect.left - rect.width/2)/(rect.width/2)*100)/100 * maxPanX;
        const yPan = Math.floor((e.clientY - rect.top - rect.height/2)/(rect.height/2)*100)/100 * maxPanY;
        thumbnail.style.transform = `rotateY(${xPan}deg) rotateX(${-yPan}deg)`;
        shine.style.translate = `${xPan*1.1}px ${yPan*1.1}px`;
        shadow.style.translate = `${-xPan*1.5}px ${-yPan}px`;
    });

    boundingElement.addEventListener("mouseleave", (e) => {
        thumbnail.style.transition = "transform 1s ease";
        shine.style.transition = "translate 1s ease";
        shadow.style.transition = "translate 1s ease";

        thumbnail.style.transform = "";
        shine.style.translate = "";
        shadow.style.translate = "";
    });
}
// #endregion