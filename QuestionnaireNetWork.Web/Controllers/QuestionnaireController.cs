using QuestionnaireNetWork.Service.DataBase;
using QuestionnaireNetWork.Service.Services;
using QuestionnaireNetWork.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace QuestionnaireNetWork.Web.Controllers
{
    public class QuestionnaireController : ApiController
    {
        private QuestionnaireService _questService = new QuestionnaireService();
        private QuestionnaireAnswerService _questAnswerService = new QuestionnaireAnswerService();

        public string Options()
        {
            return null; // HTTP 200 response with empty body
        }

        [System.Web.Mvc.HttpPost]
        public bool SubmitAnswer([FromBody]QuestAnswerViewModel answer)
        {
            try
            {
                int answerId = _questAnswerService.CreateAnswer(GetClientIP(), answer.QId);
                foreach (var com in answer.Completions)
                {
                    _questAnswerService.CreateCompletionAnswer(answerId, com.Answer, com.CompletionId);
                }
                foreach (var cho in answer.ChoiceQuestions)
                {
                    if (cho.Type == true)
                    {
                        _questAnswerService.CreateCheckAnswer(answerId, cho.ChoiceId, cho.AnswerOptions);
                    }
                    else
                    {
                        _questAnswerService.CreateRadioAnswer(answerId, cho.ChoiceId, cho.AnswerOption);
                    }
                }
                return true;
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
        }

        [System.Web.Mvc.HttpGet]
        public List<QuestionnaireViewModel> GetTop5Quest()
        {
            List<Questionnaire> quests = _questService.GetTop5Quest();
            var questsVM = new List<QuestionnaireViewModel>();
            quests.ForEach(q => questsVM.Add(DataQuestToVM(q)));
            return questsVM;
        }

        [HttpGet]
        public List<QuestionnaireViewModel> Search(string search)
        {
            List<Questionnaire> quests = _questService.Search(search);
            var questsVM = new List<QuestionnaireViewModel>();
            quests.ForEach(q => questsVM.Add(DataQuestToVM(q)));
            return questsVM;
        }

        [System.Web.Mvc.HttpGet]
        public List<QuestionnaireViewModel> GetAllQuest()
        {
            List<Questionnaire> quests = _questService.GetAllQuest();
            var questsVM = new List<QuestionnaireViewModel>();
            quests.ForEach(q => questsVM.Add(DataQuestToVM(q)));
            return questsVM;
        }

        [System.Web.Mvc.HttpGet]
        public QuestionnaireViewModel GetQuest(int id)
        {
            Questionnaire quest = _questService.GetQuestByQuestId(id);
            var questVM = DataQuestToVM(quest);
            return questVM;
        }

        [Authorize]
        [System.Web.Mvc.HttpGet]
        public int GetQuestNum(int id)
        {
            var count = _questService.GetQuestNumByQuestId(id);
            return count;
        }

        [Authorize]
        [System.Web.Mvc.HttpPost]
        public bool CreateQuest([FromBody]QuestionnaireViewModel quest)
        {
            var result = _questService.CreateQuest(quest.QuestTitle, quest.MaxQuestNum);
            return result;
        }

        [Authorize]
        [System.Web.Mvc.HttpPost]
        public bool ModifyQuest([FromBody]QuestionnaireViewModel quest)
        {
            var result = _questService.ModifyQuest(quest.QId, quest.QuestTitle, quest.MaxQuestNum);
            return result;
        }

        [Authorize]
        [HttpGet]
        public bool DeleteQuest(int qId)
        {
            var result = _questService.DeletQuest(qId);
            return result;
        }

        private static string GetClientIP()
        {
            HttpRequest request = HttpContext.Current.Request;
            string userIP = request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(userIP))
            {
                userIP = request.ServerVariables["REMOTE_ADDR"];
            }
            if (string.IsNullOrEmpty(userIP))
            {
                userIP = request.UserHostAddress;
            }
            if (userIP == null || userIP == "")
                userIP = request.UserHostAddress;
            return userIP;
        }


        public static QuestionnaireViewModel DataQuestToVM(Questionnaire quest)
        {
            QuestionnaireViewModel questVM = new QuestionnaireViewModel
            {
                QId = quest.QId,
                QuestTitle = quest.Title,
                MaxQuestNum = quest.MaxQuestNum,
                CurrentQuestNum = quest.CurrentQuestNum,
                UserNum = quest.Answer.Count,
                CreateTime = quest.CreateTime.ToString("yyyy/MM/dd"),
                ChoiceQuestions = new List<ChoiceQuestionViewModel>(),
                Completions = new List<CompletionViewModel>()
            };
            quest.ChoiceQuestion.ToList().ForEach(c => questVM.ChoiceQuestions.Add(QuestionController.DataChoiceToVM(c)));
            quest.Completion.ToList().ForEach(c => questVM.Completions.Add(QuestionController.DataCompletionToVM(c)));
            return questVM;
        }
    }
}