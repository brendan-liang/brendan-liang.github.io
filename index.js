const anims = ["slide", "slide-2"]
anims.forEach((anim) => {
    const obs = new IntersectionObserver((e) => {
        e.forEach((i) => {
            if (i.isIntersecting) {
                i.target.classList.add(`shown-${anim}`);
            } else {
                i.target.classList.remove(`shown-${anim}`);
            }
        })
    })
    
    document.querySelectorAll(`.hidden-${anim}`).forEach(el => obs.observe(el));
})