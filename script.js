// =========================
// SCROLL TO TOP BUTTON
// =========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// =========================
// NAVBAR BACKGROUND
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        navbar.style.background = "#111";
        navbar.style.transition = ".4s";
    } else {
        navbar.style.background = "rgba(0,0,0,.65)";
    }

});

// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

// =========================
// REVEAL ANIMATION
// =========================

const reveals = document.querySelectorAll(
".facility-card,.room-card,.why-box,.testimonial-card,.gallery-container img,.info-card"
);

function reveal() {

    reveals.forEach(item => {

        const windowHeight = window.innerHeight;

        const elementTop = item.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

}

reveals.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = ".7s ease";

});

window.addEventListener("scroll", reveal);

reveal();

// =========================
// GALLERY EFFECT
// =========================

const images = document.querySelectorAll(".gallery-container img");

images.forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.08)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});

// =========================
// CONTACT FORM
// =========================

const form = document.querySelector("form");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

alert("Thank you! Your enquiry has been submitted successfully.");

form.reset();

});

}

// =========================
// CURRENT YEAR
// =========================

const year = new Date().getFullYear();

const copy = document.querySelector(".copyright");

if(copy){

copy.innerHTML =
`© ${year} Ashtavinayak Boy's Hostel. All Rights Reserved.`;

}
