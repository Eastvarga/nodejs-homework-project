
const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')

const createTemplate = ({ verifyToken, email }) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
    // Appears in header & footer of e-mails
      name: 'System Contacts',
      link: 'http://localhost:8083/'
    }
  })
  const emailTemplate = {
    body: {
      name: email,
      intro: 'Welcome to System Contacts! We\'re very excited to have you on board.',
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:8083/api/contacts/users/verify/${verifyToken}`
        }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  }
  const emailBody = mailGenerator.generate(emailTemplate)
  return emailBody
}

const sendEmail = async ({ verifyToken, email }) => {
  const emailBody = createTemplate({ verifyToken, email })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email, // Change to your recipient
    from: process.env.SENDER_EMAIL_FROM, // 'alexsergspectr@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    html: emailBody,
  }
  await sgMail.send(msg)
}

module.exports = sendEmail
