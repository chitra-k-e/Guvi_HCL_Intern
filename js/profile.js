document.addEventListener("DOMContentLoaded", () => {
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

  if (!userEmail) {
    window.location.href = "login.html";
    return;
  }

  // AJAX call to fetch user details from database using email
  $.ajax({
    url: 'php/profile.php',   // <-- make sure this matches your file name
    type: 'POST',
    data: { email: userEmail },
    dataType: 'json',
    success: function(res) {
      if (res.status === 'success') {
        const user = res.data;
        document.getElementById("username").textContent = user.username || '';
        document.getElementById("email").textContent = user.email || '';
        document.getElementById("age").textContent = user.age || '';
        document.getElementById("dob").textContent = user.dob || '';
        document.getElementById("contactno").textContent = user.contactno || '';
      } else {
        alert(res.message);
      }
    },
    error: function(xhr, status, err) {
      console.error(xhr.responseText);
      alert('Server error while fetching profile.');
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem('user');
    window.location.href = "login.html";
  });
});
