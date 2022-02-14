// Deklarera globala variablerna för rätta användare namnet och lösenordet

const userArr = [{UName: "janne",PWord:"test"}]

const header = document.querySelector("header");
const main = document.querySelector("main");


// Function för utloggad hemsidan ska se ut
function logInPage() {
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Användare namn";
    nameInput.className = "padding NewN";

    const passWordInput = document.createElement("input");
    passWordInput.placeholder = "Lösenord";
    passWordInput.className = "padding NewP";

    const loginBtn = document.createElement("button");
    loginBtn.textContent = "Logga in";
    loginBtn.className = "padding hover";

    const newUser = document.createElement("button");
    newUser.textContent = "Ny Användare";
    newUser.className = "padding hover NewU";

    header.append(nameInput, passWordInput, loginBtn, newUser);

    const mainText = document.createElement("h2");
    mainText.textContent = "Välkommen logga in eller registrera dig 😊";

    main.appendChild(mainText);

    loginBtn.addEventListener("click", () => {
        const nameInputValue = nameInput.value;
        const passWordInputValue = passWordInput.value;

        for (let el of userArr) {
            if (el.UName === nameInputValue && el.PWord === passWordInputValue) {
                localStorage.setItem("UserN", JSON.stringify(el.UName) );
                localStorage.setItem("PWord", JSON.stringify(el.PWord) );
                location.reload();
            } else {
                mainText.textContent = `Försök igen med rätt uppgifter eller registrera dig 🧐`;
            } 
        }
       
    });
    newUser.addEventListener("click", () => {
        const nameInputValue = nameInput.value;
        const passWordInputValue = passWordInput.value;
        console.log("hl");
        if (nameInputValue == "" && passWordInputValue == "" ||
            nameInputValue != "" && passWordInputValue == "" || 
            nameInputValue == "" && passWordInputValue != "") {
            mainText.textContent = "Fyll in den nya användarens namn och lösenordet sen trycker du Ny Användare 😊";
        } else {
            userArr.push({ UName: nameInputValue, PWord:passWordInputValue })
            mainText.textContent = "Nu kan du logga in med dem nya uppgifterna 👍";
            console.log(userArr);
        }
  
    });
}
// Function för hur logad ut hemsida skulle kunna se ut
function logOutPage() {
    const logOutBtn = document.createElement("button");
    logOutBtn.textContent = "Logga ut";
    logOutBtn.className = "padding hover";

    header.appendChild(logOutBtn);

    // Göra h2 i main 
    const mainText = document.createElement("h2");
    mainText.textContent = `Välkommen ${JSON.parse(localStorage.getItem('UserN'))} till min sida 😎`;

    main.appendChild(mainText);

    logOutBtn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}

// Om det inte finns key med namn AnvädareNamn i LocalStorage "Som är lika med null" Så om det inte finns nåt med denna key och hämta så är localstorge lika med null Så köra vi function loggadInPage 
if (JSON.parse(localStorage.getItem('UserN'))  === null || JSON.parse(localStorage.getItem("PWord") ) === null) {
    logInPage();
}

// Om det finns nåt i localStorge så kör denna Function som håller oss inloggade
else {
    logOutPage();
}
