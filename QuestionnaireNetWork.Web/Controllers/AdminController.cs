using QuestionnaireNetWork.Service.DataBase;
using QuestionnaireNetWork.Service.Services;
using QuestionnaireNetWork.Web.Extension;
using QuestionnaireNetWork.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace QuestionnaireNetWork.Web.Controllers
{
    public class AdminController : ApiController
    {
        private QuestionnaireAnswerService _questAnswerService = new QuestionnaireAnswerService();

        [Authorize]
        [HttpGet]
        public AdminViewModel GetAdminInfo()
        {
            //string auth = Request.Headers.Authorization.ToString();
            //var account = AdminExtension.GetEmployeeUserObject(auth).Account;
            //var nick = AdminExtension.GetEmployeeUserObject(auth).NickName;
            AdminViewModel admin = new AdminViewModel()
            {
                //Account = account,
                //NickName = nick
            };
            return admin;
        }

        [HttpGet]
        public List<AnswerViewModel> GetAnswers(int questId)
        {
            var result = _questAnswerService.GetAnswers(questId);
            List<AnswerViewModel> resultVM = new List<AnswerViewModel>();
            result.ForEach(a => resultVM.Add(DataAnswerToVM(a)));
            return resultVM;
        }

        [HttpGet]
        public List<ChoiceAnswerOptionsViewModel> GetChoiceAnswer(int choiceId)
        {
            var choiceAnswers = _questAnswerService.GetChoiceAnswer(choiceId);
            List<ChoiceAnswerOptionsViewModel> resultVM = new List<ChoiceAnswerOptionsViewModel>();
            foreach (ChoiceAnswerOptions choiceAnswer in choiceAnswers)
            {
                var choiceAnswerVM = DataChoiceAnswerToVM(choiceAnswer);
                choiceAnswerVM.Count = _questAnswerService.GetOptionSelected(choiceAnswer.OptionId);
                choiceAnswerVM.Percent = _questAnswerService.GetOptionPercent(choiceAnswer.OptionId);
                resultVM.Add(choiceAnswerVM);
            }
            choiceAnswers.ForEach(c => resultVM.Add(DataChoiceAnswerToVM(c)));
            return resultVM;
        }

        [HttpGet]
        public List<CompletionAnswerOptionsViewModel> GetCompletionAnswer(int completionId)
        {
            var completionAnswers = _questAnswerService.GetCompletionAnswer(completionId);
            List<CompletionAnswerOptionsViewModel> resultVM = new List<CompletionAnswerOptionsViewModel>();
            completionAnswers.ForEach(c => resultVM.Add(DataCompletionAnswerToVM(c)));
            return resultVM;
        }

        public static ChoiceAnswerOptionsViewModel DataChoiceAnswerToVM(ChoiceAnswerOptions choiceAnswer)
        {
            ChoiceAnswerOptionsViewModel choiceAnswerVM = new ChoiceAnswerOptionsViewModel
            {
                Id = choiceAnswer.Id,
                AnswerId = choiceAnswer.AnswerId,
                OptionId = choiceAnswer.OptionId,
                ChoiceId = choiceAnswer.ChoiceId
            };
            return choiceAnswerVM;
        }

        public static CompletionAnswerOptionsViewModel DataCompletionAnswerToVM(CompletionAnswerOptions completionAnswer)
        {
            CompletionAnswerOptionsViewModel completionAnswerVM = new CompletionAnswerOptionsViewModel
            {
                Id = completionAnswer.Id,
                CompletionId = completionAnswer.CompletionId,
                AnswerId = completionAnswer.AnswerId,
                IpAddress = completionAnswer.Answer.IpAddress,
                AnswerContent = completionAnswer.AnswerContent
            };
            return completionAnswerVM;
        }

        public static AnswerViewModel DataAnswerToVM(Answer answer)
        {
            AnswerViewModel answerVM = new AnswerViewModel
            {
                AnswerId = answer.AnswerId,
                IpAddress = answer.IpAddress,
                CreateTime = answer.CreateTime.ToString("yyyy/MM/dd")
            };
            return answerVM;
        }
    }
}