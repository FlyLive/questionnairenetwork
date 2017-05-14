using QuestionnaireNetWork.Service.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireNetWork.Service.Services
{
    public class QuestionnaireService
    {
        private QuestionnaireDBContext _db;

        public QuestionnaireService()
        {
            _db = new QuestionnaireDBContext();
        }
        
        public Questionnaire CreateQuest()
        {
            Questionnaire quest = null;
            _db.Questionnaire.Add(quest);
            _db.SaveChanges();
            return quest;
        }
        
        public Questionnaire ModifyQuest(int questId)
        {
            Questionnaire quest = GetQuestByQuestId(questId);
            _db.SaveChanges();
            return quest;
        }

        /// <summary>
        /// 删除问卷
        /// </summary>
        /// <param name="questId"></param>
        /// <returns></returns>
        public bool DeletQuest(int questId)
        {
            var quest = GetQuestByQuestId(questId);
            if(quest != null)
            {
                _db.Questionnaire.Remove(quest);
                _db.SaveChanges();
            }
            return false;
        }

        public bool SubmitQuest(int questId)
        {
            _db.SaveChanges();
            return true;
        }

        /// <summary>
        /// 获取所有问卷
        /// </summary>
        /// <returns></returns>
        public List<Questionnaire> GetAllQuest()
        {
            return _db.Questionnaire.ToList();
        }

        /// <summary>
        /// 根据问卷Id获取问卷
        /// </summary>
        /// <param name="questId"></param>
        /// <returns></returns>
        public Questionnaire GetQuestByQuestId(int questId)
        {
            var quest = _db.Questionnaire.SingleOrDefault(q => q.Qid == questId);
            return quest;
        }
    }
}
