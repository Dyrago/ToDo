using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DateController : BaseAPIController
    {
        [HttpGet]
        public string Index()
        {
            return DateTime.Now.ToString("yyyy-MM-dd");
        }
    }
}
