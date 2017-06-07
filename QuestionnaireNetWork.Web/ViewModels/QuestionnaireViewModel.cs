using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public class QuestionnaireViewModel
    {
        public int QId { get; set; }
        public string QuestTitle { get; set; }
        public int MaxQuestNum { get; set; }
        public int CurrentQuestNum { get; set; }
        public string CreateTime { get; set; }
        public int UserNum { get; set; }

        public List<ChoiceQuestionViewModel> ChoiceQuestions { get; set; }
        public List<CompletionViewModel> Completions { get; set; }
    }
}
