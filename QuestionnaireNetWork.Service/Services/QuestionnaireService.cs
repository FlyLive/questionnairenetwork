using QuestionnaireNetWork.Service.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireNetWork.Service.Services
{
    public class QuestionnaireService : IDisposable
    {
        private QuestionnaireDBContext _db;

        public QuestionnaireService()
        {
            _db = new QuestionnaireDBContext();
        }

        public bool SubmitQuest(int questId)
        {
            _db.SaveChanges();
            return true;
        }

        #region 选择题选项
        public Option GetOptionById(int id)
        {
            Option option = _db.Option.SingleOrDefault(c => c.OptionId == id);
            return option;
        }

        public List<Option> GetAllOptionByCQId(int cqId)
        {
            ChoiceQuestion choice = GetChoiceQuestionById(cqId);
            List<Option> options = choice.Option.ToList();
            return options;
        }

        public bool CreateOption(int choiceId, List<string> contents)
        {
            try
            {
                contents.ForEach(content => _db.Option.Add(new Option
                {
                    ChoiceId = choiceId,
                    OptionContent = content,
                }));
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        public bool ModifyOption(int id, string content)
        {
            try
            {
                Option option = GetOptionById(id);
                option.OptionContent = content;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        public bool DeletOption(int id)
        {
            try
            {
                Option option = GetOptionById(id);
                _db.Option.Remove(option);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        private void DeleteOptionsByChoiceId(int choiceId)
        {
            try
            {
                ChoiceQuestion choice = GetChoiceQuestionById(choiceId);
                var options = choice.Option;
                _db.Option.RemoveRange(options);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
        }
        #endregion

        #region 选择题
        public ChoiceQuestion GetChoiceQuestionById(int id)
        {
            ChoiceQuestion question = _db.ChoiceQuestion
                .Include("Option")
                .SingleOrDefault(c => c.ChoiceId == id);
            return question;
        }

        public List<ChoiceQuestion> GetAllChoiceQuestion(int questId)
        {
            Questionnaire quest = GetQuestByQuestId(questId);
            List<ChoiceQuestion> questions = quest.ChoiceQuestion.ToList();
            return questions;
        }

        public List<ChoiceQuestion> GetRadioChoiceQuestion(int questId)
        {
            List<ChoiceQuestion> questions = GetAllChoiceQuestion(questId).Where(c => c.Type == false).ToList();
            return questions;
        }

        public List<ChoiceQuestion> GetCheckChoiceQuestion(int questId)
        {
            List<ChoiceQuestion> questions = GetAllChoiceQuestion(questId).Where(c => c.Type == true).ToList();
            return questions;
        }

        public bool CreateChoiceQuestion(int questId, string title, bool type, List<string> options)
        {
            try
            {
                ChoiceQuestion choice = new ChoiceQuestion
                {
                    Qid = questId,
                    Title = title,
                    Type = type
                };
                _db.ChoiceQuestion.Add(choice);
                if (options.Count != 0)
                {
                    options.ForEach(
                        optionContent => choice.Option.Add(new Option
                        {
                            ChoiceId = choice.ChoiceId,
                            OptionContent = optionContent
                        }));
                }
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        public bool ModifyChoiceQuestion(int id, string title, bool type)
        {
            try
            {
                ChoiceQuestion choice = GetChoiceQuestionById(id);
                choice.Title = title;
                choice.Type = type;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        public bool DeleteChoiceQuestion(int id)
        {
            try
            {
                ChoiceQuestion choice = GetChoiceQuestionById(id);
                DeleteOptionsByChoiceId(id);
                _db.ChoiceQuestion.Remove(choice);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        private void DeleteChoicesByQuestId(int questId)
        {
            try
            {
                Questionnaire quest = GetQuestByQuestId(questId);
                var choices = quest.ChoiceQuestion.ToList();
                choices.ForEach(choice => DeleteOptionsByChoiceId(choice.ChoiceId));
                _db.ChoiceQuestion.RemoveRange(choices);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
        }
        #endregion

        #region 简答题
        public List<Completion> GetAllCompletion(int questId)
        {
            Questionnaire quest = GetQuestByQuestId(questId);
            List<Completion> completions = quest.Completion.ToList();
            return completions;
        }

        public Completion GetCompletionById(int id)
        {
            Completion completion = _db.Completion.SingleOrDefault(c => c.CompletionId == id);
            return completion;
        }

        public bool CreateCompletion(int questId, string title)
        {
            try
            {
                _db.Completion.Add(new Completion
                {
                    Qid = questId,
                    Title = title,
                });
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        public bool ModifyCompletion(int id, string title)
        {
            try
            {
                Completion completion = GetCompletionById(id);
                completion.Title = title;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        public bool DeleteCompletion(int id)
        {
            try
            {
                Completion completion = GetCompletionById(id);
                completion.CompletionAnswerOptions.Clear();
                _db.Completion.Remove(completion);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        private void DeleteCompletionsByQuestId(int questId)
        {
            try
            {
                Questionnaire quest = GetQuestByQuestId(questId);
                var completions = quest.Completion;
                _db.Completion.RemoveRange(completions);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
        }
        #endregion

        #region 问卷
        /// <summary>
        /// 搜索
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<Questionnaire> Search(string search)
        {
            var quests = _db.Questionnaire.Where(q => q.Title.Contains(search)).ToList();
            return quests;
        }

        /// <summary>
        /// 获取问卷的现有问题数
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int GetQuestNumByQuestId(int id)
        {
            var choice = GetQuestByQuestId(id);
            int count = choice.ChoiceQuestion.Count + choice.Completion.Count;
            return count;
        }

        /// <summary>
        /// 创建问卷
        /// </summary>
        /// <param name="title"></param>
        /// <param name="maxNum"></param>
        /// <returns></returns>
        public bool CreateQuest(string title, int? maxNum)
        {
            try
            {
                _db.Questionnaire.Add(new Questionnaire
                {
                    Title = title,
                    MaxQuestNum = maxNum < 30 ? (int)maxNum : 30,
                    CreateTime = DateTime.Now,
                });
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        /// <summary>
        /// 修改问卷
        /// </summary>
        /// <param name="questId"></param>
        /// <param name="title"></param>
        /// <param name="maxNum"></param>
        /// <returns></returns>
        public bool ModifyQuest(int questId, string title, int? maxNum)
        {
            try
            {
                int currentNum = GetQuestNumByQuestId(questId);
                maxNum = maxNum < currentNum ? currentNum : maxNum;

                Questionnaire quest = GetQuestByQuestId(questId);
                quest.Title = title;
                quest.MaxQuestNum = maxNum < 30 ? (int)maxNum : 30;

                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
            return true;
        }

        /// <summary>
        /// 删除问卷
        /// </summary>
        /// <param name="questId"></param>
        /// <returns></returns>
        public bool DeletQuest(int questId)
        {
            try
            {
                var quest = GetQuestByQuestId(questId);
                if (quest != null)
                {
                    DeleteChoicesByQuestId(questId);
                    DeleteCompletionsByQuestId(questId);
                    _db.Questionnaire.Remove(quest);
                    _db.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
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
            var quest = _db.Questionnaire
                .Include("ChoiceQuestion")
                .Include("Completion")
                .SingleOrDefault(q => q.Qid == questId);
            return quest;
        }

        public List<Questionnaire> GetTop5Quest()
        {
            var quest = (from g in GetAllQuest()
                         orderby g.CreateTime
                         descending
                         select g).Take(5).ToList();
            return quest;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
        #endregion
    }
}
