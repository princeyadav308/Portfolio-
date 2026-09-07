// navigation menu
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  if (!hamburgerBtn) return;
  const navMenu = document.querySelector(".nav-menu"),
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
    }, 300);
  }
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
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
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

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
          });
          fadeOutEffect();
        }

        // add hash to url
        window.location.hash = hash;
      }
    }
  });
})();

// about section tab

(() => {
  const aboutSection = document.querySelector(".about-section");
  tabsContainer = document.querySelector(".about-tab");

  if (!tabsContainer) return;

  tabsContainer.addEventListener("click", (event) => {
    // if event.target contains 'tab-items'class and not contains 'active' class

    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // deactivate existing active 'tab-items'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");

      //activate now 'tab-items'
      event.target.classList.add("active", "outer-shadow");

      //deactivate existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");

      //activate now 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

// portfolio
(() => {
  const filterContainer = document.querySelector(".portfolio-filter");
  if (!filterContainer) return;
  const portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item");
  ((popup = document.querySelector(".portfolio-popup")),
    (prevBtn = popup.querySelector(".pp-prev")),
    (nextBtn = popup.querySelector(".pp-next")),
    (closeBtn = popup.querySelector(".pp-close")),
    (projectDetailsContainer = popup.querySelector(".pp-details")),
    (projectDetailsBtn = popup.querySelector(".pp-project-details-btn")));
  let itemIndex, slideIndex, screenshots;

  // portfolio items
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");

      event.target.classList.add("active", "outer-shadow");

      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner",
      ).parentElement;
      // portfolio item index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem,
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
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
  });

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

  const personalProjects = document.querySelector(".personal-projects");
  if (personalProjects) {
    personalProjects.addEventListener("click", (event) => {
      if (
        event.target.closest(".timeline-item-inner") &&
        (event.target.closest(".portfolio-item-img") ||
          event.target.classList.contains("view-project"))
      ) {
        const item = event.target.closest(".timeline-item-inner");

        // Get data attributes
        const title = item.querySelector("h3").innerText;
        const role = item.getAttribute("data-role") || "Concept";
        const type = item.getAttribute("data-type") || "Project";
        const intro =
          item.getAttribute("data-intro") ||
          "Detail introduction about the project goes here.";
        const design =
          item.getAttribute("data-design") ||
          "Details about the design process go here.";
        const goals =
          item.getAttribute("data-goals") ||
          "Details about the goals go here.";
        const challenges =
          item.getAttribute("data-challenges") ||
          "Details about the challenges go here.";
        const performance =
          item.getAttribute("data-performance") ||
          "Details about the final performance go here.";
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
          ppPopup.querySelector(".ppp-goals-text").innerHTML = goals;
          ppPopup.querySelector(".ppp-challenges-text").innerHTML = challenges;
          ppPopup.querySelector(".ppp-performance-text").innerText =
            performance;

          if (link && link !== "#") {
            ppPopup.querySelector(".ppp-live-link").href = link;
            ppPopup.querySelector(".ppp-live-link").classList.remove("hide");
          } else {
            ppPopup.querySelector(".ppp-live-link").classList.add("hide");
          }

          // Show slider only for Elite Gym
          const sliderContainer = ppPopup.querySelector(".ppp-slider-container");
          if (sliderContainer) {
            if (title.toLowerCase().includes("elite gym")) {
              sliderContainer.style.display = "block";
            } else {
              sliderContainer.style.display = "none";
            }
          }

          // Populate featured image (Side-by-Side)
          const featuredImage = ppPopup.querySelector(".ppp-featured-image");
          if (screenshots && screenshots.length > 0) {
            featuredImage.querySelector(".ppp-featured-img-after").src =
              screenshots[0];
            featuredImage.querySelector(".ppp-featured-img-before").src =
              screenshots.length > 1 ? screenshots[1] : screenshots[0];
            featuredImage.classList.remove("hide");
          } else {
            featuredImage.classList.add("hide");
          }

          // Dynamic image mapping for inline images and grid
          const gridItems = ppPopup.querySelectorAll(".ppp-grid-item");
          const imageGrid = ppPopup.querySelector(".ppp-image-grid");
          const inlineImg1 = ppPopup.querySelector(".ppp-inline-img-1");
          const inlineImg2 = ppPopup.querySelector(".ppp-inline-img-2");

          if (screenshots && screenshots.length > 2) {
            imageGrid.classList.remove("hide");
            const y = screenshots.slice(2);
            
            if (y.length >= 8) {
              // We have enough images for 2 inline + 6 grid
              if (inlineImg1) {
                inlineImg1.querySelector("img").src = y[0];
                inlineImg1.style.display = "block";
              }
              if (inlineImg2) {
                inlineImg2.querySelector("img").src = y[1];
                inlineImg2.style.display = "block";
              }
              
              gridItems.forEach((item, index) => {
                const imgIndex = 2 + (index % (y.length - 2));
                item.querySelector("img").src = y[imgIndex];
                item.classList.remove("hide");
              });
            } else {
              // Not enough images, hide inline images, use all for grid
              if (inlineImg1) inlineImg1.style.display = "none";
              if (inlineImg2) inlineImg2.style.display = "none";
              
              gridItems.forEach((item, index) => {
                const imgIndex = index % y.length;
                item.querySelector("img").src = y[imgIndex];
                item.classList.remove("hide");
              });
            }
          } else {
            imageGrid.classList.add("hide");
            if (inlineImg1) inlineImg1.style.display = "none";
            if (inlineImg2) inlineImg2.style.display = "none";
          }

          // Reset image scales
          ppPopup.querySelectorAll(".ppp-img").forEach((img) => {
            img.style.transform = "scale(1.25)";
          });

          // Open Popup
          ppPopup.classList.add("open");
          if (window.lenis) window.lenis.stop();
          bodyScrollingToggle();
        }
      }
    });
  }

  // Smooth scroll zoom effect inside the popup
  if (ppPopup) {
    ppPopup.addEventListener("scroll", () => {
      requestAnimationFrame(() => {
        const images = ppPopup.querySelectorAll(".ppp-img");
        const viewHeight = window.innerHeight;

        images.forEach((img) => {
          const rect = img.getBoundingClientRect();

          // If image is visible in the viewport
          if (rect.top <= viewHeight && rect.bottom >= 0) {
            // Calculate scroll progress through the image
            let progress = 1 - rect.bottom / (viewHeight + rect.height);
            progress = Math.max(0, Math.min(1, progress));

            // Zoom out from 1.25 to 1.00 as user scrolls past it
            const scale = 1.25 - 0.25 * progress;
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
  });

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
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  // prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails(item) {
    let currentItem = item || portfolioItems[itemIndex];
    // if no project details
    if (!currentItem.querySelector(".portfolio-items-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";
    // project details
    const details = currentItem.querySelector(
      ".portfolio-items-details",
    ).innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = currentItem.querySelector(".portfolio-item-title")
      ? currentItem.querySelector(".portfolio-item-title").innerHTML
      : currentItem.querySelector("h3").innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category =
      currentItem.getAttribute("data-category") || "personal-project";
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

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
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
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
  });
})();

document.body.classList.add("loading");

window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  document.body.classList.remove("loading");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 1500);
});

// // Form Inputs with Netlify
const form = document.forms["contact"];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate inputs to prevent code injection
    const formData = new FormData(form);
    const badRegex = /[>;&|\\`]/;
    for (let [key, value] of formData.entries()) {
      if (badRegex.test(value)) {
        msg.style.color = "#ff4a4a";
        msg.innerHTML =
          "Error: Invalid characters (> ; & | \\ `) are not allowed.";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 5000);
        return; // Stop submission
      }
    }

    // Reset color on success
    msg.style.color = "";

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Set loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.opacity = '0.7';

    // Required for Netlify AJAX submissions
    formData.append("form-name", "contact");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then((response) => {
        // Button Success State
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
        submitBtn.style.color = '#10b981';
        submitBtn.style.opacity = '1';
        
        // Beautiful Neumorphic Alert message
        msg.innerHTML = "Your details have been successfully submitted. I will get back to you shortly!";
        msg.className = "outer-shadow"; 
        msg.style.display = "block";
        msg.style.padding = "20px";
        msg.style.marginTop = "30px";
        msg.style.borderRadius = "10px";
        msg.style.color = "#10b981";
        msg.style.fontWeight = "600";
        msg.style.textAlign = "center";
        
        setTimeout(() => {
          msg.style.display = "none";
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.color = '';
          submitBtn.style.pointerEvents = 'auto';
        }, 6000);
        
        form.reset();
        
        // Reset our custom Neumorphic selection buttons
        document.querySelectorAll('.custom-selection-btn').forEach(btn => {
            btn.classList.remove('selected', 'inner-shadow');
            btn.classList.add('outer-shadow', 'hover-in-shadow');
        });
      })
      .catch((error) => {
        console.error("Error!", error.message);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.style.color = '#ff4a4a';
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.color = '';
          submitBtn.style.pointerEvents = 'auto';
          submitBtn.style.opacity = '1';
        }, 4000);
      });
  });
}

