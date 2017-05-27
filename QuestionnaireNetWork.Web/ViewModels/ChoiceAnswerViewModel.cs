using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class ChoiceAnswerViewModel
    {
        public int ChoiceId { get; set; }
        public string ChoiceTitle { get; set; }
        public bool Type { get; set; }
        public List<OptionViewModel> Options { get; set; } = new List<OptionViewModel>();
        public List<string> Answers { get; set; } = new List<string>();
    }
}