export function matchingPasswords(password, confirmPassword) {
  return (password === confirmPassword);
}

export function isEmpty(password, confirmPassword) {
  return !(password && confirmPassword);
}