// Theme Light/Dark Mode Toggle
window.addEventListener("load", () => {
  const themeBtn = document.querySelector(".theme-btn");
  if (!themeBtn) return;

  const icon = themeBtn.querySelector("i");

  function toggleTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  // Check local storage for theme preference
  /*
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") === "dark") {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }
  */
  toggleTheme("light");

  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      toggleTheme(nextTheme);
      return;
    }

    document.documentElement.classList.add(`switching-to-${nextTheme}`);
    document.documentElement.classList.add("theme-transitioning");

    const transition = document.startViewTransition(() => {
      toggleTheme(nextTheme);
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove(`switching-to-${nextTheme}`);
      document.documentElement.classList.remove("theme-transitioning");
    });
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
  const scrollTracks = document.querySelectorAll(".horizontal-scroll-track");
  
  scrollTracks.forEach((scrollTrack) => {
    const scrollSticky = scrollTrack.querySelector(".horizontal-scroll-sticky");
    const timelineRow = scrollTrack.querySelector(".timeline-row");
    if (!scrollSticky || !timelineRow) return;

    const progressLine = scrollTrack.querySelector(".timeline-progress-line");
    const markers = scrollTrack.querySelectorAll(".timeline-marker");
    const timelineItems = scrollTrack.querySelectorAll(".timeline-item");

    const trackBounds = scrollTrack.getBoundingClientRect();
    const stickyHeight = scrollSticky.offsetHeight;
    const scrollContentWidth = timelineRow.scrollWidth;
    const viewportWidth = window.innerWidth < 1140 ? window.innerWidth : 1140; // Dynamically calculate for mobile

    // Calculate progress (0 to 1) based on vertical scroll within the track
    let progress = -trackBounds.top / (trackBounds.height - stickyHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Horizontal translation of the timeline row
    const maxTranslate = scrollContentWidth - viewportWidth;
    if (maxTranslate > 0) {
      timelineRow.style.transform = `translateX(${-progress * maxTranslate}px)`;
    }

    // Update horizontal progress line width
    if (progressLine) {
      progressLine.style.width = progress * 100 + "%";
    }

    // Highlight markers and items based on horizontal scroll position
    const horizontalScrollPos = progress * maxTranslate;
    timelineItems.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const marker = markers[index];

      // Trigger marker when its center point reaches the center of the viewport
      if (horizontalScrollPos + viewportWidth / 2 >= itemCenter) {
        if (marker) marker.classList.add("active");
        item.classList.add("in-view");
      } else {
        if (marker) marker.classList.remove("active");
        item.classList.remove("in-view");
      }
    });

    // Handle phase card scale/emphasis based on focus
    const cards = scrollTrack.querySelectorAll(".timeline-phase-card");
    cards.forEach((card) => {
      const bounds = card.getBoundingClientRect();
      const center = viewportWidth / 2;
      if (bounds.left < center + 100 && bounds.right > center - 100) {
        card.style.transform = "scale(1.15)";
        card.style.transition =
          "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      } else {
        card.style.transform = "scale(1)";
      }
    });
  });
});

