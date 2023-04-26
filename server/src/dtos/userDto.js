export class UserDto {
	id;
	nickname;
	email;
	emailActivated;

	constructor(model) {
		this.id = model.UserId;
		this.nickname = model.UserNickname;
		this.email = model.UserEmail;
		this.emailActivated = model.UserEmailActivated;
	}
}
