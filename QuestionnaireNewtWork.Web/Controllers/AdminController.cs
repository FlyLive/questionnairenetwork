using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuestionnaireNewtWork.Web.Controllers
{
    public class AdminController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return RedirectToAction("Index","Home");
        }

        [HttpGet]
        public ActionResult AdminCenter()
        {
            return View();
        }
    }
}