const browseBtn = document.getElementById("browsePollsBtn");
const addBtn = document.getElementById("addPollBtn");
const browsePage = document.getElementById("browsePolls");
const addPage = document.getElementById("addPoll");

const polls = [{
    title: "Cats or Dogs?",
    options: [{name: "Cats", votes: 10}, {name: "Dogs", votes: 12}],
    status: 0
},
{
    title: "Favorite kind of drink?",
    options: [{name: "Juice", votes: 20}, {name: "Soda", votes: 30}, {name: "Milk", votes: 15}, {name: "Water", votes: 25}],
    status: 0
}];

// BROWSE POLLS
browseBtn.addEventListener("click", (e) => {
    addPage.style.display = "none";
    browsePage.style.display = "block";
    renderPolls();
});

// ADD POLL
addBtn.addEventListener("click", (e) => {
    browsePage.style.display = "none";
    addPage.style.display = "block";
});

function renderPolls() {
    const container = document.getElementById("allPolls");
    container.innerHTML = "";
    
    // render polls 1 by 1
    for (let i = 0; i < polls.length; i++) {
        container.innerHTML += `
        <div class="poll" id="poll${i}">
        <div class="title">${polls[i].title}</div>
        <div class="options" id="poll${i}Options"></div>
        </div>`;
        renderOptions(i);
    }
    
}

function renderOptions(poll) {
    let optionContainer = document.getElementById(`poll${poll}Options`);
    for (let i = 0; i < polls[poll].options.length; i++) {
        optionContainer.innerHTML += `
        <div class="option" id="poll${poll}Option${i}" onclick="vote(${poll}, ${i})">
        <div class="name">${polls[poll].options[i].name}</div>
        <div class="votes">${polls[poll].options[i].votes} votes</div>
        </div>`;
        
        if (polls[poll].status == 1) {
            const nodeList = document.querySelectorAll(`#poll${poll} .votes`);
            
            for (let ni = 0; ni < nodeList.length; ni++) {
                nodeList[ni].style.display = "block";
            }
        }
    }
}

function vote(poll, option) {
    
    if (polls[poll].status == 0) {
        polls[poll].options[option].votes++;
        polls[poll].status = 1;

        document.querySelector(`#poll${poll}Option${option} .name`).classList.add("voted");
        document.querySelector(`#poll${poll}Option${option} .votes`).innerHTML = `${polls[poll].options[option].votes} votes`;
        
        const nodeList = document.querySelectorAll(`#poll${poll} .votes`);
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].style.display = "block";
        }
    }
}

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
                // configure poll title
                this.title = document.getElementById("title").value;
                
                // configure poll options
                for (let i = 0; i < this.fields.length - 1; i++) {
                    let name = document.getElementById(`option${i + 1}`).value;
                    this.configureOption(name);
                }
                
                // ADD POLL TO POLLS
                polls.push({
                    title: this.title,
                    options: this.options,
                    status: 0
                });
                this.options = [];
            }
        });
    }
    
    configureOption(name) {
        this.options.push({
            name: name,
            votes: 0
        });
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
        const poll = new Poll (form, fields, options, title);
    }