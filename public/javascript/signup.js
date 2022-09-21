async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    const farmname = document.getElementById('farm-signup').value.trim();

    console.log(username)
    console.log(email)
    console.log(password)
    console.log(farmname)
  
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

      console.log(responseUserId)
      const userId = responseUserId.id
      console.log(userId)

      const responseFarm = await fetch('/api/farms', {
        method: 'post',
        body: JSON.stringify({
          farm_name:farmname,
          user_id: userId
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

document.querySelector('.form-container').addEventListener('submit', signupFormHandler);