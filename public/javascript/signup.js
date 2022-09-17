async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const farmname = document.querySelector('#farm-signup').value.trim();
  
    if (username && email && password && farmname) {
      const responseUser = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const responseUserId = await fetch(`/api/users/${username}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      });

      const userId = JSON.parse(responseUserId).id
      console.log(userId)

      const responseFarm = await fetch('/api/farms', {
        method: 'post',
        body: JSON.stringify({
          farmname,
          userId
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (responseUser.ok && responseFarm.ok ) {
        document.location.replace('/dashboard');
      } else {
        alert(responseUser.statusText);
      }
    }
  }

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);