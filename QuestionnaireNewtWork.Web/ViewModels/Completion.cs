using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNewtWork.Web.ViewModels
{
    public class Completion
    {
        public int CompletionId { get; set; }
        public int Qid { get; set; }
        public string Title { get; set; }
    }
}
