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
    public class QuestionnaireController : ApiController
    {
        private QuestionnaireService _questService = new QuestionnaireService();
        
        [HttpGet]
        public List<Questionnaire> GetAllQuest()
        {
            List<Questionnaire> quests = _questService.GetAllQuest();
            return quests;
        }
        
        [HttpGet]
        public Questionnaire GetQuest(int id)
        {
            var quest = _questService.GetQuestByQuestId(id);
            return quest;
        }

        [HttpGet]
        public int GetQuestNum(int id)
        {
            var count = _questService.GetQuestNumByQuestId(id);
            return count;
        }
        
        [HttpPost]
        public bool CreateQuest(string title,int ? maxNum)
        {
            var result = _questService.CreateQuest(title,maxNum);
            return result;
        }
        
        [HttpPost]
        public bool ModifyQuest(int id, string title,int ? maxNum)
        {
            var result = _questService.ModifyQuest(id,title,maxNum);
            return result;
        }
        
        [HttpDelete]
        public bool DeleteQuest(int id)
        {
            var result = _questService.DeletQuest(id);
            return result;
        }
    }
}