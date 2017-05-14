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
        // GET api/<controller>
        public List<Questionnaire> Get()
        {
            List<Questionnaire> quests = _questService.GetAllQuest();
            return quests;
        }

        // GET api/<controller>/5
        public Questionnaire Get(int id)
        {
            var quest = _questService.GetQuestByQuestId(id);
            return quest;
        }

        // POST api/<controller>
        [HttpPost]
        public Questionnaire Post([FromBody]string value)
        {
            var result = _questService.CreateQuest();
            return result;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public bool Delete(int id)
        {
            var result = _questService.DeletQuest(id);
            return result;
        }
    }
}