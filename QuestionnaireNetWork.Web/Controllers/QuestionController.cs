using QuestionnaireNetWork.Service.DataBase;
using QuestionnaireNetWork.Service.Services;
using QuestionnaireNetWork.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuestionnaireNetWork.Web.Controllers
{
    public class QuestionController : ApiController
    {
        private QuestionnaireService _questService = new QuestionnaireService();

        #region 选择题选项
        [Authorize]
        [HttpGet]
        public OptionViewModel GetOptionById(int id)
        {
            Option option = _questService.GetOptionById(id);
            OptionViewModel optionVM = DataOptionToVM(option);
            return optionVM;
        }

        [Authorize]
        [HttpGet]
        public List<OptionViewModel> GetAllOptionByCQId(int cqId)
        {
            List<Option> options = _questService.GetAllOptionByCQId(cqId).ToList();
            List<OptionViewModel> optionsVM = new List<OptionViewModel>();
            options.ForEach(o => optionsVM.Add(DataOptionToVM(o)));
            return optionsVM;
        }

        [Authorize]
        [HttpPost]
        public bool CreateOption(int choiceId, string content)
        {
            var result = _questService.CreateOption(choiceId, content);
            return result;
        }

        [Authorize]
        [HttpPost]
        public bool ModifyOption(int id, string content)
        {
            var result = _questService.ModifyOption(id, content);
            return result;
        }

        [Authorize]
        [HttpPost]
        public bool DeletOption(int id)
        {
            var result = _questService.DeletOption(id);
            return result;
        }
        #endregion

        #region 选择题
        [Authorize]
        [HttpGet]
        public bool CreateChoiceQuestion(int questId, string title, bool type)
        {
            var result = _questService.CreateChoiceQuestion(questId, title, type);
            return result;
        }

        [Authorize]
        [HttpPost]
        public bool ModifyChoiceQuestion(int id, string title, bool type)
        {
            var result = _questService.ModifyChoiceQuestion(id, title, type);
            return result;
        }

        [Authorize]
        [HttpGet]
        public ChoiceQuestionViewModel GetChoiceQuestion(int id)
        {
            ChoiceQuestion question = _questService.GetChoiceQuestionById(id);
            ChoiceQuestionViewModel questionVM = DataChoiceToVM(question);
            return questionVM;
        }

        [Authorize]
        [HttpDelete]
        public bool DeleteChoiceQuestion(int id)
        {
            var result = _questService.DeletChoiceQuestion(id);
            return result;
        }

        [Authorize]
        [HttpGet]
        public List<ChoiceQuestionViewModel> GetAllChoiceQuestion(int questId)
        {
            List<ChoiceQuestion> questions = _questService.GetAllChoiceQuestion(questId);
            var questionsVM = new List<ChoiceQuestionViewModel>();
            questions.ForEach(q => questionsVM.Add(DataChoiceToVM(q)));
            return questionsVM;
        }
        #endregion

        #region 简答题
        [Authorize]
        [HttpPost]
        public bool CreateCompletion(int questId, string title)
        {
            var result = _questService.CreateCompletion(questId, title);
            return result;
        }

        [Authorize]
        [HttpPost]
        public bool ModifyCompletion(int id, string title)
        {
            var result = _questService.ModifyCompletion(id, title);
            return result;
        }

        [Authorize]
        [HttpDelete]
        public bool DeleteCompletion(int id)
        {
            var result = _questService.DeletCompletion(id);
            return result;
        }

        [Authorize]
        [HttpGet]
        public CompletionViewModel GetCompletion(int id)
        {
            Completion completion = _questService.GetCompletionById(id);
            CompletionViewModel completionVM = DataCompletionToVM(completion);
            return completionVM;
        }

        [Authorize]
        [HttpGet]
        public List<CompletionViewModel> GetAllCompletion(int questId)
        {
            List<Completion> completions = _questService.GetAllCompletion(questId);
            List<CompletionViewModel> completionsVM = new List<CompletionViewModel>();
            completions.ForEach(q => completionsVM.Add(DataCompletionToVM(q)));
            return completionsVM;
        }
        #endregion

        public static OptionViewModel DataOptionToVM(Option option)
        {
            OptionViewModel completionVM = new OptionViewModel
            {
                OptionId = option.OptionId,
                ChoiceId = option.ChoiceId,
                OptionContent = option.OptionContent,
            };
            return completionVM;
        }

        public static ChoiceQuestionViewModel DataChoiceToVM(ChoiceQuestion choice)
        {
            ChoiceQuestionViewModel choiceVM = new ChoiceQuestionViewModel
            {
                Qid = choice.Qid,
                ChoiceId = choice.ChoiceId,
                Title = choice.Title,
                Type = choice.Type
            };
            return choiceVM;
        }

        public static CompletionViewModel DataCompletionToVM(Completion completion)
        {
            CompletionViewModel completionVM = new CompletionViewModel
            {
                Qid = completion.Qid,
                CompletionId = completion.CompletionId,
                Title = completion.Title,
            };
            return completionVM;
        }
    }
}