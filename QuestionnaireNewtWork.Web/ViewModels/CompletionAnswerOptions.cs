using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNewtWork.Web.ViewModels
{    
    public class CompletionAnswerOptions
    {
        public int Id { get; set; }
        public int CompletionId { get; set; }
        public string AnswerContent { get; set; }
        public int AnswerId { get; set; }
    }
}
