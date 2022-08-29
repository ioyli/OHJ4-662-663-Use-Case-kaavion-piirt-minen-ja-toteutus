class Poll {
    constructor(form, fields, options, title) {
        this.form = form;
        this.fields = fields;
        this.options = options;
        this.title = title;
        this.validateOnSubmit();
        this.addOptionField();
        this.removeOptionField();
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
                // configure poll options
                for (let i = 0; i < this.fields.length; i++) {
                    let title = document.getElementById(`option${i + 1}`).value;
                    this.configureOption(title);
                }

                // ADD POLL TO POLLS
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
            // set status based on field, no text, and success message
            this.setStatus(field, null, "success");
            return true;
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

    configureOption(title) {
        this.options.push({
            title: title,
            votes: 0
        })
    }

    addOptionField() {

        // add click event listener to button
        document.getElementById('addOption').addEventListener("click", (e) => {
            let id = this.fields.length;
    
            document.getElementById('optionFields').innerHTML += `
            <div class="inputGroup">
                <label for="option${id}" class="label">Option</label>
                <input type="text" id="option${id}" name="option${id}" class="input">
                <span class="errorMessage"></span>
            </div>`;

            this.fields.push(`option${id}`);
        })
    }

    removeOptionField() {

        // add click event listener to button
        document.getElementById('removeOption').addEventListener("click", (e) => {
            let allFields = document.getElementById('optionFields');
    
            // if only 2 options are present, prevent removal
            if (this.fields.length <= 3) {
                alert("Poll must have at least 2 options.")
            } else {
                if (allFields.hasChildNodes()) {
                    allFields.removeChild(allFields.children[allFields.children.length - 1]);
                    this.fields.pop();
                }
            }
        })
    }
}

const form = document.getElementById('addPoll');
// if form exists, run class
if (form) {
    const fields = ["title", "option1", "option2"];
    const options = [];
    const title = "";
    const validator = new Poll (form, fields, options, title);
}