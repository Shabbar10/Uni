const form = document.getElementById('myForm');
// form.reset();

const email = document.getElementById('email');

const pwd = document.getElementById('pwd');
const lower = document.getElementById('lower');
const upper = document.getElementById('upper');
const num = document.getElementById('num');
const min = document.getElementById('min');
const show = document.getElementById('show');
const showPwd = document.getElementById('show-pwd');

const age = document.getElementById('age');
const phone = document.getElementById('phone');
const zip = document.getElementById('zip');

const submit = document.getElementById('submit');

const stateSelect = document.getElementById('state-select');
const citySelect = document.getElementById('city-select');

pwd.onfocus = function() {
  show.style.display = "block";
}

pwd.onblur = function() {
  show.style.display = "none";
}

pwd.onkeyup = function() {
  const val = pwd.value;
  const lowercase = /[a-z]/g;
  if (val.match(lowercase)) {
    lower.classList.remove('invalid');
    lower.classList.add('valid');
  } else {
    lower.classList.add('invalid');
    lower.classList.remove('valid');
  }

  const upperCase = /[A-Z]/g;
  if (val.match(upperCase)) {
    upper.classList.remove('invalid');
    upper.classList.add('valid');
  } else {
    upper.classList.add('invalid');
    upper.classList.remove('valid');
  }

  const numCheck = /[0-9]/g;
  if (val.match(numCheck)) {
    num.classList.remove('invalid');
    num.classList.add('valid');
  } else {
    num.classList.add('invalid');
    num.classList.remove('valid');
  }

  if (val.length >= 8) {
    min.classList.remove('invalid');
    min.classList.add('valid');
  } else {
    min.classList.add('invalid');
    min.classList.remove('valid');
  }
}

// Buttons within forms automatically submit it for some reason
showPwd.addEventListener('click', (event) => {
  event.preventDefault();
})

showPwd.onclick = function() {
  if (pwd.getAttribute('type') == 'password') {
    pwd.setAttribute('type', 'text');
    showPwd.innerText = 'Hide Password';
    pwd.focus();
  } else {
    pwd.setAttribute('type', 'password');
    showPwd.innerText = 'Show Password';
    pwd.focus();
  }
}

submit.onclick = function() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email.value)) {
    console.log("Passed");
  } else {
    alert("Enter valid email");
    return;
  }


  if (age.value < 18 || age.value > 100) {
    alert("Enter valid age");
    return;
  }

  const zipCodeCheck = /[0-9]{6}/g;

  if (!zipCodeCheck.test(zip.value)) {
    alert("Enter valid zip code");
    return;
  }
}

const stateCity = {
  "Select state": ["Select state first"],
  "Maharashtra": ["Mumbai", "Pune", 'Nashik'],
  "Gujrat": ["Ahmedabad", "Surat"],
  "Uttar": ["Kanpur", "Lucknow"],
  "APradesh": ["Guntur", "Nellore"],
  "Kerala": ["Kochi", "Kollam"],
}

for (let x in stateCity) {
  stateSelect.options[stateSelect.options.length] = new Option(x, x);
}

stateSelect.onchange = function() {
  // Clear the select list since each state has a different number of cities
  for (a in citySelect.options) {
    citySelect.options.remove(0);
  }

  const y = stateCity[this.value];

  for (i = 0; i < y.length; i++) {
    citySelect.options[citySelect.options.length] = new Option(y[i], y[i]);
  }
}
