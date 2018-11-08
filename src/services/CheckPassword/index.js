class CheckPassword {

  isPasswordOK(password, confirmPassword) {
    let passwordMatch = password === confirmPassword;
    let emptyFields = !(password && confirmPassword);

    return ({
      passwordMatch,
      emptyFields
    })
  }
}

export default CheckPassword;
