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

    // added for personal projects showcase
    const ppPopup = document.querySelector(".personal-project-popup");
    const ppCloseBtn = document.querySelector(".ppp-close");

    if (ppCloseBtn) {
        ppCloseBtn.addEventListener("click", () => {
            ppPopup.classList.remove("open");
            if (document.body.classList.contains("hidden-scrolling")) {
                bodyScrollingToggle();
            }
            if (window.lenis) window.lenis.start();
        });
    }

    document.querySelector(".personal-projects").addEventListener("click", (event) => {
        if (event.target.closest(".timeline-item-inner") && (event.target.closest(".portfolio-item-img") || event.target.classList.contains("view-project"))) {
            const item = event.target.closest(".timeline-item-inner");
            
            // Get data attributes
            const title = item.querySelector("h3").innerText;
            const role = item.getAttribute("data-role") || "Concept";
            const type = item.getAttribute("data-type") || "Project";
            const intro = item.getAttribute("data-intro") || "Detail introduction about the project goes here.";
            const design = item.getAttribute("data-design") || "Details about the design process go here.";
            const performance = item.getAttribute("data-performance") || "Details about the final performance go here.";
            const link = item.getAttribute("data-link") || "#";
            
            // Get screenshots
            const imgEl = item.querySelector(".portfolio-item-img img");
            let screenshots = [];
            if (imgEl && imgEl.hasAttribute("data-screenshots")) {
                screenshots = imgEl.getAttribute("data-screenshots").split(",");
            } else if (imgEl && imgEl.src) {
                screenshots = [imgEl.src];
            }

            // Populate popup
            if (ppPopup) {
                ppPopup.querySelector(".ppp-title").innerText = title;
                ppPopup.querySelector(".ppp-role").innerText = role;
                ppPopup.querySelector(".ppp-type").innerText = type;
                
                ppPopup.querySelector(".ppp-intro-text").innerText = intro;
                ppPopup.querySelector(".ppp-design-text").innerText = design;
                ppPopup.querySelector(".ppp-performance-text").innerText = performance;
                
                if (link && link !== "#") {
                    ppPopup.querySelector(".ppp-live-link").href = link;
                    ppPopup.querySelector(".ppp-live-link").classList.remove("hide");
                } else {
                    ppPopup.querySelector(".ppp-live-link").classList.add("hide");
                }

                // Populate featured image (Side-by-Side)
                const featuredImage = ppPopup.querySelector(".ppp-featured-image");
                if (screenshots && screenshots.length > 0) {
                    featuredImage.querySelector(".ppp-featured-img-after").src = screenshots[0];
                    featuredImage.querySelector(".ppp-featured-img-before").src = screenshots.length > 1 ? screenshots[1] : screenshots[0];
                    featuredImage.classList.remove("hide");
                } else {
                    featuredImage.classList.add("hide");
                }

                // Populate images grid
                const gridItems = ppPopup.querySelectorAll(".ppp-grid-item");
                const imageGrid = ppPopup.querySelector(".ppp-image-grid");
                
                if (screenshots && screenshots.length > 0) {
                    imageGrid.classList.remove("hide");
                    gridItems.forEach((item, index) => {
                        // Cycle through screenshots if there are fewer screenshots than grid items
                        const screenshotIndex = index % screenshots.length;
                        item.querySelector("img").src = screenshots[screenshotIndex];
                        item.classList.remove("hide");
                    });
                } else {
                    imageGrid.classList.add("hide");
                }

                // Reset image scales
                ppPopup.querySelectorAll(".ppp-img").forEach(img => {
                    img.style.transform = "scale(1.25)";
                });

                // Open Popup
                ppPopup.classList.add("open");
                if (window.lenis) window.lenis.stop();
                bodyScrollingToggle();
            }
        }
    });

    // Smooth scroll zoom effect inside the popup
    if (ppPopup) {
        ppPopup.addEventListener("scroll", () => {
            requestAnimationFrame(() => {
                const images = ppPopup.querySelectorAll(".ppp-img");
                const viewHeight = window.innerHeight;
                
                images.forEach(img => {
                    const rect = img.getBoundingClientRect();
                    
                    // If image is visible in the viewport
                    if (rect.top <= viewHeight && rect.bottom >= 0) {
                        // Calculate scroll progress through the image
                        let progress = 1 - (rect.bottom / (viewHeight + rect.height));
                        progress = Math.max(0, Math.min(1, progress));
                        
                        // Zoom out from 1.25 to 1.00 as user scrolls past it
                        const scale = 1.25 - (0.25 * progress);
                        img.style.transform = `scale(${scale})`;
                    }
                });
            });
        });
    }

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }

    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
        if (popup.classList.contains("open")) {
            if (window.lenis) window.lenis.stop();
            popup.scrollTop = 0;
        } else {
            if (window.lenis) window.lenis.start();
        }
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
    const viewportWidth = window.innerWidth < 1140 ? window.innerWidth : 1140; // Dynamically calculate for mobile

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

