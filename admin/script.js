// ========================================
// FEATHER LIFESTEAL - ADMIN SCRIPT
// ========================================

// Navigation
const navButtons = document.querySelectorAll(".nav-button");

navButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // Active status entfernen
        navButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Geklickten Button aktivieren
        button.classList.add("active");

        console.log("Admin section:", button.textContent.trim());
    });
});


// ========================================
// QUICK ACTIONS
// ========================================

const actions = document.querySelectorAll(".action");

actions.forEach((action) => {
    action.addEventListener("click", () => {

        const title = action.querySelector("h3");

        if (title) {
            console.log(
                "Quick action:",
                title.textContent.trim()
            );
        }
    });
});


// ========================================
// PAGE LOADED
// ========================================

console.log("Feather Lifesteal Admin Panel loaded.");
