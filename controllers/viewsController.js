exports.getLoginForm = (req, res) => {
  if (req.cookies.jwt != 'loggedout' && req.cookies.jwt) {
    res.redirect('/profile');
    return;
  }
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
exports.getSignUpForm = (req, res) => {
  if (req.cookies.jwt && req.cookies.jwt != 'loggedout') {
    res.redirect('/profile');
    return;
  }
  res.status(200).render('signup');
};

exports.home = (req, res) => {
  if (req.cookies.jwt != 'loggedout' && req.cookies.jwt) {
    res.redirect('/profile');
    return;
  }
  res.status(200).render('home');
};

exports.profile = (req, res) => {
  res.status(200).render('profile', {
    name: req.user.name,
    email: req.user.email,
    about: req.user.about,
    photo: req.user.photo,
  });
};
