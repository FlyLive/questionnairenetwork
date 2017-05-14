using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNewtWork.Web.ViewModels
{
    public class ChoiceQuestion
    {
        public int QuestionId { get; set; }
        public int Qid { get; set; }
        public string Title { get; set; }
        public bool Type { get; set; }
    }
}
