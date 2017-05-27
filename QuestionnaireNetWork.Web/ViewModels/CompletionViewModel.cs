using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class CompletionViewModel
    {
        public int CompletionId { get; set; }
        public int QId { get; set; }
        public string Title { get; set; }

        public string Answer { get; set; }
    }
}
