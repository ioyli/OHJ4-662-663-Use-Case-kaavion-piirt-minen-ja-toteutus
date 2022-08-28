class Poll {
    constructor(form, title) {
        this.form = form;
        this.title = title;
        this.options = [];
        this.validateOnSubmit();
    }

    addOption(option) {
        let error = 0;

        if (this.validateOptions(option) === false) {
            error++;
        }

        if (error === 0) {
            let objOption = {
                name: `${option}`,
                votes: 0
            }
            this.options.push(objOption);
        }
    }

    validateOnSubmit() {
        let self = this;

        // add submit event listener to form
        this.form.addEventListener("submit", (e) => {

            e.preventDefault();
            let error = 0;

            if (self.title.value.trim === "") {
                alert("Poll title cannot be blank.");
                error++;
            }

            if (self.options.length < 2) {
                alert("Poll must have at least 2 options.");
                error++;
            }

            // loop through options and check each for validation
            self.options.forEach((option) => {
                const input = document.querySelector(`#${option}`);
                if (self.validateOptions(input) === false) {
                    error++;
                }
            });

            if (error === 0) {
                // ADD NEW POLL TO POLLS
                this.form.submit;
            }
        })
    }

    validateOptions(option) {
        // remove any whitespace, if option is blank, return false
        if (option.value.trim === "") {
            // set status on option, option label, and error message
            this.setStatus(
                option,
                `${option.previousElementSibling.innerText} cannot be blank.`, "error"
            );
            return false;

        } else {
            // set status on option, no label, and success message
            this.setStatus(option, null, "success");
            return true;
        }
    }

    setStatus(option, message, status) {
        const errorMessage = option.parentElement.querySelector(".errorMessage");

        // if success, remove error messages and classes
        if (status === "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            option.classList.remove("inputError");
        }

        if (status === "error") {
            errorMessage.innerText = message;
            option.classList.add("inputError");
        }
    }
}