using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class QuestAnswerViewModel
    {
        public int QId { get; set; }
        public string Title { get; set; }
        public string CreateTime { get; set; }

        public List<ChoiceQuestionViewModel> ChoiceQuestions { get; set; }
        public List<CompletionViewModel> Completions { get; set; }
    }
}