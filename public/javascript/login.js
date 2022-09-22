async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#user-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (username && email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    
      if (response.status == 200) {    
        var bodyEl = document.querySelector("#confirmBody");
        bodyEl.textContent = "Pass!";

        var loginBtn = document.querySelector("#btn-pass");
        var toDashboard = function () {
          document.location.replace('/dashboard');
        };
        loginBtn.addEventListener('click', toDashboard);
        // console.log(username);
        // $('#confirmModal').modal();
      } else {
        var bodyEl = document.querySelector("#confirmBody");
        bodyEl.textContent = "Failed to login. Please ensure you enter matched username, email, and password!";
      
        var loginBtn = document.querySelector("#btn-pass");
        var backtoLogin = function () {
          document.location.replace('/login');
        };
  
        loginBtn.addEventListener('click', backtoLogin);
      };
      
    };

}
   
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
