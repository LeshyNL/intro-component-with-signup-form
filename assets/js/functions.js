/* JavaScript for Intro Component with Signup Form from Frontend Mentor */

// Attach event handler to Submit button
const submit = document.getElementById("btn-submit");
submit.addEventListener("click", function(event){
  event.preventDefault();
  checkInput();
});

// Function to validate email address (regex grabbed from emailregex.com)
function isEmail(address){
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(String(address).toLowerCase());
}

// Function to validate inputs
function checkInput(){
    let errors = false;
  const allFields = document.getElementsByClassName("input");
  for (const field of allFields){
    field.parentElement.classList.remove("label--error");                          // Clear any previous error states and messages
    if (field.nextSibling) field.parentNode.removeChild(field.nextSibling);
    if (!field.value) {                                                            // Check for empty fields
      setState("error", field, "empty");
      errors = true;
    }
  }
  const emailField = document.getElementsByClassName("input-email")[0];            // Check for valid email address
  if (!emailField.nextSibling && !isEmail(emailField.value)) {
    setState("error", emailField, "invalid");
    errors = true;
  }
  if (!errors) {                                                                   // Empty input fields on valid submission
    for (const field of allFields){
      field.value = "";
    }
  }
}

// Function to set error state
function setState(state, element, reason){
  const parent = element.parentElement;
  if (state == "error") {
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