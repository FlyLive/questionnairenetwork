using QuestionnaireNetWork.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Threading.Tasks;
using System.Web.Script.Serialization;


namespace QuestionnaireNetWork.Web.Extension
{
    public static class AdminExtension
    {
        public static string GetJson(this String auth)
        {
            var auths = auth.Split('.');
            byte[] bytes = Jose.Base64Url.Decode(auths[1]);

            Console.WriteLine(bytes.Length);
            var json = Encoding.UTF8.GetString(bytes);
            return json;
        }
        public static AdminViewModel GetEmployeeUserObject(string auth)
        {
            var adminJson = GetJson(auth);
            return JsonStringToObj<AdminViewModel>(adminJson);
        }
        private static ObjType JsonStringToObj<ObjType>(string JsonString) where ObjType : class
        {
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            ObjType s = jsonSerializer.Deserialize<ObjType>(JsonString);
            return s;
        }
    }
}