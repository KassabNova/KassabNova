using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KassabNova.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        // GET: api/Contact
        [HttpGet]
        public IEnumerable<string> Get(int id)
        {
            //name=qwer&email=asdf&inquiry=About+a+new+project
            return new string[] { $"ID:{id.ToString()}", "value2" };
        }

        // GET: api/Contact/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            //name=qwer&email=asdf&inquiry=About+a+new+project
            return "value";
        }

        // POST: api/Contact
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
