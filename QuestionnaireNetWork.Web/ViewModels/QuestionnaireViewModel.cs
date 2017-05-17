using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class QuestionnaireViewModel
    {
        public int Qid { get; set; }
        public string Title { get; set; }
        public int MaxQuestNum { get; set; }
        public string CreateTime { get; set; }
    }
}
