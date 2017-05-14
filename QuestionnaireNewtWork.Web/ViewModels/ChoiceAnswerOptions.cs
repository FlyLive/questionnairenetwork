using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNewtWork.Web.ViewModels
{
    public class ChoiceAnswerOptions
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public int OptionId { get; set; }
    }
}
