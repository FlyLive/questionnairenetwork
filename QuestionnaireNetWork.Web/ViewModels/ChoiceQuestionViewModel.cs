using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class ChoiceQuestionViewModel
    {
        public int ChoiceId { get; set; }
        public int Qid { get; set; }
        public string Title { get; set; }
        public bool Type { get; set; }
    }
}
