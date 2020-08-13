using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
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

        static async Task SendMail(string name, string inquirerEmail, string inquiry, string message, string apiKey, string myEmail, string myOtherEmail)
        {
        

            SendGridClient client = new SendGridClient(apiKey);
            EmailAddress from = new EmailAddress(myOtherEmail, name);
            EmailAddress to = new EmailAddress(myEmail, "Kassab");
            string subject = inquiry;
            string plainTextContent = "";
            string htmlContent = "You got a message from --->" + inquirerEmail + "<br><br>" + inquiry + "<br><br>This is the message you got ---> <br> <strong>" + message + "</strong> <br><br>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            Response response = await client.SendEmailAsync(msg);
            HttpStatusCode statusCode = response.StatusCode;
            Console.WriteLine($"El correo manda {statusCode}");
        }

        // POST: api/Contact
        [HttpPost]
        public void Post()
        {

            string name = Request.Form["name"];
            string email = Request.Form["email"];
            string inquiry = Request.Form["inquiry"];
            string message = Request.Form["message"];
            string apiKey = _config.GetValue<string>("sendgrid_api_key");
            string myEmail = _config.GetValue<string>("user_email");
            string myOtherEmail = _config.GetValue<string>("user_email_other");

            if (name == "")
            {
                name = "Anonymous lover";
            }
            if (email != "")
            {
                MatchCollection matches = pattern.Matches(email);

                if(matches.Count == 0 || matches.Count >1)
                {
                    Console.WriteLine($"The email {email} was invalid", email);

                    email = "SecretFan69@email.com";
                }
            }
            else
            {
                email = "SecretFan69@email.com";
            }
            Console.WriteLine($"Sending email");
            SendMail(name, email, inquiry, message, apiKey, myEmail, myOtherEmail);
        }


    }
}
