using QuestionnaireNetWork.Service.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireNetWork.Service.Services
{
    public class QuestionnaireAnswerService
    {
        private QuestionnaireDBContext _db;

        public QuestionnaireAnswerService()
        {
            _db = new QuestionnaireDBContext();
        }

        #region 答案
        public bool SubmitQuest(int questId)
        {
            _db.SaveChanges();
            return true;
        }

        /// <summary>
        /// 获取选项选择的数量
        /// </summary>
        /// <param name="optionId"></param>
        /// <returns></returns>
        public int GetOptionSelected(int optionId)
        {
            var option = _db.Option.SingleOrDefault(o => o.OptionId == optionId);

            int count = option.ChoiceAnswerOptions.Count;
            return count;
        }

        /// <summary>
        /// 获取选项百分比
        /// </summary>
        /// <param name="optionId"></param>
        /// <returns></returns>
        public int GetOptionPercent(int optionId)
        {
            var option = _db.Option.SingleOrDefault(o => o.OptionId == optionId);
            var choice = option.ChoiceQuestion;
            int percent = 0,total = 0,selected = 0;
            //多选
            if (choice.Type)
            {
                total = choice.ChoiceAnswerOptions.GroupBy(c => c.AnswerId).Count();
            }
            else//单选
            {
                total = choice.ChoiceAnswerOptions.Count;
            }
            percent = (selected / total) * 100;
            return percent;
        }
        
        /// <summary>
        /// 获取参与者
        /// </summary>
        /// <param name="questId"></param>
        /// <returns></returns>
        public List<Answer> GetAnswers(int questId)
        {
            var answers = _db.Answer.Where(a => a.QId == questId).ToList();
            return answers;
        }

        public List<ChoiceAnswerOptions> GetChoiceAnswer(int choiceId)
        {
            var choice = _db.ChoiceQuestion.SingleOrDefault(c => c.ChoiceId == choiceId);
            List<ChoiceAnswerOptions> answer = choice.ChoiceAnswerOptions.ToList();
            return answer;
        }

        public List<CompletionAnswerOptions> GetCompletionAnswer(int completionId)
        {
            var completion = _db.Completion.SingleOrDefault(c => c.CompletionId == completionId);
            List<CompletionAnswerOptions> answer = completion.CompletionAnswerOptions.ToList();
            return answer;
        }
        #endregion
    }
}
