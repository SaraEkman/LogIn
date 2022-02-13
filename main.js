// Deklarera globala variablerna för rätta användare namnet och lösenordet
const rightUserName = "janne";
const rightPassWord = "test";

// Hämta alla element från HTML filen
const header = document.querySelector("header");
const main = document.querySelector("main");


// Function för utloggad hemsidan ska se ut
function loggadInPage() {
    // Skappa input för använda namnet
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Användare namn";
    nameInput.className = "padding";

    // Skappa input för lösenordet
    const passWordInput = document.createElement("input");
    passWordInput.placeholder = "Lösenord";
    passWordInput.className = "padding";

    // Skappa loggand in button
    const loginBtn = document.createElement("button");
    loginBtn.textContent = "Logga in";
    loginBtn.className = "padding hover";

    // Appenda alla skapade taggar till header
    header.append(nameInput, passWordInput, loginBtn);

    // Skapap texten i main 
    const mainText = document.createElement("h2");
    mainText.textContent = "Välkommen logga in";

    // Appenda den till main
    main.appendChild(mainText);

    // Skappa lyssnare på knappen 
    loginBtn.addEventListener("click", () => {
        // Hämta inputernas value
        const nameInputValue = nameInput.value;
        const passWordInputValue = passWordInput.value;

        // Gemföra dem med dem globala variablerna 
        if (nameInputValue === rightUserName && passWordInputValue === rightPassWord) {

            // Om if true så ska dem läggas i LocalStorage
            localStorage.setItem("AnvändareNamn", rightUserName);
            localStorage.setItem("Lösenord", rightPassWord);

            // ladda om sidan
            location.reload();
        }
        // Om det inte stämmer så ändras inhållet på main
        else if (nameInputValue !== rightUserName && passWordInputValue !== rightPassWord) {
            mainText.textContent = "Fel Försök igen";
        }
    });
}
// Function för hur logad ut hemsida skulle kunna se ut
function loggadOutPage() {
    // Göra button med logga ut
    const logOutBtn = document.createElement("button");
    logOutBtn.textContent = "Logga ut";
    logOutBtn.className = "padding hover";

    // Apenda den till header
    header.appendChild(logOutBtn);

    // Göra h2 i main 
    const mainText = document.createElement("h2");
    mainText.textContent = "Välkommen Janne till min sida";

    // Apenda den till main
    main.appendChild(mainText);

    // Skappa lysnare på button 
    logOutBtn.addEventListener("click", () => {
        // Som klirar allt från LocalStorage och ladda om sidan
        localStorage.clear();
        location.reload();
    });
}

// Om det inte finns key med namn AnvädareNamn i LocalStorage "Som är lika med null" Så om det inte finns nåt med denna key och hämta så är localstorge lika med null Så köra vi function loggadInPage 
if (localStorage.getItem('AnvändareNamn') === null) {
    loggadInPage();
}

// Om det finns nåt i localStorge så kör denna Function som håller oss inloggade
else {
    loggadOutPage();
}