// navigation menu
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {
            // make sure event.target.hash has a value before overridding default behavior
            if (event.target.hash !== "") {
                // perevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing section
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // active new section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                // sync active link in nav menu
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if (navMenu.classList.contains("open")) {
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide nav menu
                    hideNavMenu();
                } else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }

                // add hash to url
                window.location.hash = hash;
            }
        }
    })
})();


// about section tab

(() => {

    const aboutSection = document.querySelector(".about-section");
    tabsContainer = document.querySelector(".about-tab");

    tabsContainer.addEventListener("click", (event) => {

        // if event.target contains 'tab-items'class and not contains 'active' class

        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            // deactivate existing active 'tab-items'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            //activate now 'tab-items'
            event.target.classList.add("active", "outer-shadow");

            //deactivate existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            //activate now 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();


function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}

// portfolio
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item");
    popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // portfolio items
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            event.target.classList.add("active", "outer-shadow");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // portfolio item index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // convert screenshot into array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails(portfolioItems[itemIndex]);
        }
    })

    // added for personal projects
    document.querySelector(".personal-projects").addEventListener("click", (event) => {
        if (event.target.closest(".timeline-item-inner") && event.target.closest(".portfolio-item-img")) {
            const timelineItemInner = event.target.closest(".timeline-item-inner");
            screenshots = timelineItemInner.querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            
            // popupDetails for personal projects
            projectDetailsBtn.style.display = "none"; // placeholder for now or handle details if present
            const title = timelineItemInner.querySelector("h3").innerHTML;
            popup.querySelector(".pp-title h2").innerHTML = title;
            popup.querySelector(".pp-project-category").innerHTML = "personal project";
            
            // if there are details (optional)
            if (timelineItemInner.querySelector(".portfolio-items-details")) {
                projectDetailsBtn.style.display = "block";
                const details = timelineItemInner.querySelector(".portfolio-items-details").innerHTML;
                popup.querySelector(".pp-project-details").innerHTML = details;
            }
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }

    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //activate preloader
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate loader
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
    })

    // prev slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(item) {
        let currentItem = item || portfolioItems[itemIndex];
        // if no project details
        if (!currentItem.querySelector(".portfolio-items-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        // project details
        const details = currentItem.querySelector(".portfolio-items-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = currentItem.querySelector(".portfolio-item-title") ? 
                      currentItem.querySelector(".portfolio-item-title").innerHTML :
                      currentItem.querySelector("h3").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = currentItem.getAttribute("data-category") || "personal-project";
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();

// hide all unactive section

(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })

})();

window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 0);
})

// Form Inputs in Google Sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbxLWctQI7t6iLKZsDZSlDFyu2FdBWHX0xN6kdfwo9N0NkEHJLUr0aDcEgD5ezGWpt9H/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => {
                msg.innerHTML = "Thankyou for Submitting!"
                setTimeout(() => {
                    msg.innerHTML = ""
                }, 5000)
                form.reset();
            })
            .catch(error => console.error('Error!', error.message))
    })
}

// Theme Light/Dark Mode Toggle
window.addEventListener("load", () => {
    const themeBtn = document.querySelector(".theme-btn");
    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    // Check local storage for theme preference
    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            document.body.classList.remove("dark");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            localStorage.setItem("theme", "light");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
});

// Sticky Header on Scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// Timeline Progress Scroll Effect (Horizontal)
window.addEventListener("scroll", () => {
    const scrollTrack = document.querySelector(".horizontal-scroll-track");
    const scrollSticky = document.querySelector(".horizontal-scroll-sticky");
    const blueprintTimeline = document.querySelector("#blueprint-timeline");
    if (!scrollTrack || !scrollSticky || !blueprintTimeline) return;

    const progressLine = document.querySelector(".timeline-progress-line");
    const markers = document.querySelectorAll(".timeline-marker");
    const timelineItems = document.querySelectorAll(".timeline-item");

    const trackBounds = scrollTrack.getBoundingClientRect();
    const stickyHeight = scrollSticky.offsetHeight;
    const scrollContentWidth = blueprintTimeline.scrollWidth;
    const viewportWidth = 1140; // Restrict calculation to container width

    // Calculate progress (0 to 1) based on vertical scroll within the track
    let progress = -trackBounds.top / (trackBounds.height - stickyHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Horizontal translation of the timeline row
    const maxTranslate = scrollContentWidth - viewportWidth;
    if (maxTranslate > 0) {
        blueprintTimeline.style.transform = `translateX(${-progress * maxTranslate}px)`;
    }

    // Update horizontal progress line width
    if (progressLine) {
        progressLine.style.width = (progress * 100) + "%";
    }

    // Highlight markers and items based on horizontal scroll position
    const horizontalScrollPos = progress * maxTranslate;
    timelineItems.forEach((item, index) => {
        const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
        const marker = markers[index];
        
        // Trigger marker when its center point reaches the center of the viewport
        if (horizontalScrollPos + (viewportWidth / 2) >= itemCenter) {
            if (marker) marker.classList.add("active");
            item.classList.add("in-view");
        } else {
            if (marker) marker.classList.remove("active");
            item.classList.remove("in-view");
        }
    });

    // Handle phase card scale/emphasis based on focus
    const cards = document.querySelectorAll(".timeline-phase-card");
    cards.forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const center = viewportWidth / 2;
        if (bounds.left < center + 100 && bounds.right > center - 100) {
            card.style.transform = "scale(1.15)";
            card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        } else {
            card.style.transform = "scale(1)";
        }
    });
});