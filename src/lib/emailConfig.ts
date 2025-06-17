// EmailJS Configuration
// To set this up:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Public Key, Service ID, and Template ID
// 6. Replace the values below

export const emailConfig = {
  // EmailJS Public Key
  publicKey: "kRpCbdpp1IIOvTLUI",

  // EmailJS Service ID
  serviceId: "service_iciwqlq",

  // EmailJS Template ID
  templateId: "template_68rh61n",
};

// Email template variables that will be populated:
// {{to_email_1}} - adnankhalid@cedarfinancial.com
// {{to_email_2}} - zjaved@cedarfinancial.com
// {{company_name}} - Company name from form
// {{positions_needed}} - Selected positions
// {{minimum_experience}} - Experience requirement
// {{practice_type}} - Medical or Dental
// {{software_systems}} - Selected software systems
// {{custom_software}} - Custom software specification
// {{submission_date}} - Date of submission
// {{submission_time}} - Time of submission
// {{message}} - Formatted message with all details

/*
SAMPLE EMAIL TEMPLATE FOR EMAILJS:

Subject: New Staffing Request from {{company_name}}

Hello,

You have received a new staffing request:

Company: {{company_name}}
Practice Type: {{practice_type}}
Positions Needed: {{positions_needed}}
Minimum Experience: {{minimum_experience}}
Software Systems: {{software_systems}}
Custom Software: {{custom_software}}

Submitted on: {{submission_date}} at {{submission_time}}

Please follow up with this lead as soon as possible.

Best regards,
Remote Scouts Website
*/
