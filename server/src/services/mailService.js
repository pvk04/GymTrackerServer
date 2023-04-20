import { createTransport } from "nodemailer";

async function sendActivationMail(to, link) {
	const transoprter = createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	transoprter.sendMail({
		from: process.env.SMTP_USER,
		to,
		subject: `Активация аккунта на сайте ${process.env.API_URL}`,
		text: "",
		html: `
			<div>
				<h1>Для активации аккаунта перейдите по <a href="${link}">ссылке</a></h1>
			</div>
		`,
	});
}

export const mailService = {
	sendActivationMail,
};
