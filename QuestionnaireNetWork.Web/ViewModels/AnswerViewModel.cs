using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public partial class AnswerViewModel
    {
        public int AnswerId { get; set; }
        public string IpAddress { get; set; }
        public string CreateTime { get; set; }
        public List<ChoiceAnswerViewModel> ChoicesAnswer { get; set; }
        public List<CompletionAnswerOptionsViewModel> CompletionsAnswer { get; set; }
    }
}
