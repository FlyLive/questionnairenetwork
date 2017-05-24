using Newtonsoft.Json.Linq;
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
        //[Authorize]
        [HttpGet]
        public OptionViewModel GetOptionById(int id)
        {
            Option option = _questService.GetOptionById(id);
            OptionViewModel optionVM = DataOptionToVM(option);
            return optionVM;
        }

        //[Authorize]
        [HttpGet]
        public List<OptionViewModel> GetAllOptionByCQId(int cqId)
        {
            List<Option> options = _questService.GetAllOptionByCQId(cqId).ToList();
            List<OptionViewModel> optionsVM = new List<OptionViewModel>();
            options.ForEach(o => optionsVM.Add(DataOptionToVM(o)));
            return optionsVM;
        }

        //[Authorize]
        [HttpPost]
        public bool CreateOption(dynamic obj)
        {
            var choiceId = Convert.ToInt16(obj.ChoiceId);
            var options = ((JArray)(obj.Options)).ToList();
            var optionsContent = new List<string>();
            options.ForEach(option => optionsContent.Add(option.ToString()));
            var result = _questService.CreateOption(choiceId, optionsContent);
            return result;
        }

        //[Authorize]
        [HttpPost]
        public bool ModifyOption([FromBody]OptionViewModel option)
        {
            var result = _questService.ModifyOption(option.OptionId, option.OptionContent);
            return result;
        }

        //[Authorize]
        [HttpDelete]
        public bool DeleteOption([FromBody]int id)
        {
            var result = _questService.DeletOption(id);
            return result;
        }
        #endregion

        #region 选择题
        //[Authorize]
        [HttpPost]
        public bool CreateChoiceQuestion(dynamic obj)
        {
            var qId = Convert.ToInt16(obj.QId);
            var choiceTitle = Convert.ToString(obj.ChoiceTitle);
            var type = Convert.ToBoolean(obj.Type);
            var options = ((JArray)(obj.Options)).ToList();
            var optionsContent = new List<string>();
            options.ForEach(option => optionsContent.Add(option.ToString()));
            var result = _questService.CreateChoiceQuestion(qId, choiceTitle, type,optionsContent);
            return result;
        }

        //[Authorize]
        [HttpPost]
        public bool ModifyChoiceQuestion([FromBody]ChoiceQuestionViewModel choice)
        {
            var result = _questService.ModifyChoiceQuestion(choice.ChoiceId, choice.ChoiceTitle, choice.Type);
            return result;
        }

        //[Authorize]
        [HttpGet]
        public ChoiceQuestionViewModel GetChoiceQuestion(int id)
        {
            ChoiceQuestion question = _questService.GetChoiceQuestionById(id);
            ChoiceQuestionViewModel questionVM = DataChoiceToVM(question);
            return questionVM;
        }

        //[Authorize]
        [HttpDelete]
        public bool DeleteChoiceQuestion([FromBody]int id)
        {
            var result = _questService.DeletChoiceQuestion(id);
            return result;
        }

        //[Authorize]
        [HttpGet]
        public List<ChoiceQuestionViewModel> GetAllChoiceQuestion(int questId)
        {
            List<ChoiceQuestion> questions = _questService.GetAllChoiceQuestion(questId);
            var questionsVM = new List<ChoiceQuestionViewModel>();
            questions.ForEach(q => questionsVM.Add(DataChoiceToVM(q)));
            return questionsVM;
        }
        
        //[Authorize]
        [HttpGet]
        public List<ChoiceQuestionViewModel> GetRadioChoiceQuestion(int questId)
        {
            List<ChoiceQuestion> questions = _questService.GetRadioChoiceQuestion(questId);
            var questionsVM = new List<ChoiceQuestionViewModel>();
            questions.ForEach(q => questionsVM.Add(DataChoiceToVM(q)));
            return questionsVM;
        }
        
        //[Authorize]
        [HttpGet]
        public List<ChoiceQuestionViewModel> GetCheckChoiceQuestion(int questId)
        {
            List<ChoiceQuestion> questions = _questService.GetCheckChoiceQuestion(questId);
            var questionsVM = new List<ChoiceQuestionViewModel>();
            questions.ForEach(q => questionsVM.Add(DataChoiceToVM(q)));
            return questionsVM;
        }
        #endregion

        #region 简答题
        //[Authorize]
        [HttpPost]
        public bool CreateCompletion([FromBody]CompletionViewModel completion)
        {
            var result = _questService.CreateCompletion(completion.QId, completion.Title);
            return result;
        }

        //[Authorize]
        [HttpPost]
        public bool ModifyCompletion([FromBody]CompletionViewModel completion)
        {
            var result = _questService.ModifyCompletion(completion.CompletionId, completion.Title);
            return result;
        }

        //[Authorize]
        [HttpDelete]
        public bool DeleteCompletion([FromBody]int id)
        {
            var result = _questService.DeletCompletion(id);
            return result;
        }

        //[Authorize]
        [HttpGet]
        public CompletionViewModel GetCompletion(int id)
        {
            Completion completion = _questService.GetCompletionById(id);
            CompletionViewModel completionVM = DataCompletionToVM(completion);
            return completionVM;
        }

        //[Authorize]
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
                QId = choice.Qid,
                ChoiceId = choice.ChoiceId,
                ChoiceTitle = choice.Title,
                Type = choice.Type
            };
            return choiceVM;
        }

        public static CompletionViewModel DataCompletionToVM(Completion completion)
        {
            CompletionViewModel completionVM = new CompletionViewModel
            {
                QId = completion.Qid,
                CompletionId = completion.CompletionId,
                Title = completion.Title,
            };
            return completionVM;
        }
    }
}