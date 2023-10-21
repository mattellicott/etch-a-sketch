const logoContainer = document.getElementById("logoContainer");
const telInput = document.getElementById("phoneNumber");
const passInput = document.getElementById("password");
const passConfirmInput = document.getElementById("passwordConfirm");
const submitBtn = document.getElementById("submitBtn");

window.onload = () => {
  showLogoContainer();
};

submitBtn.onclick = (e) => {
  if (invalidTel()) {
    e.preventDefault();
    alert("You must enter a number for your phone number. Please re-enter.");
  }

  if (invalidPasswords()) {
    e.preventDefault();
    alert("Your passwords do not match. Please re-enter.");
  }
};

function invalidTel() {
  return isNaN(Number(telInput.value));
}

function invalidPasswords() {
  return passInput.value !== passConfirmInput.value;
}

function showLogoContainer() {
  let intervalID = setInterval(() => {
    const opacity = logoContainer.style.opacity;
    if (opacity < "1")
      logoContainer.style.opacity = `${Number(opacity) + 0.01}`;
    else clearInterval(intervalID);
  }, 50);
}
