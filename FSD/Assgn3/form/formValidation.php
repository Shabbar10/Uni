<?php

$errors = [];

// Validate email
if (empty($_POST['email'])) {
  $errors['email'] = "Email is required.";
} elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = "Invalid email format.";
}

// Validate password
if (empty($_POST['pwd'])) {
  $errors['pwd'] = "Password is required.";
} else {
  $password = $_POST['pwd'];
  if (strlen($password) < 8) {
    $errors['pwd'] = "Password must be at least 8 characters.";
  }
  if (!preg_match('/[a-z]/', $password)) {
    $errors['pwd'] = "Password must include at least one lowercase letter.";
  }
  if (!preg_match('/[A-Z]/', $password)) {
    $errors['pwd'] = "Password must include at least one uppercase letter.";
  }
  if (!preg_match('/[0-9]/', $password)) {
    $errors['pwd'] = "Password must include at least one number.";
  }
}

// Validate confirm password
if (empty($_POST['confirm-pwd'])) {
  $errors['confirm-pwd'] = "Please confirm your password.";
} elseif ($_POST['pwd'] !== $_POST['confirm-pwd']) {
  $errors['confirm-pwd'] = "Passwords do not match.";
}

// Validate name
if (empty($_POST['name'])) {
  $errors['name'] = "Name is required.";
}

// Validate age
if (empty($_POST['age'])) {
  $errors['age'] = "Age is required.";
} elseif (!is_numeric($_POST['age']) || $_POST['age'] < 1) {
  $errors['age'] = "Invalid age.";
}

// Validate gender
if ($_POST['gender'] === "select-gender") {
  $errors['gender'] = "Please select your gender.";
}

// Validate state
if (empty($_POST['state']) || $_POST['state'] === "select-state") {
  $errors['state'] = "Please select your state.";
}

// Validate city
if (empty($_POST['city']) || $_POST['city'] === "select-city") {
  $errors['city'] = "Please select your city.";
}

// Validate phone number
if (empty($_POST['phone'])) {
  $errors['phone'] = "Phone number is required.";
} elseif (!preg_match('/^[0-9]{10}$/', $_POST['phone'])) {
  $errors['phone'] = "Phone number must be 10 digits.";
}

// Validate zip code
if (empty($_POST['zip'])) {
  $errors['zip'] = "Zip code is required.";
} elseif (!preg_match('/^[0-9]{6}$/', $_POST['zip'])) {
  $errors['zip'] = "Invalid zip code.";
}

// If there are errors, display them
if (!empty($errors)) {
  foreach ($errors as $field => $error) {
    echo "<p>Error in $field: $error</p>";
  }
} else {
  // Process the data if no errors
  echo "<p>Form submitted successfully!</p>";
  // Here you can proceed to save the data in a database or perform other actions
}
