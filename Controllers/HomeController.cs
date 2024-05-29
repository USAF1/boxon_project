using boxon_project.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace boxon_project.Controllers
{
    public class HomeController : Controller
    {

        public HomeController()
        {
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
