import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
  emailjs.init("hWxhhHBXpEgmdOPdx");
};

export const sendEmail = async (to: string, message: string, name: string, subject: string, from: string) => {
  try {
    const response = await emailjs.send(
      "service_sr38gqg",
      "template_9nh6tlt",
      {
        to_email: to,
        to_name: name,
        from_name: from,
        subject: subject,
        message: message,
        reply_to: "your-support-email@domain.com" // Replace with your support email
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};

// Note: EmailJS free plan doesn't support receiving/fetching emails
// You'll need an email service provider's API (like Gmail API) to fetch replies
export const checkEmailReplies = async () => {
  throw new Error("To view email replies, please check your email inbox directly. EmailJS free plan doesn't support fetching emails.");
};
