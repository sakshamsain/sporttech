import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'sportech272@gmail.com', 
        pass: 'ojebljhsbcirelfs', 
    },
});

export default transporter;