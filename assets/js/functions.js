/* JavaScript for Intro Component with Signup Form from Frontend Mentor */

/* Attach event handler to submit button */
const submit = document.getElementById("btn-submit");
submit.addEventListener("click", function(event){
  event.preventDefault();
  checkInput();
});

/* Validate email address (regex grabbed from emailregex.com) */
function isEmail(address){
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(String(address).toLowerCase());
}

/* Validate input fields */
function checkInput(){
    let errors = false;
  const allFields = document.getElementsByClassName("input");
  for (const field of allFields){
    field.parentElement.classList.remove("label--error");
    if (field.nextSibling) field.parentNode.removeChild(field.nextSibling);
    if (!field.value) {
      setState("error", field, "empty");
      errors = true;
    }
  }
  const emailField = document.getElementsByClassName("input-email");
  if (!isEmail(emailField[0].value)) {
    setState("error", emailField[0], "invalid");
    errors = true;
  }
  if (!errors) {
    for (const field of allFields){
      field.value = "";
    }
  }
}

/* Function to set state and error messages */
function setState(state, element, reason){
  const parent = element.parentElement;
  if (state == "default"){
    parent.classList.remove("label--error");
  }
  else if (state == "error") {
    const errorSpan = document.createElement("span");
      let errorMsg = "";

    if (reason == "empty") errorMsg = parent.dataset.title + " cannot be empty";
    else if (reason == "invalid") errorMsg = "Looks like this is not an email"; 
  
    errorSpan.classList.add("label--error-msg");
    errorSpan.innerHTML = errorMsg;

    parent.classList.add("label--error");
    parent.appendChild(errorSpan);
  }
}