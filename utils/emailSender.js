const nodemailer = require("nodemailer");
const { config } = require("../config");

// SMTP:
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "krishnashivila@gmail.com",
		pass: "shtrzhwdzlpczbbd",
	},
});

const sendOTPByEmail = async (email, otp) => {
	const mailOptions = {
		from: "krishnashivila@gmail.com",
		to: email,
		subject: "OTP for Registration",
		html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              margin: 0;
            }
            .container {
              background-color: white;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>OTP for Registration</h1>
            <p>Your OTP is: <strong>${otp}</strong></p>
          </div>
        </body>
      </html>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("OTP email sent successfully");
	} catch (error) {
		console.error("Error sending OTP email:", error);
	}
};

module.exports = { sendOTPByEmail };
