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

        //[Authorize]
        [HttpGet]
        public int GetQuestNum(int id)
        {
            var count = _questService.GetQuestNumByQuestId(id);
            return count;
        }

        //[Authorize]
        [HttpPost]
        public bool CreateQuest([FromBody]QuestionnaireViewModel quest)
        {
            var result = _questService.CreateQuest(quest.QuestTitle,quest.MaxQuestNum);
            return result;
        }

        //[Authorize]
        [HttpPost]
        public bool ModifyQuest([FromBody]QuestionnaireViewModel quest)
        {
            var result = _questService.ModifyQuest(quest.QId, quest.QuestTitle, quest.MaxQuestNum);
            return result;
        }

        //[Authorize]
        [HttpDelete]
        public bool DeleteQuest([FromBody]int qId)
        {
            var result = _questService.DeletQuest(qId);
            return result;
        }

        public static QuestionnaireViewModel DataQuestToVM(Questionnaire quest)
        {
            QuestionnaireViewModel questVM = new QuestionnaireViewModel
            {
                QId = quest.QId,
                QuestTitle = quest.Title,
                MaxQuestNum = quest.MaxQuestNum,
                CurrentQuestNum = quest.CurrentQuestNum,
                CreateTime = quest.CreateTime.ToString("yyyy/MM/dd"),
            };
            return questVM;
        }
    }
}