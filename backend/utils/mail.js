import mailjet from 'node-mailjet';
import dotenv from 'dotenv'
dotenv.config()
import { template } from './template.js'

const mailjetconn = mailjet.connect(process.env.MAILJET_USERNAME, process.env.MAILJET_PASSWORD);

export const mail = async (name, email) => {
    try {
        const request = await mailjetconn.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    "From": {
                        "Email": process.env.SENDER_EMAIL,
                        "Name": "KHIDKI"
                    },
                    "To": [
                        {
                            "Email": `${email}`,
                            "Name": `${name}`
                        }
                    ],
                    "Subject": "Khidki Registration Successfull ",
                    "TextPart": `Welcome User ${name}`,
                    "HTMLPart": template(name),
                    "CustomID": "AppGettingStartedTest"
                },
            ],
        });
        return { msg: "Email sent", status: true, data: request };
    } catch (e) {
        console.log(e)
        console.log(e.message);
        return {
            msg: e.message,
            status: false,
        };
    }
};

