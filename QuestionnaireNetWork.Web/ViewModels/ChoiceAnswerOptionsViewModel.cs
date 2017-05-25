using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class ChoiceAnswerOptionsViewModel
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public int ChoiceId { get; set; }
        public int OptionId { get; set; }
        public string OptionTitle { get; set; }
        public int Count { get; set; }
        public int Percent { get; set; }
    }
}
