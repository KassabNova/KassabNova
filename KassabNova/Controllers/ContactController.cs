using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;

namespace KassabNova.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        public readonly IConfiguration _config;
        // Console.WriteLine(name);
        public Regex pattern = new Regex(@"^((\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)\s*[,]{0,1}\s*)+$");

        public ContactController(IConfiguration config)
        {
            _config = config;
        }

        static async Task SendMail(string name, string inquirerEmail, string inquiry, string message, string apiKey, string myEmail, string fromEmail)
        {
        

            SendGridClient client = new SendGridClient(apiKey);
            EmailAddress from = new EmailAddress(fromEmail, name);
            EmailAddress to = new EmailAddress(myEmail, "Kassab");
            string subject = inquiry;
            string plainTextContent = "";
            string htmlContent = "You got a message from --->" + inquirerEmail + "<br><br>" + inquiry + "<br><br>This is the message you got ---> <br> <strong>" + message + "</strong> <br><br>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            Console.WriteLine($"El correo a mandar: {htmlContent}");

            Response response = await client.SendEmailAsync(msg);
            HttpStatusCode statusCode = response.StatusCode;
            Console.WriteLine($"Sendgrid responds: {statusCode}");
        }

        // POST: api/Contact
        [HttpPost]
        public void Post()
        {

            string name = Request.Form["name"];
            string inquirerEmail = Request.Form["email"];
            string inquiry = Request.Form["inquiry"];
            string message = Request.Form["message"];
            string apiKey = _config.GetValue<string>("sendgrid_api_key");
            string myEmail = _config.GetValue<string>("to_email");
            string fromEmail = _config.GetValue<string>("from_email");

            if (name == "")
            {
                name = "Anonymous lover";
            }
            if (inquirerEmail != "")
            {
                MatchCollection matches = pattern.Matches(inquirerEmail);

                if(matches.Count == 0 || matches.Count >1)
                {
                    Console.WriteLine($"The email {inquirerEmail} was invalid", inquirerEmail);

                    inquirerEmail = "SecretFan69@email.com";
                }
            }
            else
            {
                inquirerEmail = "SecretFan69@email.com";
            }
            Console.WriteLine($"Sending email");
            _ = SendMail(name, inquirerEmail, inquiry, message, apiKey, myEmail, fromEmail);
        }


    }
}
