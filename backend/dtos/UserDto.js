export default class UserDto { // Data Transfer Object
  id;

  username;

  email;

  isActivated;

  constructor(model) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
    this.isActivated = model.is_activated;
  }
}
