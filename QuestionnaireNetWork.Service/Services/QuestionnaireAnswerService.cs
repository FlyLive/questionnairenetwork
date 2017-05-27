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
        /// <summary>
        /// 根据访问Ip创建答案组
        /// </summary>
        /// <param name="ip"></param>
        /// <param name="qId"></param>
        /// <returns></returns>
        public int CreateAnswer(string ip, int qId)
        {
            try
            {
                Answer answer = _db.Answer.SingleOrDefault(a => a.IpAddress.Equals(ip) && a.QId == qId);
                if (answer == null)
                {
                    Answer newAnswer = new Answer
                    {
                        CreateTime = DateTime.Now,
                        IpAddress = ip,
                        QId = qId
                    };
                    _db.Answer.Add(newAnswer);
                    _db.SaveChanges();
                    return newAnswer.AnswerId;
                }
                throw new Exception();
            }
            catch (Exception e)
            {
                Console.Write(e);
                throw e;
            }
        }

        /// <summary>
        /// 创建简答题答案
        /// </summary>
        /// <param name="answerId"></param>
        /// <param name="answerContent"></param>
        /// <param name="completionId"></param>
        public void CreateCompletionAnswer(int answerId, string answerContent, int completionId)
        {
            try
            {
                var com = _db.Completion.SingleOrDefault(c => c.CompletionId == completionId);
                CompletionAnswerOptions answer = new CompletionAnswerOptions
                {
                    CompletionId = com.CompletionId,
                    AnswerContent = answerContent,
                    AnswerId = answerId
                };
                _db.CompletionAnswerOptions.Add(answer);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
        }

        /// <summary>
        /// 创建单选题答案
        /// </summary>
        /// <param name="answerId"></param>
        /// <param name="choiceId"></param>
        /// <param name="optionId"></param>
        public void CreateRadioAnswer(int answerId, int choiceId, int optionId)
        {
            try
            {
                var question = _db.ChoiceQuestion.SingleOrDefault(c => c.ChoiceId == choiceId);
                ChoiceAnswerOptions answer = new ChoiceAnswerOptions
                {
                    ChoiceId = question.ChoiceId,
                    AnswerId = answerId
                };
                var option = question.Option.SingleOrDefault(o => o.OptionId == optionId);
                answer.OptionId = option.OptionId;
                _db.ChoiceAnswerOptions.Add(answer);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
        }

        /// <summary>
        /// 创建多选题答案
        /// </summary>
        /// <param name="answerId"></param>
        /// <param name="choiceId"></param>
        /// <param name="optionIds"></param>
        public void CreateCheckAnswer(int answerId, int choiceId, List<int> optionIds)
        {
            try
            {
                var question = _db.ChoiceQuestion.SingleOrDefault(c => c.ChoiceId == choiceId);
                foreach (var optionId in optionIds)
                {
                    ChoiceAnswerOptions answer = new ChoiceAnswerOptions
                    {
                        ChoiceId = question.ChoiceId,
                        AnswerId = answerId
                    };
                    var option = question.Option.Where(o => o.OptionId == optionId).First();
                    answer.OptionId = option.OptionId;
                    _db.ChoiceAnswerOptions.Add(answer);
                }
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
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
            double percent = 0, total = 0, selected = 0;
            selected = GetOptionSelected(option.OptionId);
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
            return (int)percent;
        }

        /// <summary>
        /// 获取参与者列表
        /// </summary>
        /// <param name="questId"></param>
        /// <returns></returns>
        public List<Answer> GetAnswers(int questId)
        {
            var answers = _db.Answer.Where(a => a.QId == questId).ToList();
            return answers;
        }

        /// <summary>
        /// 获取参与者
        /// </summary>
        /// <param name="answerId"></param>
        /// <returns></returns>
        public Answer GetAnswer(int answerId)
        {
            var answer = _db.Answer.SingleOrDefault(a => a.AnswerId == answerId);
            return answer;
        }

        /// <summary>
        /// 获取用户在该选择题中的答案
        /// </summary>
        /// <param name="answerId"></param>
        /// <param name="choiceId"></param>
        /// <returns></returns>
        public List<ChoiceAnswerOptions> GetAnswerChoices(int answerId,int choiceId)
        {
            List<ChoiceAnswerOptions> answers = _db.ChoiceAnswerOptions.Where(c => c.AnswerId == answerId && c.ChoiceId == choiceId).ToList();
            return answers;
        }

        /// <summary>
        /// 获取选择题答案
        /// </summary>
        /// <param name="choiceId"></param>
        /// <returns></returns>
        public List<ChoiceAnswerOptions> GetChoiceAnswer(int choiceId)
        {
            var choice = _db.ChoiceQuestion.SingleOrDefault(c => c.ChoiceId == choiceId);
            List<ChoiceAnswerOptions> answer = choice.ChoiceAnswerOptions.ToList();
            return answer;
        }

        /// <summary>
        /// 获取简答题答案
        /// </summary>
        /// <param name="completionId"></param>
        /// <returns></returns>
        public List<CompletionAnswerOptions> GetCompletionAnswer(int completionId)
        {
            var completion = _db.Completion.SingleOrDefault(c => c.CompletionId == completionId);
            List<CompletionAnswerOptions> answer = completion.CompletionAnswerOptions.ToList();
            return answer;
        }
        #endregion
    }
}