// Side-by-Side Image Slider (Smooth Lerp Hover Effect)
(() => {
  const sliders = document.querySelectorAll(".sbs-slider-container");

  sliders.forEach((slider) => {
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            targetPercentage = 50;
          }
        });
      },
      { threshold: 0 },
    ); // trigger as soon as it totally leaves the screen

    observer.observe(slider);
  });
})();
/* =========================================================
   Neumorphic Clock Logic
========================================================= */
(function () {
  function initClocks() {
    const wrappers = document.querySelectorAll(".neumorphic-clock-wrapper");
    if (wrappers.length === 0) return;

    wrappers.forEach((wrapper) => {
      const ticksContainer = wrapper.querySelector(".clock-update-ticks");
      const numbersContainer = wrapper.querySelector(".clock-numbers");

      // Generate Ticks
      if (ticksContainer) {
        ticksContainer.innerHTML = "";
        for (let i = 0; i < 60; i++) {
          const tick = document.createElement("div");
          tick.classList.add("clock-tick");
          if (i % 5 === 0) {
            tick.classList.add("tick-5");
          }
          tick.style.transform = `rotate(${i * 6}deg)`;
          ticksContainer.appendChild(tick);
        }
      }

      // Generate Numbers
      if (numbersContainer) {
        numbersContainer.innerHTML = "";
        for (let i = 1; i <= 12; i++) {
          const num = document.createElement("div");
          num.className = "num";
          num.style.transform = `rotate(${i * 30}deg)`;

          const innerNum = document.createElement("span");
          innerNum.className = "num-inner";
          innerNum.textContent = i;
          innerNum.style.transform = `rotate(${-i * 30}deg)`;

          num.appendChild(innerNum);
          numbersContainer.appendChild(num);
        }
      }
    });

    let activeTimezone = "Asia/Kolkata";
    
    // Store accumulated degrees to prevent snapping
    let accHourDeg = null;
    let accMinDeg = null;
    let accSecDeg = null;
    
    function getClosestDegree(current, target) {
      let diff = (target - current) % 360;
      if (diff > 180) diff -= 360;
      if (diff <= -180) diff += 360;
      return current + diff;
    }

    function updateClocks() {
      // Get time in target timezone
      const nowString = new Date().toLocaleString("en-US", { timeZone: activeTimezone });
      const now = new Date(nowString);
      
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();

      // Calculate absolute target degrees
      const targetHourDeg = (hours % 12) * 30 + minutes * 0.5;
      const targetMinDeg = minutes * 6 + seconds * 0.1;
      const targetSecDeg = seconds * 6;

      // Initialize on first run
      if (accHourDeg === null) {
        accHourDeg = targetHourDeg;
        accMinDeg = targetMinDeg;
        accSecDeg = targetSecDeg;
      } else {
        // Find shortest path to target degrees to animate correctly
        accHourDeg = getClosestDegree(accHourDeg, targetHourDeg);
        accMinDeg = getClosestDegree(accMinDeg, targetMinDeg);
        accSecDeg = getClosestDegree(accSecDeg, targetSecDeg);
      }

      wrappers.forEach((wrapper) => {
        const hourHand = wrapper.querySelector(".clock-update-hour");
        const minuteHand = wrapper.querySelector(".clock-update-minute");
        const secondHand = wrapper.querySelector(".clock-update-second");

        // Add small transition for normal ticking, overridden by CSS class during timezone change
        if (hourHand) {
            hourHand.style.transform = `rotate(${accHourDeg}deg)`;
            if(!hourHand.style.transition) hourHand.style.transition = "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)";
        }
        if (minuteHand) {
            minuteHand.style.transform = `rotate(${accMinDeg}deg)`;
            if(!minuteHand.style.transition) minuteHand.style.transition = "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)";
        }
        if (secondHand) {
            secondHand.style.transform = `rotate(${accSecDeg}deg)`;
            if(!secondHand.style.transition) secondHand.style.transition = "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)";
        }
      });
    }

    updateClocks();
    setInterval(updateClocks, 1000);

    /* --- Country Selector Logic --- */
    const defaultCountries = [
      { name: 'Afghanistan', code: 'AF', tz: 'Asia/Kabul' },
      { name: 'Åland Islands', code: 'AX', tz: 'Europe/Mariehamn' },
      { name: 'Albania', code: 'AL', tz: 'Europe/Tirane' },
      { name: 'Algeria', code: 'DZ', tz: 'Africa/Algiers' },
      { name: 'American Samoa', code: 'AS', tz: 'Pacific/Pago_Pago' },
      { name: 'Andorra', code: 'AD', tz: 'Europe/Andorra' },
      { name: 'Angola', code: 'AO', tz: 'Africa/Luanda' },
      { name: 'Australia', code: 'AU', tz: 'Australia/Sydney' },
      { name: 'Austria', code: 'AT', tz: 'Europe/Vienna' },
      { name: 'Belarus', code: 'BY', tz: 'Europe/Minsk' },
      { name: 'China', code: 'CN', tz: 'Asia/Shanghai' },
      { name: 'Cyprus', code: 'CY', tz: 'Asia/Nicosia' },
      { name: 'Egypt', code: 'EG', tz: 'Africa/Cairo' },
      { name: 'France', code: 'FR', tz: 'Europe/Paris' },
      { name: 'Germany', code: 'DE', tz: 'Europe/Berlin' },
      { name: 'India', code: 'IN', tz: 'Asia/Kolkata' },
      { name: 'Indonesia', code: 'ID', tz: 'Asia/Jakarta' },
      { name: 'Iran', code: 'IR', tz: 'Asia/Tehran' },
      { name: 'Israel', code: 'IL', tz: 'Asia/Jerusalem' },
      { name: 'Italy', code: 'IT', tz: 'Europe/Rome' },
      { name: 'Japan', code: 'JP', tz: 'Asia/Tokyo' },
      { name: 'Malaysia', code: 'MY', tz: 'Asia/Kuala_Lumpur' },
      { name: 'Mauritius', code: 'MU', tz: 'Indian/Mauritius' },
      { name: 'Netherlands', code: 'NL', tz: 'Europe/Amsterdam' },
      { name: 'Norway', code: 'NO', tz: 'Europe/Oslo' },
      { name: 'Philippines', code: 'PH', tz: 'Asia/Manila' },
      { name: 'Qatar', code: 'QA', tz: 'Asia/Qatar' },
      { name: 'Russia', code: 'RU', tz: 'Europe/Moscow' },
      { name: 'Saudi Arabia', code: 'SA', tz: 'Asia/Riyadh' },
      { name: 'Singapore', code: 'SG', tz: 'Asia/Singapore' },
      { name: 'South Korea', code: 'KR', tz: 'Asia/Seoul' },
      { name: 'Spain', code: 'ES', tz: 'Europe/Madrid' },
      { name: 'Sweden', code: 'SE', tz: 'Europe/Stockholm' },
      { name: 'Switzerland', code: 'CH', tz: 'Europe/Zurich' },
      { name: 'Thailand', code: 'TH', tz: 'Asia/Bangkok' },
      { name: 'Turkey', code: 'TR', tz: 'Europe/Istanbul' },
      { name: 'United Arab Emirates', code: 'AE', tz: 'Asia/Dubai' },
      { name: 'United Kingdom', code: 'GB', tz: 'Europe/London' },
      { name: 'United States', code: 'US', tz: 'America/New_York' },
      { name: 'Vietnam', code: 'VN', tz: 'Asia/Ho_Chi_Minh' }
    ];

    const toggleBtn = document.getElementById("country-toggle-btn");
    const modal = document.getElementById("country-select-modal");
    const closeModalBtn = document.getElementById("close-country-modal");
    const backdrop = document.querySelector(".country-modal-backdrop");
    const searchInput = document.getElementById("country-search-input");
    const listContainer = document.getElementById("country-list-container");
    const activeFlag = document.getElementById("active-country-flag");

    let activeCountry = defaultCountries.find(c => c.code === 'IN');

    function renderList(searchQuery = "") {
      listContainer.innerHTML = "";
      const filtered = defaultCountries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (filtered.length === 0) {
        listContainer.innerHTML = `<div style="display:flex; height:150px; align-items:center; justify-content:center; font-size:14px; color:var(--text-black-700);">No countries found</div>`;
        return;
      }

      filtered.forEach(country => {
        const btn = document.createElement("button");
        const isActive = activeCountry.code === country.code;
        
        btn.style.cssText = `
            width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border: none; cursor: pointer; transition: background 0.2s;
            background: ${isActive ? 'var(--bg-black-100)' : 'transparent'};
        `;
        
        btn.onmouseover = () => btn.style.background = 'var(--bg-black-100)';
        btn.onmouseout = () => btn.style.background = isActive ? 'var(--bg-black-100)' : 'transparent';

        btn.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:24px; height:24px; border-radius:50%; overflow:hidden; border: 1px solid var(--bg-black-100);">
              <img src="https://flagcdn.com/w160/${country.code.toLowerCase()}.png" alt="${country.code}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <span style="font-size:14px; font-weight:500; color:${isActive ? 'var(--text-black-900)' : 'var(--text-black-700)'};">${country.name}</span>
          </div>
          ${isActive ? '<i class="fas fa-check" style="color:var(--text-black-900); font-size:14px;"></i>' : ''}
        `;

        btn.addEventListener("click", () => {
          activeCountry = country;
          activeFlag.src = `https://flagcdn.com/w160/${country.code.toLowerCase()}.png`;
          activeTimezone = country.tz;
          
          // Add transition class for smooth long spin
          wrappers.forEach(w => {
              w.querySelectorAll(".clock-hand").forEach(h => {
                  h.style.transition = "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
              });
          });
          
          updateClocks();
          
          // Reset transition back to normal tick after long spin
          setTimeout(() => {
              wrappers.forEach(w => {
                  w.querySelectorAll(".clock-hand").forEach(h => {
                      h.style.transition = "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)";
                  });
              });
          }, 1500);

          closeModal();
        });

        listContainer.appendChild(btn);
      });
    }

    function openModal() {
      modal.classList.remove("hide");
      // Small delay to allow display:block to apply before animating opacity
      setTimeout(() => {
        modal.style.opacity = "1";
        modal.style.pointerEvents = "auto";
        const dialog = modal.querySelector(".country-modal-dialog");
        if(dialog) dialog.style.transform = "scale(1)";
        searchInput.focus();
        searchInput.value = "";
        renderList();
      }, 10);
    }

    function closeModal() {
      modal.style.opacity = "0";
      modal.style.pointerEvents = "none";
      const dialog = modal.querySelector(".country-modal-dialog");
      if(dialog) dialog.style.transform = "scale(0.96)";
      
      setTimeout(() => {
        modal.classList.add("hide");
      }, 300);
    }

    if (toggleBtn) toggleBtn.addEventListener("click", openModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (searchInput) searchInput.addEventListener("input", (e) => renderList(e.target.value));

  }

  document.addEventListener("DOMContentLoaded", () => {
    /* Qualifying Contact Form Custom Inputs */
    const customBtns = document.querySelectorAll('.custom-selection-btn');
    customBtns.forEach(btn => {
      const input = btn.querySelector('input');
      
      // Prevent click on input bubbling twice if clicking label
      input.addEventListener('click', (e) => e.stopPropagation());
      
      // Update initial state
      if (input.checked) {
        btn.classList.add('inner-shadow', 'selected');
        btn.classList.remove('outer-shadow', 'hover-in-shadow');
      }

      input.addEventListener('change', () => {
        // Handle radio buttons group reset
        if (input.type === 'radio') {
          const groupBtns = document.querySelectorAll(`input[name="${input.name}"]`);
          groupBtns.forEach(radio => {
            const parentBtn = radio.closest('.custom-selection-btn');
            if (parentBtn && radio !== input) {
              parentBtn.classList.remove('inner-shadow', 'selected');
              parentBtn.classList.add('outer-shadow', 'hover-in-shadow');
            }
          });
        }
        
        // Mutual exclusivity for Custom/Other service checkbox
        if (input.type === 'checkbox' && input.name && input.name.startsWith('Service_')) {
            if (input.name === 'Service_Custom' && input.checked) {
                // Uncheck all other services
                const otherServices = document.querySelectorAll('input[type="checkbox"][name^="Service_"]:not([name="Service_Custom"])');
                otherServices.forEach(cb => {
                    if (cb.checked) {
                        cb.checked = false;
                        const parent = cb.closest('.custom-selection-btn');
                        if (parent) {
                            parent.classList.remove('inner-shadow', 'selected');
                            parent.classList.add('outer-shadow', 'hover-in-shadow');
                        }
                    }
                });
            } else if (input.name !== 'Service_Custom' && input.checked) {
                // Uncheck Custom if another service is selected
                const customCb = document.querySelector('input[type="checkbox"][name="Service_Custom"]');
                if (customCb && customCb.checked) {
                    customCb.checked = false;
                    const parent = customCb.closest('.custom-selection-btn');
                    if (parent) {
                        parent.classList.remove('inner-shadow', 'selected');
                        parent.classList.add('outer-shadow', 'hover-in-shadow');
                    }
                }
            }
        }

        // Apply state for the clicked element
        if (input.checked) {
          btn.classList.add('inner-shadow', 'selected');
          btn.classList.remove('outer-shadow', 'hover-in-shadow');
        } else {
          btn.classList.remove('inner-shadow', 'selected');
          btn.classList.add('outer-shadow', 'hover-in-shadow');
        }
      });
    });

    initClocks();
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
  prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
});

function raf(time) {
  window.lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* =========================================================
   Diamond Grid Background Animation
========================================================= */
(() => {
  const gridBg = document.getElementById("diamondGridBg");
  if (!gridBg) return;

  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");

  // Number of tiles to generate (enough to cover rotated 250vw/vh)
  const numTiles = 1000;

  for (let i = 0; i < numTiles; i++) {
    const tile = document.createElement("div");
    tile.classList.add("diamond-tile");
    gridContainer.appendChild(tile);
  }

  gridBg.appendChild(gridContainer);
})();

/* =========================================================
   Scroll Reveal Text Animation (Sticky Pinning)
========================================================= */
(() => {
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal-text');
  
  if (scrollRevealElements.length === 0) return;

  scrollRevealElements.forEach((el) => {
    const text = el.innerText;
    el.innerHTML = '';
    const words = text.trim().split(/\s+/);
    
    words.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'reveal-word';
      span.innerText = word;
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });

    const spans = el.querySelectorAll('.reveal-word');
    const container = el.closest('.intro-text-section');

    const updateReveal = () => {
      let progress = 0;
      
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        progress = scrolled / scrollableDistance;
      } else {
        const rect = el.getBoundingClientRect();
        const startReveal = window.innerHeight;
        const endReveal = window.innerHeight / 2;
        progress = (startReveal - rect.top) / (startReveal - endReveal);
      }
      
      progress = Math.max(0, Math.min(1, progress));
      
      const numActive = Math.floor(progress * spans.length);
      
      spans.forEach((span, index) => {
        if (index < numActive) {
          span.classList.add('active');
        } else {
          span.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', updateReveal);
    window.addEventListener('resize', updateReveal);
    updateReveal();
  });
})();

/* ---------------- Pricing Carousel ---------------- */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("pricing-track");
    const carousel = document.getElementById("pricing-carousel");
    
    if (track && carousel) {
        const mobileQuery = window.matchMedia("(max-width: 768px)");

        const handleScroll = () => {
            // Skip on mobile — CSS handles the stacked layout
            if (mobileQuery.matches) return;

            const bounds = track.getBoundingClientRect();
            const stickyHeight = window.innerHeight;
            
            // Calculate progress (0 to 1) based on vertical scroll within the track
            let progress = -bounds.top / (bounds.height - stickyHeight);
            progress = Math.max(0, Math.min(1, progress));
            
            // Discrete snapping logic: 
            // First 1/3rd of the scroll = Slide 1
            // Middle 1/3rd = Slide 2
            // Last 1/3rd = Slide 3
            let slideIndex = 0;
            if (progress > 0.33 && progress <= 0.66) {
                slideIndex = 1;
            } else if (progress > 0.66) {
                slideIndex = 2;
            }
            
            carousel.style.transform = `translateX(-${slideIndex * 33.333333}%)`;
        };

        const onBreakpointChange = (e) => {
            if (e.matches) {
                // Entering mobile: reset transform so CSS column layout takes over
                carousel.style.transform = "none";
            } else {
                // Leaving mobile: recalculate carousel position
                handleScroll();
            }
        };

        // Listen for breakpoint changes (e.g., orientation change)
        mobileQuery.addEventListener("change", onBreakpointChange);

        // Only attach scroll/resize if not currently mobile
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        // Initial setup
        if (mobileQuery.matches) {
            carousel.style.transform = "none";
        } else {
            handleScroll();
        }
    }
});
