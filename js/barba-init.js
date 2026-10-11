document.addEventListener("DOMContentLoaded", () => {
    // Initialize Barba.js
    barba.init({
        transitions: [{
            name: 'fade-transition',
            leave(data) {
                // Fade out the current page
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.inOut"
                });
            },
            enter(data) {
                // Fade in the next page
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.inOut"
                });
            }
        }]
    });
});
