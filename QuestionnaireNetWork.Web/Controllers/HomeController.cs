﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuestionnaireNetWork.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminCenter()
        {
            return View();
        }

        public ActionResult Questionnaire()
        {
            return View();
        }
    }
}
