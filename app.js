document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    /* =========================
       MOBILE NAVIGATION
    ========================== */

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking link */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(".nav-link");


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        links.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });

    let lastSubmissionTime = 0;
    const SUBMISSION_COOLDOWN = 30000;
    /* =========================
    EMAILJS CONTACT FORM
    ========================= */

    emailjs.init({
    publicKey: "Gru1VZy80bJO0IlhJ"
    });


    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");
    const formMessage = document.getElementById("formMessage");


    contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const now = Date.now();

    if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {

        formMessage.textContent =
            "Please wait a few seconds before sending another message.";

        return;
    }
    lastSubmissionTime = Date.now();


    /* -------------------------
        HONEYPOT CHECK
    ------------------------- */

    const honeypot =
        document.getElementById("website").value.trim();

    if (honeypot !== "") {

        formMessage.textContent =
        "Unable to send this message.";

        return;
    }


    /* -------------------------
        BASIC VALIDATION
    ------------------------- */

    const name =
        document.getElementById("from_name").value.trim();

    const email =
        document.getElementById("from_email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
        "Please complete all fields.";

        return;
    }


    if (message.length < 10) {

        formMessage.textContent =
        "Please provide a little more detail in your message.";

        return;
    }


    /* -------------------------
        LOADING STATE
    ------------------------- */

    submitBtn.disabled = true;

    submitText.textContent = "Sending...";

    formMessage.textContent = "";


    try {

        await emailjs.sendForm(
        "service_x72q2tf",
        "template_8rfowbg",
        contactForm
        );


        /* -------------------------
        SUCCESS
        ------------------------- */

        formMessage.textContent =
        "Message sent successfully. I'll get back to you soon.";

        contactForm.reset();


    } catch (error) {

        console.error("EmailJS error:", error);

        formMessage.textContent =
        "Something went wrong. Please try again or contact me directly by email.";

    } finally {

        submitBtn.disabled = false;

        submitText.textContent = "Send Message";

    }

    });

});
