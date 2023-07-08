// let email = "random4@gmail.com"
// let name = "Kanishk Singh"
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name'); 
console.log(name)// "John Doe"
const email = urlParams.get('email'); 
console.log(email)// "25"
fetch('http://localhost:4444/users')
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.email === email);

    if (user) {
      // Email address exists in the API result
      if (user.role === 'user') {
        // Redirect to user dashboard if the user has an admin role
        window.location.href = `dashboard.html?name=${encodeURIComponent(name)}`;
      } else {
        // Redirect to participant dashboard for other roles
        window.location.href = `participantDashBoard.html?name=${encodeURIComponent(name)}`;
      }
    } else {
        // Email address not found in the API result, redirect to NextPage1
        window.location.href = `addUser.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
      }
  })
  .catch(error => {
    console.error('Error retrieving users:', error);
    // Handle error and display an error message to the user
  });