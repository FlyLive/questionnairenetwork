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
    public class QuestionnaireController : ApiController
    {
        private QuestionnaireService _questService = new QuestionnaireService();
        
        [HttpGet]
        public List<QuestionnaireViewModel> GetAllQuest()
        {
            List<Questionnaire> quests = _questService.GetAllQuest();
            var questsVM = new List<QuestionnaireViewModel>();
            quests.ForEach(q => questsVM.Add(DataQuestToVM(q)));
            return questsVM;
        }
        
        [HttpGet]
        public QuestionnaireViewModel GetQuest(int id)
        {
            Questionnaire quest = _questService.GetQuestByQuestId(id);
            var questVM = DataQuestToVM(quest);
            return questVM;
        }

        [Authorize]
        [HttpGet]
        public int GetQuestNum(int id)
        {
            var count = _questService.GetQuestNumByQuestId(id);
            return count;
        }

        [Authorize]
        [HttpPost]
        public bool CreateQuest(string title,int ? maxNum)
        {
            var result = _questService.CreateQuest(title,maxNum);
            return result;
        }

        [Authorize]
        [HttpPost]
        public bool ModifyQuest(int id, string title,int ? maxNum)
        {
            var result = _questService.ModifyQuest(id,title,maxNum);
            return result;
        }

        [Authorize]
        [HttpDelete]
        public bool DeleteQuest(int id)
        {
            var result = _questService.DeletQuest(id);
            return result;
        }

        public static QuestionnaireViewModel DataQuestToVM(Questionnaire quest)
        {
            QuestionnaireViewModel questVM = new QuestionnaireViewModel
            {
                Qid = quest.Qid,
                Title = quest.Title,
                MaxQuestNum = quest.MaxQuestNum,
                CreateTime = quest.CreateTime.ToString("yyyy-MM-dd HH-mm-ss"),
            };
            return questVM;
        }
    }
}