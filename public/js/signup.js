$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var user = $("input#user-input");
  var firstName =$("#firstname-input");
  var LastName =$("#lastname-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      first: firstName.val().trim(),
      last: LastName.val().trim(),
      user: user.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.user, userData.first, userData.last);
    emailInput.val("");
    passwordInput.val("");
    user.val("");
    firstName.val("");
    LastName.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, user, first, last) {
    $.post("/api/signup", {
  // Database name : input from website
      firstName: first,
      lastName: last,
      userName: user,
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
