using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class ChoiceQuestionViewModel
    {
        public int ChoiceId { get; set; }
        public int QId { get; set; }
        public string ChoiceTitle { get; set; }
        public bool Type { get; set; }
        public int OptionCount { get; set; }

        public int AnswerOption { get; set; }
        public List<int> AnswerOptions { get; set; }
        public List<OptionViewModel> Options { get; set; }

    }
}
