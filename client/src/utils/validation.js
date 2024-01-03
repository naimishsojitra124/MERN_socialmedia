const validation = ({ username, name, email, password }) => {
  const err = {};

  if (!username) {
    err.username = 'Please enter username';
  } else if (username.length < 3 || username.length > 20) {
    err.username = 'Username must be between 3 and 20 characters';
  } else if (username.search(/\s/) > -1) {
    err.username = 'Username must not contain spaces';
    // eslint-disable-next-line
  } else if (username.search(/^[a-z0-9_\.]+$/) < 0) {
    err.username =
      'Username must contain only lowercase letters, numbers, underscores(_), and periods(.)';
  }

  if (!name) {
    err.name = 'Please enter name';
  } else if (name.length < 3 || name.length > 20) {
    err.name = 'Name must be between 3 and 20 characters';
  }

  if (!email) {
    err.email = 'Please enter email';
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect';
  } else if (email.length > 50) {
    err.email = 'Email must be less than 50 characters';
  } else if (email.search(/\s/) > -1) {
    err.email = 'Email must not contain spaces';
  }

  if (!password) {
    err.password = 'Please enter password';
  } else if (password.length < 6) {
    err.password = 'Password must be at least 6 characters';
  } else if (password.length > 13) {
    err.password = 'Password must be less than 13 characters';
  } else if (password.search(/\s/) > -1) {
    err.password = 'Password must not contain spaces';
  } else if (password.search(/[0-9]/) < 0) {
    err.password = 'Password must contain at least one number';
  } else if (password.search(/[a-z]/) < 0) {
    err.password = 'Password must contain at least one lowercase letter';
  } else if (password.search(/[A-Z]/) < 0) {
    err.password = 'Password must contain at least one uppercase letter';
  } else if (password.search(/[!@#$%^&*]/) < 0) {
    err.password = 'Password must contain at least one special character';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

// Validate email format
const validateEmail = (email) => {
  const re =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const changePasswordValidation = ({
  oldPassword,
  newPassword,
  confirmPassword,
}) => {
  const err = {};

  if (!oldPassword) {
    err.oldPassword = 'Please enter old password';
  }

  if (!newPassword) {
    err.newPassword = 'Please enter new password';
  } else if (newPassword.length < 6) {
    err.newPassword = 'Password must be at least 6 characters';
  } else if (newPassword.length > 13) {
    err.newPassword = 'Password must be less than 13 characters';
  } else if (newPassword.search(/\s/) > -1) {
    err.newPassword = 'Password must not contain spaces';
  } else if (newPassword.search(/[0-9]/) < 0) {
    err.newPassword = 'Password must contain at least one number';
  } else if (newPassword.search(/[a-z]/) < 0) {
    err.newPassword = 'Password must contain at least one lowercase letter';
  } else if (newPassword.search(/[A-Z]/) < 0) {
    err.newPassword = 'Password must contain at least one uppercase letter';
  } else if (newPassword.search(/[!@#$%^&*]/) < 0) {
    err.newPassword = 'Password must contain at least one special character';
  }

  if (!confirmPassword) {
    err.confirmPassword = 'Please enter confirm password';
  } else if (confirmPassword !== newPassword) {
    err.confirmPassword = 'Passwords do not match';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export { validation, changePasswordValidation };