// Side-by-Side Image Slider (Smooth Lerp Hover Effect)
(() => {
    const sliders = document.querySelectorAll(".sbs-slider-container");
    
    sliders.forEach(slider => {
        const beforeImageWrapper = slider.querySelector(".sbs-image-before");
        const handle = slider.querySelector(".sbs-handle");
        
        // Target values set by mouse
        let targetPercentage = 50;
        // Current rendered values
        let currentPercentage = 50;
        
        function setTarget(e) {
            let x;
            if (e.type.includes("touch")) {
                x = e.touches[0].clientX - slider.getBoundingClientRect().left;
            } else {
                x = e.clientX - slider.getBoundingClientRect().left;
            }
            
            const width = slider.offsetWidth;
            if (x < 0) x = 0;
            if (x > width) x = width;
            
            targetPercentage = (x / width) * 100;
        }
        
        slider.addEventListener("mousemove", setTarget);
        slider.addEventListener("touchmove", setTarget, { passive: true });

        // Smoothly interpolate towards the target every frame
        function animate() {
            // Lerp factor (higher is sharper, lower is floatier)
            currentPercentage += (targetPercentage - currentPercentage) * 0.15;
            
            // Round slightly to stop infinite floating math
            if (Math.abs(targetPercentage - currentPercentage) < 0.01) {
                currentPercentage = targetPercentage;
            }

            // Use clip-path to crop instead of resizing wrapper width
            const rightInset = 100 - currentPercentage;
            beforeImageWrapper.style.clipPath = `inset(0% ${rightInset}% 0% 0%)`;
            beforeImageWrapper.style.webkitClipPath = `inset(0% ${rightInset}% 0% 0%)`;
            handle.style.left = currentPercentage + "%";
            
            requestAnimationFrame(animate);
        }
        
        // Start animation loop
        animate();

        // Reset on scroll logic: reset targets to 50%
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    targetPercentage = 50;
                }
            });
        }, { threshold: 0 }); // trigger as soon as it totally leaves the screen
        
        observer.observe(slider);
    });
})();
/* =========================================================
   Neumorphic Clock Logic
========================================================= */
(function() {
    function initClocks() {
        const wrappers = document.querySelectorAll('.neumorphic-clock-wrapper');
        if (wrappers.length === 0) return;

        wrappers.forEach(wrapper => {
            const ticksContainer = wrapper.querySelector('.clock-update-ticks');
            const numbersContainer = wrapper.querySelector('.clock-numbers');
            
            // Generate Ticks
            if (ticksContainer) {
                ticksContainer.innerHTML = '';
                for (let i = 0; i < 60; i++) {
                    const tick = document.createElement('div');
                    tick.classList.add('clock-tick');
                    if (i % 5 === 0) {
                        tick.classList.add('tick-5');
                    }
                    tick.style.transform = `rotate(${i * 6}deg)`;
                    ticksContainer.appendChild(tick);
                }
            }

            // Generate Numbers
            if (numbersContainer) {
                numbersContainer.innerHTML = '';
                for (let i = 1; i <= 12; i++) {
                    const num = document.createElement('div');
                    num.className = 'num';
                    num.style.transform = `rotate(${i * 30}deg)`;
                    
                    const innerNum = document.createElement('span');
                    innerNum.className = 'num-inner';
                    innerNum.textContent = i;
                    innerNum.style.transform = `rotate(${-i * 30}deg)`;
                    
                    num.appendChild(innerNum);
                    numbersContainer.appendChild(num);
                }
            }
        });

        function updateClocks() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            // Analog Hand Rotations
            const hourDeg = (hours % 12) * 30 + (minutes * 0.5);
            const minuteDeg = (minutes * 6) + (seconds * 0.1);
            const secondDeg = seconds * 6;

            wrappers.forEach(wrapper => {
                const hourHand = wrapper.querySelector('.clock-update-hour');
                const minuteHand = wrapper.querySelector('.clock-update-minute');
                const secondHand = wrapper.querySelector('.clock-update-second');

                if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
                if (minuteHand) minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
                if (secondHand) secondHand.style.transform = `rotate(${secondDeg}deg)`;
            });
        }

        updateClocks();
        setInterval(updateClocks, 1000);
    }

    document.addEventListener("DOMContentLoaded", () => {
        initClocks();
    });
})();

/* =========================================================
   Scroll Reveal Text Animation
========================================================= */
(() => {
    const wrapper = document.querySelector('.scroll-reveal-wrapper');
    const revealText = document.querySelector('#scroll-reveal-text');
    if (!wrapper || !revealText) return;

    // Split text into words
    const text = revealText.innerText;
    const words = text.split(' ');
    revealText.innerHTML = '';
    words.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        span.classList.add('reveal-word');
        revealText.appendChild(span);
    });

    const wordSpans = revealText.querySelectorAll('.reveal-word');

    window.addEventListener('scroll', () => {
        const rect = wrapper.getBoundingClientRect();
        const wrapperTop = rect.top;
        const wrapperHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Progress goes from 0 to 1 as the sticky container scrolls
        let progress = 0;
        if (wrapperTop <= 0) {
            const scrollDistance = -wrapperTop;
            const totalScrollable = wrapperHeight - windowHeight;
            progress = scrollDistance / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));
        }

        const wordsToReveal = Math.floor(progress * wordSpans.length);
        
        wordSpans.forEach((span, index) => {
            if (index < wordsToReveal) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    });
})();

/* =========================================================
   Initialize Lenis for Smooth Scrolling
========================================================= */
window.lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
});

function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

