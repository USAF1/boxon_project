using boxon_project.Interfaces;
using boxon_project.Models;
using boxon_project.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace boxon_project.Controllers
{
    public class HomeController : Controller
    {

        public readonly IArticelService ArticleService;

        public HomeController(IArticelService _articelService)
        {
            ArticleService = _articelService;

        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult<ResponseModel>> AddArticle([FromBody] List<ArticleModel> model)
        {
            ResponseModel response = await ArticleService.AddArticle(model);

            if (response.Status == 200)
            {
                // Redirect to the Index action
                return new RedirectToActionResult("Index", "Home", null);
            }
            else
            {
                // Return the response object with the error message
                return response;
            }
        }
    }
}
