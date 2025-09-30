
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  const username = document.getElementById("username");
  const age = document.getElementById("age");
  const dob = document.getElementById("dob");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const contactno = document.getElementById("contactno");

  const usernameError = document.getElementById("usernameError");
  const ageError = document.getElementById("ageError");
  const dobError = document.getElementById("dobError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const contactnoError = document.getElementById("contactnoError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    [usernameError, ageError, dobError, emailError, passwordError, contactnoError].forEach(err => err.textContent = "");

    if (username.value.trim() === "") {
      usernameError.textContent = "Username is required.";
      isValid = false;
    } else if (username.value.length < 3) {
      usernameError.textContent = "Username must be at least 3 characters.";
      isValid = false;
    }

    if (age.value.trim() === "") {
      ageError.textContent = "Age is required.";
      isValid = false;
    } else if (age.value < 10 || age.value > 120) {
      ageError.textContent = "Age must be between 1 and 120.";
      isValid = false;
    }

    if (dob.value.trim() === "") {
      dobError.textContent = "Date of Birth is required.";
      isValid = false;
    } else {
      const today = new Date();
      const enteredDate = new Date(dob.value);
      if (enteredDate > today) {
        dobError.textContent = "Date of Birth cannot be in the future.";
        isValid = false;
      }
    }

    if (email.value.trim() === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email.value)) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
      }
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!passwordPattern.test(password.value)) {
        passwordError.textContent = "Password must include at least one lowercase, uppercase, number, and special character(greater than 6 character).";
        isValid = false;
      }
    }

    if (contactno.value.trim() === "") {
      contactnoError.textContent = "Contact number is required.";
      isValid = false;
    } else {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(contactno.value)) {
        contactnoError.textContent = "Enter a valid 10-digit contact number.";
        isValid = false;
      }
    }

     $.ajax({
      url: 'php/register.php',
      type: 'POST',
      data: { 
        username: username.value,
        age: age.value,
        dob: dob.value,
        email: email.value,
        password: password.value,
        contactno: contactno.value
      },
      success: function(response) {
        let res;
        try { res = typeof response === "string" ? JSON.parse(response) : response; } 
        catch(e) { alert("Invalid response from server: " + response); return; }

        if (res.status === 'success') {
          $('#registerForm')[0].reset(); 
          alert(res.message); 
          setTimeout(() => {
            window.location.href = 'login.html'; 
          }, 10);
        } else {
          alert(res.message);
        }
      },
      error: function(xhr, status, error) {
        alert('AJAX error: ' + error);
      }
    });
  });
});
