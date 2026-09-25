/* =========================================================
   ASTHAVINAYAK BOYS HOSTEL
   Premium Website JavaScript
   ========================================================= */


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       02. AOS SCROLL ANIMATIONS
       ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            delay: 0
        });

    }


    /* =====================================================
       03. PRELOADER
       ===================================================== */

    const preloader = document.getElementById("preloader");

    const hidePreloader = () => {

        if (!preloader) return;

        preloader.classList.add("hide");

        setTimeout(() => {

            preloader.style.display = "none";

        }, 700);

    };


    if (document.readyState === "complete") {

        setTimeout(hidePreloader, 500);

    } else {

        window.addEventListener("load", () => {

            setTimeout(hidePreloader, 500);

        });

    }


    /* =====================================================
       04. NAVBAR
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* =====================================================
       05. MOBILE MENU
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (!icon) return;

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close menu after clicking a link */

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /* =====================================================
       06. SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight + 20
                : 20;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       07. HERO VIDEO
       ===================================================== */

    const heroVideo = document.querySelector(".hero video");

    if (heroVideo) {

        heroVideo.muted = true;

        const playVideo = () => {

            const playPromise = heroVideo.play();

            if (
                playPromise !== undefined &&
                typeof playPromise.catch === "function"
            ) {

                playPromise.catch(() => {

                    /*
                     Some mobile browsers may block
                     autoplay. The website still works
                     normally with the video fallback.
                    */

                });

            }

        };

        playVideo();

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.visibilityState === "visible" &&
                    heroVideo.paused
                ) {

                    playVideo();

                }

            }
        );

    }


    /* =====================================================
       08. GALLERY LIGHTBOX
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxClose =
        document.querySelector(".lightbox-close");

    const lightboxPrev =
        document.querySelector(".lightbox-prev");

    const lightboxNext =
        document.querySelector(".lightbox-next");


    let currentGalleryIndex = 0;


    const galleryImages = Array.from(galleryItems)
        .map((item) => {

            const image = item.querySelector("img");

            return image
                ? {
                    src: image.src,
                    alt: image.alt || "Gallery Image"
                }
                : null;

        })
        .filter(Boolean);


    const updateLightbox = () => {

        if (!lightboxImage || !galleryImages.length) return;

        const currentImage =
            galleryImages[currentGalleryIndex];

        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;

    };


    const openLightbox = (index) => {

        if (!lightbox || !galleryImages.length) return;

        currentGalleryIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    };


    const closeLightbox = () => {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

    };


    const showNextImage = () => {

        if (!galleryImages.length) return;

        currentGalleryIndex =
            (currentGalleryIndex + 1) %
            galleryImages.length;

        updateLightbox();

    };


    const showPreviousImage = () => {

        if (!galleryImages.length) return;

        currentGalleryIndex =
            (currentGalleryIndex - 1 + galleryImages.length) %
            galleryImages.length;

        updateLightbox();

    };


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextImage
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );

    }


    if (lightbox) {

        lightbox.addEventListener("click", (event) => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });

    }


    /* =====================================================
       09. KEYBOARD CONTROLS FOR LIGHTBOX
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (!lightbox ||
            !lightbox.classList.contains("active")) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            showNextImage();

        }


        if (event.key === "ArrowLeft") {

            showPreviousImage();

        }

    });


    /* =====================================================
       10. BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById("back-to-top");


    const updateBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };


    updateBackToTop();

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       11. CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.getElementById("current-year");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       12. PHONE NUMBER VALIDATION
       ===================================================== */

    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener("input", () => {

            phoneInput.value =
                phoneInput.value.replace(/\D/g, "")
                    .slice(0, 10);

        });

    }


    /* =====================================================
       13. ENQUIRY FORM
       ===================================================== */

    const enquiryForm =
        document.getElementById("enquiry-form");

    const formStatus =
        document.getElementById("form-status");


    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const submitButton =
                    enquiryForm.querySelector(
                        ".submit-btn"
                    );


                const name =
                    document.getElementById("name")
                        ?.value.trim();

                const phone =
                    document.getElementById("phone")
                        ?.value.trim();

                const institute =
                    document.getElementById("institute")
                        ?.value;

                const room =
                    document.getElementById("room")
                        ?.value;

                const message =
                    document.getElementById("message")
                        ?.value.trim();


                /* Basic validation */

                if (!name || !phone || !institute || !room) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please fill in all required fields.";

                        formStatus.style.color =
                            "#ff7777";

                    }

                    return;

                }


                if (!/^[0-9]{10}$/.test(phone)) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please enter a valid 10-digit phone number.";

                        formStatus.style.color =
                            "#ff7777";

                    }

                    return;

                }


                /*
                 * EmailJS connection will be added later.
                 *
                 * For now we create the enquiry object
                 * and prepare the form for EmailJS.
                 */


                const enquiryData = {

                    name,
                    phone,
                    institute,
                    room,
                    message

                };


                console.log(
                    "Hostel Enquiry:",
                    enquiryData
                );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        `
                        Sending
                        <i class="fa-solid fa-spinner fa-spin"></i>
                        `;

                }


                /*
                 * Temporary local success state.
                 *
                 * EmailJS will replace this part once
                 * your EmailJS Service ID, Template ID
                 * and Public Key are added.
                 */


                setTimeout(() => {

                    if (formStatus) {

                        formStatus.textContent =
                            "Enquiry received. We will contact you shortly.";

                        formStatus.style.color =
                            "#d4af37";

                    }


                    enquiryForm.reset();


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            `
                            Send Enquiry
                            <i class="fa-solid fa-arrow-right"></i>
                            `;

                    }

                }, 900);

            }
        );

    }


    /* =====================================================
       14. ROOM CARD INTERACTION
       ===================================================== */

    const roomCards =
        document.querySelectorAll(".room-card");


    roomCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            roomCards.forEach((otherCard) => {

                if (otherCard !== card) {

                    otherCard.style.opacity = "0.72";

                }

            });

        });


        card.addEventListener("mouseleave", () => {

            roomCards.forEach((otherCard) => {

                otherCard.style.opacity = "1";

            });

        });

    });


    /* =====================================================
       15. FACILITY CARD INTERACTION
       ===================================================== */

    const facilityCards =
        document.querySelectorAll(".facility-card");


    facilityCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            const icon =
                card.querySelector("i");

            if (icon) {

                icon.style.transform =
                    "scale(1.12)";

                icon.style.transition =
                    "transform 0.3s ease";

            }

        });


        card.addEventListener("mouseleave", () => {

            const icon =
                card.querySelector("i");

            if (icon) {

                icon.style.transform =
                    "scale(1)";

            }

        });

    });


    /* =====================================================
       16. CONTACT FORM PHONE INPUT
       ===================================================== */

    const phoneField =
        document.getElementById("phone");


    if (phoneField) {

        phoneField.addEventListener(
            "keypress",
            (event) => {

                if (!/[0-9]/.test(event.key)) {

                    event.preventDefault();

                }

            }
        );

    }


    /* =====================================================
       17. IMAGE ERROR HANDLING
       ===================================================== */

    document.querySelectorAll("img").forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       18. ESCAPE MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        if (!navLinks || !menuBtn) return;

        navLinks.classList.remove("active");

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =====================================================
       19. PREVENT FORM DOUBLE SUBMISSION
       ===================================================== */

    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            () => {

                const button =
                    enquiryForm.querySelector(
                        ".submit-btn"
                    );

                if (button) {

                    button.setAttribute(
                        "data-submitted",
                        "true"
                    );

                }

            }
        );

    }


    /* =====================================================
       20. INITIALIZE
       ===================================================== */

    console.log(
        "%cASTHAVINAYAK BOYS HOSTEL",
        "color:#d4af37;font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cPremium website initialized successfully.",
        "color:#aaa;font-size:12px;"
    );

});
