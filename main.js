const header = document.querySelector("header");
const main = document.querySelector("main");

// Function för utloggad hemsidan ska se ut
function logInPage() {
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Användare namn";
    nameInput.className = "padding";

    const passWordInput = document.createElement("input");
    passWordInput.placeholder = "Lösenord";
    passWordInput.className = "padding";

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

    loginBtn.addEventListener("click", async () => {
        const nameInputValue = nameInput.value;
        const passWordInputValue = passWordInput.value;
        if (nameInputValue == "" && passWordInputValue == "") {
            mainText.textContent = `Fyll in den nya användarens namn och lösenordet sen logga in😊`;
            return;
        } else if (nameInputValue != "" && passWordInputValue == "" ||
            nameInputValue == "" && passWordInputValue != "") {
            mainText.textContent = "OBS! Något saknas, försök igen";
            return;
        } else {
            let User = {
                userName: nameInputValue,
                passWord: passWordInputValue
            };

            let respons = await fetch("https://myloginbackend.herokuapp.com/logIn", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(User)
            });
            let data = await respons.json();
            console.log("logIn ", data);

            if (data.mes === 'error') {
                mainText.textContent = "OBS! Har du glömd lösenordet?";
            } else {
                localStorage.setItem('usersId', JSON.stringify(data.userId));
                localStorage.setItem('userName', JSON.stringify(data.userName));
                location.reload();
            }
        }

    });
    newUser.addEventListener("click", async () => {
        const nameInputValue = nameInput.value;
        const passWordInputValue = passWordInput.value;
        if (nameInputValue == "" && passWordInputValue == "") {
            mainText.textContent = `Fyll in den nya användarens namn och lösenordet sen trycker du Ny Användare 😊`;
            return;
        } else if (nameInputValue != "" && passWordInputValue == "" ||
            nameInputValue == "" && passWordInputValue != "") {
            mainText.textContent = "OBS! Något saknas, försök igen";
            return;
        }
        else {
            let User = {
                userName: nameInputValue,
                passWord: passWordInputValue
            };

            let respons = await fetch("https://myloginbackend.herokuapp.com/createUser", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(User)
            });
            let data = await respons.json();
            console.log("logIn ", data);

            if (data.mes === 'error you have') {
                mainText.textContent = `Du har redan inloggnings uppgifter Logga bara in Tack 😎`;
            } else {
                mainText.textContent = "Nu kan du logga in med dem nya uppgifterna 👍";
            }
        }
    });
}
// Function för hur logad ut hemsida skulle kunna se ut
function logOutPage() {
    let userName = JSON.parse(localStorage.getItem('userName'));
    const logOutBtn = document.createElement("button");
    logOutBtn.textContent = "Logga ut";
    logOutBtn.className = "padding hover";

    header.appendChild(logOutBtn);

    const mainText = document.createElement("h2");
    mainText.textContent = `Välkommen ${userName} till min sida 😎`;

    main.appendChild(mainText);

    logOutBtn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}


// Om det inte finns key med namn AnvädareNamn i LocalStorage "Som är lika med null" Så om det inte finns nåt med denna key och hämta så är localstorge lika med null Så köra vi function loggadInPage
if (JSON.parse(localStorage.getItem('usersId')) === null) {
    logInPage();
}

// Om det finns nåt i localStorge så kör denna Function som håller oss inloggade
else {
    logOutPage();
}
