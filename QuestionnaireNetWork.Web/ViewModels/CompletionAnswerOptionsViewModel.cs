using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{    
    public class CompletionAnswerOptionsViewModel
    {
        public int Id { get; set; }
        public int CompletionId { get; set; }
        public string IpAddress { get; set; }
        public string AnswerContent { get; set; }
        public int AnswerId { get; set; }
    }
}
