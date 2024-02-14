const QR_PREFIX = "PAYX";
const SECRET="oceanauth";
const ROLES={
    ATTENDEE:1,
    STAFF:2,
    VENDOR:3,
    HOST:4,
    ADMIN:5,
    SUPERADMIN:6
}
const verificationtemplate = `
<head><style>
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #00002bff, #3f76ffff, #00002bff);
        /* DarkBlue to LightBlue - Change as per your preference */
        color: #fff;
        margin: 20px;
    }
    .email-container {
        background-color: #000;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .verification-code {
        background: linear-gradient(to right, #00002bff, #3f76ffff, #00002bff);
        /* SteelBlue to LightSkyBlue - Change as per your preference */
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin-bottom: 20px;
    }
</style></head><body>
<div class="email-container"><span style="color: #ffffff;"><img style="max-width: 150px; margin-bottom: 20px;"
            src="https://www.varcsoft.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.02f787d6.png&amp;w=3840&amp;q=75"
            alt="Varcsoft" /></span>
    <p><span style="color: #ffffff;">Dear<strong>{{user}}</strong>,</span></p>
    <p><span style="color: #ffffff;">Thank you for choosing Varcbytes! To ensure the security of your account, we
            require you to verify your email address.</span></p>
    <div class="verification-code">
        <p>Please use the following verification code to complete the process:</p>
        <p><strong>Verification Code:</strong> {{v_code}}</p>
        <p><em>(Note: This code is valid for 3 minutes only.)</em></p>
    </div>
    <p><span style="color: #ffffff;">To verify your email address, click on the link below and enter the code when
            prompted:</span></p>
    <p><span style="color: #ffffff;"><a
                style="color: #000; text-decoration: none; background-color: #ffffff; padding: 5px 10px; border-radius: 3px;"
                href="www.oceanauth.varcsoft.com/verification?email={{email}}">Verify Email</a></span></p>
    <p><span style="color: #ffffff;">If you did not initiate this request, please disregard this email. Your account
            security is important to us, and we recommend that you contact our support team immediately.</span></p>
    <p><span style="color: #ffffff;">Thank you for choosing Varcbytes!</span></p>
    <p><span style="color: #ffffff;"><strong>Best Regards,<br />The Support Team</strong></span></p>
    <p><span style="color: #ffffff;"><strong>VARCSOFT PVT LTD Customer Support<br />Email:
                support@varcsoft.com<br />Website: www.varcsoft.com</strong></span></p>
    <p><span style="color: #ffffff;"><em>VARCSOFT - Ensuring a Secure and Seamless Experience</em></span></p>
</div></body>
`;

export default {QR_PREFIX,SECRET,ROLES,verificationtemplate};