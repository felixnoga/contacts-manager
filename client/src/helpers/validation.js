const Validator = {
  password: (password) => {
    let regexp = new RegExp(/^(?=[A-Z])(?=.{6,})/, 'g');
    return regexp.test(password);
  },
  name: (name) => {
    const regex = new RegExp(/^[a-z0-9áéíóúÁÉÍÓÚÑñ]{2,}/, 'i');
    return regex.test(name.trim());
  },
  email: (email) => {
    let processed = email.trim().toLowerCase();
    let regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regex.test(processed);
  },
  password2: (p1, p2) => p1 === p2
};
export default Validator;
