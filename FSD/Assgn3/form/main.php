<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Validation Example</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1>Form Validation Example</h1>
  <div class="form-container">
    <form id="myForm" method="POST" action="formValidation.php">
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" required>
      <br>

      <label for="pwd">Password:</label>
      <input type="password" id="pwd" name="pwd" required>
      <button id="show-pwd">Show password</button>
      <div id="show">
        <small id="lower" class="invalid">Lowercase</small>
        <small id="upper" class="invalid">Uppercase</small>
        <small id="num" class="invalid">Number</small>
        <small id="min" class="invalid">Minimum length 8</small>
      </div>
      <br>

      <label for="confirm-pwd">Confirm Password:</label>
      <input type="password" id="confirm-pwd" name="confirm-pwd" required>
      <small id="show-confirm-pwd" class="no-match">Not matching</small>
      <br>

      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <br>

      <label for="age">Age:</label>
      <input type="number" id="age" name="age" required>
      <br>

      <label for="gender">Gender:</label>
      <select name="gender" id="gender-select">
        <option value="select-gender" disbaled selected>Select your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br>

      <label for="state">State:</label>
      <select name="state" id="state-select">
      </select>
      <br>

      <label for="city">City:</label>
      <select name="city" id="city-select">
        <option value="select-city" disbaled selected>Select state first</option>
      </select>
      <br>

      <label for="phone">Phone Number:<br><small>Enter 10 digits</small><br></label>
      <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>
      <br>

      <label for="zipcode">Zip Code:</small><br></label>
      <input type="text" inputmode="numeric" id="zip" name="zip" required>
      <br>

      <center>
        <button id="submit">Submit</button>
      </center>
    </form>
  </div>
  <div id="result"></div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="script.js"></script>
</body>

</html>
