class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {

        // add submit event listener to form
        this.form.addEventListener("submit", (e) => {

            e.preventDefault();
            let error = 0;

            // loop through fields and check each for validation
            this.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (this.validateFields(input) === false) {
                    error++;
                }
            });

            if (error === 0) {
                localStorage.setItem("auth", "valid");
                this.form.submit();
            }
        })
    }

    validateFields(field) {
        // remove any white space, if field is blank, return false
        if (field.value.trim() === "") {
            // set status based on field, field label, and error message
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank.`, "error"
            );
            return false;

        } else {
            // if not blank, check if the field is a password
            if (field.type === "password") {
                // if a password, check to see if it meets minimum requirements
                if (field.value.length < 8) {
                    // set status based on field, field label, and error message
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} must be at least 8 characters long.`, "error"
                    );
                    return false;

                } else {
                    // set status based on field, no text, and success message
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                // set status based on field, no text, and success message
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".errorMessage");

        // if success, remove error messages and classes
        if (status === "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            field.classList.remove("inputError");
        }

        if (status === "error") {
            errorMessage.innerText = message;
            field.classList.add("inputError");
        }
    }
}

const form = document.getElementById('loginRegister');
// if form exists, run class
if (form) {
    const fields = ["username", "password"];
    const validator = new Login (form, fields);
}