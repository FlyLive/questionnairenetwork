using QuestionnaireNetWork.Web.Extension;
using QuestionnaireNetWork.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace QuestionnaireNetWork.Web.Controllers
{
    public class AdminController : ApiController
    {
        [System.Web.Mvc.Authorize]
        [System.Web.Mvc.HttpGet]
        public AdminViewModel GetAdminInfo()
        {
            //string auth = Request.Headers.Authorization.ToString();
            //var account = AdminExtension.GetEmployeeUserObject(auth).Account;
            //var nick = AdminExtension.GetEmployeeUserObject(auth).NickName;
            AdminViewModel admin = new AdminViewModel()
            {
                //Account = account,
                //NickName = nick
            };
            return admin;
        }
    }
}