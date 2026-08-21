/* =========================================
   LUMA — DIGITAL LETTER
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   01. GET ELEMENTS
========================================= */

const welcomeScreen = document.getElementById("welcome-screen");

const envelopeScreen = document.getElementById("envelope-screen");

const letterScreen = document.getElementById("letter-screen");

const memoriesScreen = document.getElementById("memories-screen");

const finalScreen = document.getElementById("final-screen");


const beginButton = document.getElementById("begin-button");

const openLetterButton =
    document.getElementById("open-letter-button");

const memoriesButton =
    document.getElementById("memories-button");

const finalButton =
    document.getElementById("final-button");

const restartButton =
    document.getElementById("restart-button");


const envelope =
    document.getElementById("envelope");


/* =========================================
   02. SCREEN CONTROL
========================================= */

const screens = [
    welcomeScreen,
    envelopeScreen,
    letterScreen,
    memoriesScreen,
    finalScreen
];


function showScreen(screenToShow) {

    screens.forEach((screen) => {

        if (screen === screenToShow) {

            screen.classList.remove("hidden");

            screen.style.opacity = "0";

            screen.style.transform =
                "translateY(20px)";

            requestAnimationFrame(() => {

                screen.style.opacity = "1";

                screen.style.transform =
                    "translateY(0)";

            });

        } else {

            screen.classList.add("hidden");

        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   03. BEGIN JOURNEY
========================================= */

beginButton.addEventListener("click", () => {

    showScreen(envelopeScreen);

});


/* =========================================
   04. ENVELOPE OPENING
========================================= */

openLetterButton.addEventListener("click", () => {

    openEnvelope();

});


envelope.addEventListener("click", () => {

    openEnvelope();

});


let envelopeOpened = false;

function openEnvelope() {

    if (envelopeOpened) {
        return;
    }

    envelopeOpened = true;

    const flap =
        envelope.querySelector(".envelope-flap");

    const paper =
        envelope.querySelector(".envelope-paper");

    const envelopeBody =
        envelope.querySelector(".envelope");


    envelopeBody.style.animation =
        "none";

    envelopeBody.style.transform =
        "translateY(-5px) scale(1.02)";


    flap.style.transform =
        "rotateX(180deg)";


    setTimeout(() => {

        paper.style.transform =
            "translateY(-55px)";

    }, 250);


    setTimeout(() => {

        envelopeScreen.style.opacity = "0";

        envelopeScreen.style.transform =
            "scale(0.96)";


    }, 700);


    setTimeout(() => {

        showScreen(letterScreen);

        envelopeOpened = false;

    }, 1200);

}

/* =========================================
   05. LETTER → MEMORIES
========================================= */

memoriesButton.addEventListener("click", () => {

    showScreen(memoriesScreen);

});


/* =========================================
   06. MEMORIES → FINAL
========================================= */

finalButton.addEventListener("click", () => {

    showScreen(finalScreen);

});


/* =========================================
   07. RESTART EXPERIENCE
========================================= */

restartButton.addEventListener("click", () => {

    envelopeOpened = false;


    const flap =
        envelope.querySelector(".envelope-flap");

    const paper =
        envelope.querySelector(".envelope-paper");


    flap.style.transform =
        "rotateX(0deg)";


    paper.style.transform =
        "translateY(18px)";


    showScreen(welcomeScreen);

});


/* =========================================
   08. KEYBOARD ACCESS
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        showScreen(welcomeScreen);

    }

});


/* =========================================
   09. BUTTON RIPPLE EFFECT
========================================= */

const buttons =
    document.querySelectorAll("button");


buttons.forEach((button) => {

    button.addEventListener("click", function () {

        this.animate(
            [
                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(.96)"
                },

                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 220,
                easing: "ease-out"
            }
        );

    });

});


/* =========================================
   10. MEMORY CARD REVEAL
========================================= */

const memoryCards =
    document.querySelectorAll(".memory-card");


memoryCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(25px)";


    card.style.transition =
        `opacity .7s ease ${index * .12}s,
         transform .7s ease ${index * .12}s`;

});


function revealMemoryCards() {

    memoryCards.forEach((card) => {

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    });

}


/* =========================================
   11. WATCH SCREEN CHANGES
========================================= */

const screenObserver =
    new MutationObserver(() => {

        if (
            !memoriesScreen.classList.contains("hidden")
        ) {

            setTimeout(() => {

                revealMemoryCards();

            }, 120);

        }

    });


screenObserver.observe(
    memoriesScreen,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);


/* =========================================
   12. PARTICLES
========================================= */

const particleContainer =
    document.querySelector(".particles");


function createParticle() {

    if (!particleContainer) {
        return;
    }


    const particle =
        document.createElement("span");


    particle.className =
        "floating-particle";


    const size =
        Math.random() * 3 + 1;


    const left =
        Math.random() * 100;


    const duration =
        Math.random() * 8 + 7;


    const delay =
        Math.random() * 5;


    particle.style.width =
        `${size}px`;


    particle.style.height =
        `${size}px`;


    particle.style.left =
        `${left}%`;


    particle.style.animationDuration =
        `${duration}s`;


    particle.style.animationDelay =
        `${delay}s`;


    particleContainer.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, (duration + delay) * 1000);

}


/* Create initial particles */

for (let i = 0; i < 35; i++) {

    createParticle();

}


/* Continue creating particles */

setInterval(() => {

    createParticle();

}, 900);


/* =========================================
   13. MOUSE PARALLAX
========================================= */

const background =
    document.querySelector(".background");


document.addEventListener("mousemove", (event) => {

    if (!background) {
        return;
    }


    const x =
        (event.clientX / window.innerWidth - 0.5);


    const y =
        (event.clientY / window.innerHeight - 0.5);


    background.style.transform =
        `translate(${x * -10}px, ${y * -10}px)`;

});


/* =========================================
   14. TOUCH FRIENDLY BEHAVIOR
========================================= */

document.addEventListener(
    "touchstart",
    () => {

        document.body.classList.add(
            "touch-device"
        );

    },
    {
        passive: true
    }
);


/* =========================================
   15. INITIAL STATE
========================================= */

showScreen(welcomeScreen);


/* =========================================
   16. PAGE LOAD MESSAGE
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add(
        "page-loaded"
    );

});
/* =========================================
   RESTART JOURNEY
========================================= */

function restartJourney() {

    document.body.classList.add("journey-restarting");

    setTimeout(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        document.body.classList.remove(
            "journey-restarting"
        );

    }, 500);
}
