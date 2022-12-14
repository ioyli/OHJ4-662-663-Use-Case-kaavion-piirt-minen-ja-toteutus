class Auth {
    // hide body by default
    constructor() {
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }

    validateAuth(auth) {
        if (auth !== "valid") {
            window.location.replace("/");
        } else {
            document.querySelector("body").style.display = "block";
        }
    }

    logOut() {
        localStorage.removeItem("auth");
        window.location.replace("/");
    }
}