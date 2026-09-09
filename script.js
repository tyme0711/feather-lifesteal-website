```javascript
// ============================================
// FEATHER LIFESTEAL - WEBSITE JAVASCRIPT
// ============================================

// ============================================
// SERVER INFORMATION
// ============================================

const SERVER_IP = "play.example.de";


// ============================================
// COPY SERVER IP
// ============================================

const copyButton = document.getElementById("copyIpButton");
const serverIpElement = document.getElementById("serverIp");
const copyMessage = document.getElementById("copyMessage");

if (copyButton) {
    copyButton.addEventListener("click", async () => {

        try {
            await navigator.clipboard.writeText(SERVER_IP);

            if (copyMessage) {
                copyMessage.textContent = "✓ Server-IP wurde kopiert!";
            }

            copyButton.textContent = "Kopiert!";

            setTimeout(() => {
                copyButton.textContent = "IP kopieren";

                if (copyMessage) {
                    copyMessage.textContent = "";
                }
            }, 2500);

        } catch (error) {

            if (copyMessage) {
                copyMessage.textContent = `Server-IP: ${SERVER_IP}`;
            }

            console.error("Die Server-IP konnte nicht kopiert werden:", error);
        }
    });
}


// ============================================
// MOBILE MENU
// ============================================

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNav =
    document.getElementById("mobileNav");

if (mobileMenuButton && mobileNav) {

    mobileMenuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("open");

        if (mobileNav.classList.contains("open")) {
            mobileMenuButton.textContent = "✕";
        } else {
            mobileMenuButton.textContent = "☰";
        }

    });


    // Mobile Menü schließen, wenn Link geklickt wird

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

            mobileMenuButton.textContent = "☰";

        });

    });
}


// ============================================
// SMOOTH SCROLL
// ============================================

const navigationLinks =
    document.querySelectorAll('a[href^="#"]');

navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// ============================================
// CURRENT YEAR
// ============================================

const currentYear = new Date().getFullYear();

document.querySelectorAll("[data-current-year]")
    .forEach((element) => {
        element.textContent = currentYear;
    });


// ============================================
// CONSOLE INFORMATION
// ============================================

console.log(
    "%cFeather Lifesteal",
    "font-size: 22px; font-weight: bold;"
);

console.log(
    "Website erfolgreich geladen."
);
```
