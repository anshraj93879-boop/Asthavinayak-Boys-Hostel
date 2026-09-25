/* =========================================================
   ASTHAVINAYAK BOYS HOSTEL
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

(function () {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;

    function hidePreloader() {

        preloader.classList.add("hide");

        setTimeout(function () {

            preloader.style.display = "none";

        }, 700);

    }

    if (document.readyState === "complete") {

        setTimeout(hidePreloader, 400);

    } else {

        window.addEventListener(
            "load",
            function () {

                setTimeout(
                    hidePreloader,
                    400
                );

            }
        );

    }

    /* Safety fallback:
       Preloader will never remain
       stuck permanently. */

    setTimeout(
        hidePreloader,
        2500
    );

})();


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const header =
            document.getElementById("header");

        const menuBtn =
            document.getElementById("menuBtn");

        const navLinks =
            document.getElementById("navLinks");

        const enquiryForm =
            document.getElementById("enquiryForm");

        const year =
            document.getElementById("year");


        /* =================================================
           CURRENT YEAR
        ================================================= */

        if (year) {

            year.textContent =
                new Date().getFullYear();

        }


        /* =================================================
           MOBILE NAVIGATION
        ================================================= */

        if (menuBtn && navLinks) {

            menuBtn.addEventListener(
                "click",
                function () {

                    navLinks.classList.toggle(
                        "active"
                    );

                    const icon =
                        menuBtn.querySelector("i");

                    if (!icon) return;

                    if (
                        navLinks.classList.contains(
                            "active"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );


            /* Close menu after clicking link */

            navLinks
                .querySelectorAll("a")
                .forEach(function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navLinks.classList.remove(
                                "active"
                            );

                            const icon =
                                menuBtn.querySelector("i");

                            if (!icon) return;

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }
                    );

                });

        }


        /* =================================================
           HEADER SCROLL EFFECT
        ================================================= */

        function updateHeader() {

            if (!header) return;

            if (window.scrollY > 40) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );


        /* =================================================
           SMOOTH SCROLL
        ================================================= */

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute("href");

                        if (
                            !targetId ||
                            targetId === "#"
                        ) return;

                        const target =
                            document.querySelector(
                                targetId
                            );

                        if (!target) return;

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            });


        /* =================================================
           REVEAL ON SCROLL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    function (
                        entries,
                        observer
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =================================================
           FAQ ACCORDION
        ================================================= */

        const faqButtons =
            document.querySelectorAll(
                ".faq button"
            );


        faqButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const currentFaq =
                            this.closest(".faq");

                        if (!currentFaq) return;


                        /* Close other FAQs */

                        document
                            .querySelectorAll(
                                ".faq.open"
                            )
                            .forEach(
                                function (faq) {

                                    if (
                                        faq !==
                                        currentFaq
                                    ) {

                                        faq.classList.remove(
                                            "open"
                                        );

                                    }

                                }
                            );


                        /* Toggle current FAQ */

                        currentFaq.classList.toggle(
                            "open"
                        );

                    }
                );

            }
        );


        /* =================================================
           GALLERY LIGHTBOX
        ================================================= */

        const lightbox =
            document.getElementById(
                "lightbox"
            );

        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );

        const lightboxClose =
            document.getElementById(
                "lightboxClose"
            );

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item[data-image]"
            );


        function openLightbox(
            imageSrc
        ) {

            if (
                !lightbox ||
                !lightboxImage
            ) return;

            lightboxImage.src =
                imageSrc;

            lightbox.classList.add(
                "show"
            );

            document.body.classList.add(
                "lock"
            );

        }


        function closeLightbox() {

            if (!lightbox) return;

            lightbox.classList.remove(
                "show"
            );

            document.body.classList.remove(
                "lock"
            );

        }


        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        const image =
                            this.getAttribute(
                                "data-image"
                            );

                        if (image) {

                            openLightbox(
                                image
                            );

                        }

                    }
                );

            }
        );


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );

        }


        if (lightbox) {

            lightbox.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        lightbox
                    ) {

                        closeLightbox();

                    }

                }
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }

            }
        );


        /* =================================================
           ENQUIRY FORM
        ================================================= */

        if (enquiryForm) {

            enquiryForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "name"
                            )
                            ?.value
                            .trim();


                    const phone =
                        document
                            .getElementById(
                                "phone"
                            )
                            ?.value
                            .trim();


                    const institute =
                        document
                            .getElementById(
                                "institute"
                            )
                            ?.value;


                    const room =
                        document
                            .getElementById(
                                "room"
                            )
                            ?.value;


                    const message =
                        document
                            .getElementById(
                                "message"
                            )
                            ?.value
                            .trim();


                    /* Validate */

                    if (
                        !name ||
                        !phone ||
                        !institute ||
                        !room
                    ) {

                        alert(
                            "Please fill all required fields."
                        );

                        return;

                    }


                    if (
                        !/^[0-9]{10}$/.test(
                            phone
                        )
                    ) {

                        alert(
                            "Please enter a valid 10-digit phone number."
                        );

                        return;

                    }


                    /* WhatsApp message */

                    let whatsappMessage =
                        "Hello Asthavinayak Boys Hostel,%0A%0A";


                    whatsappMessage +=
                        "*New Room Enquiry*%0A%0A";


                    whatsappMessage +=
                        "Name: " +
                        encodeURIComponent(
                            name
                        ) +
                        "%0A";


                    whatsappMessage +=
                        "Phone: " +
                        encodeURIComponent(
                            phone
                        ) +
                        "%0A";


                    whatsappMessage +=
                        "Institute: " +
                        encodeURIComponent(
                            institute
                        ) +
                        "%0A";


                    whatsappMessage +=
                        "Room: " +
                        encodeURIComponent(
                            room
                        ) +
                        "%0A";


                    if (message) {

                        whatsappMessage +=
                            "Message: " +
                            encodeURIComponent(
                                message
                            ) +
                            "%0A";

                    }


                    whatsappMessage +=
                        "%0AThank you.";


                    const whatsappURL =
                        "https://wa.me/919471405852?text=" +
                        whatsappMessage;


                    window.open(
                        whatsappURL,
                        "_blank"
                    );


                    /* Reset form */

                    enquiryForm.reset();

                }
            );

        }


        /* =================================================
           PHONE INPUT
        ================================================= */

        const phoneInput =
            document.getElementById(
                "phone"
            );


        if (phoneInput) {

            phoneInput.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .replace(
                                /[^0-9]/g,
                                ""
                            )
                            .slice(
                                0,
                                10
                            );

                }
            );

        }


    }
);
