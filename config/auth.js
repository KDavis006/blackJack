const ensureAuthenticated = (req, res, next) => {
 if (req.isAuthenticated()) {
  // req.isAuthenticated() will return true if user is logged in
  next();
 } else {
  req.flash('error_msg', 'You need to be logged in to do that!');
  res.redirect('/users/login');
 }
}

module.exports = {ensureAuthenticated}
// ensureAuthenticated verifies that the user is logged in by verifying their information and if they are logged in, it passes and if you are not it redirects them to the login page.