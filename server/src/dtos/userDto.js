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
		this.height = model.UserHeight;
		this.heightMeasure = model.HeightInFt;
		this.weight = model.UserWeight;
		this.weightMeasure = model.WeightInLb;
		this.distanceMeasure = model.DistanceIn;
	}
}
