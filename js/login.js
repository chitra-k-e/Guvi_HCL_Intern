document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const loginError = document.getElementById("loginError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";

    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { 
      emailError.textContent = "Valid email required"; 
      isValid = false; 
    }
    if (password.value.trim() === '') { 
      passwordError.textContent = "Password required"; 
      isValid = false; 
    }
    if (!isValid) return;

    $.ajax({
      url: 'php/login.php',
      type: 'POST',
      data: { email: email.value.trim(), password: password.value },
      dataType: 'json',
      success: function(res) {
        if (res.status === 'success') {
          // Store user details in localStorage
          localStorage.setItem('user', JSON.stringify(res.data));
          setTimeout(() => {
            window.location.href = 'profile.html';
          }, 200);
        } else {
          loginError.textContent = res.message;
        }
      },
      error: function() {
        loginError.textContent = 'Server error, please try again.';
      }
    });
  });
});
