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
        private AdminService _adminService = new AdminService();
        private QuestionnaireService _questService = new QuestionnaireService();
        private QuestionnaireAnswerService _questAnswerService = new QuestionnaireAnswerService();
        public string Options()
        {
            return null; // HTTP 200 response with empty body
        }

        [Authorize]
        [System.Web.Mvc.HttpGet]
        public AdminViewModel GetAdminInfo()
        {
            try
            {
                string auth = Request.Headers.Authorization.ToString();
                var account = AdminExtension.GetEmployeeUserObject(auth).Account;
                var nick = AdminExtension.GetEmployeeUserObject(auth).NickName;
                AdminViewModel admin = new AdminViewModel()
                {
                    Account = account,
                    NickName = nick
                };
                return admin;

            }
            catch (Exception e)
            {
                Console.Write(e);
                return null;
            }
        }

        [Authorize]
        [System.Web.Mvc.HttpPost]
        public bool ModifyAdminInfo([FromBody]AdminViewModel admin)
        {
            var result = _adminService.ModifyInfo(admin.Account, admin.NickName);
            return result;
        }

        [Authorize]
        [System.Web.Mvc.HttpPost]
        public bool ConfirmPassword(AdminViewModel admin)
        {
            var result = _adminService.ConfirmPassword(admin.Account, admin.Password);
            return result;
        }

        [Authorize]
        [System.Web.Mvc.HttpPost]
        public bool ModifyPassword([FromBody]AdminViewModel admin)
        {
            var result = _adminService.ModifyPassword(admin.Account, admin.Password);
            return result;
        }

        [Authorize]
        [System.Web.Mvc.HttpGet]
        public List<AnswerViewModel> GetAnswers(int questId)
        {
            var result = _questAnswerService.GetAnswers(questId);
            List<AnswerViewModel> resultVM = new List<AnswerViewModel>();
            result.ForEach(a => resultVM.Add(DataAnswerToVM(a)));
            return resultVM;
        }

        [Authorize]
        [System.Web.Mvc.HttpGet]
        public AnswerViewModel GetAnswer(int answerId)
        {
            var answer = _questAnswerService.GetAnswer(answerId);
            var choices = answer.Questionnaire.ChoiceQuestion.ToList();
            AnswerViewModel resultVM = DataAnswerToVM(answer);
            resultVM.ChoicesAnswer = new List<ChoiceAnswerViewModel>();
            resultVM.CompletionsAnswer = new List<CompletionAnswerOptionsViewModel>();

            foreach (ChoiceQuestion choice in choices)
            {
                var choiceAnswerVM = new ChoiceAnswerViewModel
                {
                    ChoiceId = choice.ChoiceId,
                    ChoiceTitle = choice.Title,
                    Type = choice.Type
                };

                choice.Option.ToList()
                    .ForEach(
                    co => choiceAnswerVM.Options.Add(
                        QuestionController.DataOptionToVM(co)
                        ));
                _questAnswerService.GetAnswerChoices(answerId, choice.ChoiceId)
                    .ForEach(an => choiceAnswerVM.Answers.Add(an.Option.OptionContent));

                resultVM.ChoicesAnswer.Add(choiceAnswerVM);
            }
            answer.CompletionAnswerOptions.ToList().ForEach(c => resultVM.CompletionsAnswer.Add(DataCompletionAnswerToVM(c)));

            return resultVM;
        }

        [Authorize]
        [System.Web.Mvc.HttpGet]
        public List<ChoiceAnswerOptionsViewModel> GetChoiceAnswer(int choiceId)
        {
            var options = _questService.GetAllOptionByCQId(choiceId);
            var choiceAnswers = _questAnswerService.GetChoiceAnswer(choiceId);
            List<ChoiceAnswerOptionsViewModel> resultVM = new List<ChoiceAnswerOptionsViewModel>();

            foreach (Option option in options)
            {
                resultVM.Add(new ChoiceAnswerOptionsViewModel
                {
                    OptionId = option.OptionId,
                    OptionContent = option.OptionContent,
                    Count = _questAnswerService.GetOptionSelected(option.OptionId),
                    Percent = _questAnswerService.GetOptionPercent(option.OptionId)
                });
            }
            return resultVM;
        }

        [Authorize]
        [System.Web.Mvc.HttpGet]
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
                ChoiceId = choiceAnswer.ChoiceId,
                OptionContent = choiceAnswer.Option.OptionContent
            };
            return choiceAnswerVM;
        }

        public static CompletionAnswerOptionsViewModel DataCompletionAnswerToVM(CompletionAnswerOptions completionAnswer)
        {
            CompletionAnswerOptionsViewModel completionAnswerVM = new CompletionAnswerOptionsViewModel
            {
                Id = completionAnswer.Id,
                CompletionId = completionAnswer.CompletionId,
                CompletionTitle = completionAnswer.Completion.Title,
                AnswerId = completionAnswer.AnswerId,
                IpAddress = completionAnswer.Answer.IpAddress,
                AnswerContent = completionAnswer.AnswerContent,
                CreateTime = completionAnswer.Answer.CreateTime.ToString("yyyy/MM/dd")
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