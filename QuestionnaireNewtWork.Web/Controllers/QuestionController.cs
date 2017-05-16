using QuestionnaireNetWork.Service.DataBase;
using QuestionnaireNetWork.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuestionnaireNewtWork.Web.Controllers
{
    public class QuestionController : ApiController
    {
        private QuestionnaireService _questService = new QuestionnaireService();

        #region 选择题选项
        [HttpGet]
        public Option GetOptionById(int id)
        {
            Option option = _questService.GetOptionById(id);
            return option;
        }

        [HttpGet]
        public List<Option> GetAllOptionByCQId(int cqId)
        {
            List<Option> options = _questService.GetAllOptionByCQId(cqId).ToList();
            return options;
        }

        [HttpPost]
        public bool CreateOption(int choiceId, string content)
        {
            var result = _questService.CreateOption(choiceId, content);
            return result;
        }

        [HttpPost]
        public bool ModifyOption(int id, string content)
        {
            var result = _questService.ModifyOption(id, content);
            return result;
        }

        [HttpPost]
        public bool DeletOption(int id)
        {
            var result = _questService.DeletOption(id);
            return result;
        }
        #endregion

        #region 选择题
        [HttpGet]
        public bool CreateChoiceQuestion(int questId, string title, bool type)
        {
            var result = _questService.CreateChoiceQuestion(questId, title, type);
            return result;
        }

        [HttpPost]
        public bool ModifyChoiceQuestion(int id, string title, bool type)
        {
            var result = _questService.ModifyChoiceQuestion(id, title, type);
            return result;
        }

        [HttpGet]
        public ChoiceQuestion GetChoiceQuestion(int id)
        {
            var question = _questService.GetChoiceQuestionById(id);
            return question;
        }

        [HttpDelete]
        public bool DeleteChoiceQuestion(int id)
        {
            var result = _questService.DeletChoiceQuestion(id);
            return result;
        }

        [HttpGet]
        public List<ChoiceQuestion> GetAllChoiceQuestion(int questId)
        {
            var questions = _questService.GetAllChoiceQuestion(questId);
            return questions;
        }
        #endregion

        #region 简答题
        [HttpPost]
        public bool CreateCompletion(int questId, string title)
        {
            var result = _questService.CreateCompletion(questId, title);
            return result;
        }

        public bool ModifyCompletion(int id, string title)
        {
            var result = _questService.ModifyCompletion(id, title);
            return result;
        }

        [HttpDelete]
        public bool DeleteCompletion(int id)
        {
            var result = _questService.DeletCompletion(id);
            return result;
        }

        [HttpGet]
        public Completion GetCompletion(int id)
        {
            var completion = _questService.GetCompletionById(id);
            return completion;
        }

        [HttpGet]
        public List<Completion> GetAllCompletion(int questId)
        {
            var completions = _questService.GetAllCompletion(questId);
            return completions;
        }
        #endregion
    }
}