using QuestionnaireNetWork.Service.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionnaireNetWork.Service.Services
{
    public class AdminService : IDisposable
    {
        private QuestionnaireDBContext _db;

        public AdminService()
        {
            _db = new QuestionnaireDBContext();
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public Admin Login(string account, string password)
        {
            if (account != null && account != "")
            {
                Admin admin = GetAdminByAccount(account);
                return admin.Password == password ? admin : null;
            }
            return null;
        }

        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool Registe(string account, string password)
        {
            var reName = _db.Admin.SingleOrDefault(a => a.Account == account) == null ? false : true;
            if (!reName)
            {
                Admin admin = new Admin
                {
                    Account = account,
                    Nickname = account,
                    Password = password
                };

                _db.Admin.Add(admin);
                _db.SaveChanges();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 修改个人资料
        /// </summary>
        /// <param name="account"></param>
        /// <param name="nick"></param>
        /// <returns></returns>
        public bool ModifyInfo(string account, string nick)
        {
            try
            {
                Admin admin = GetAdminByAccount(account);
                admin.Nickname = nick;
                _db.SaveChanges();
                return true;

            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
        }

        public bool ConfirmPassword(string account,string password)
        {
            try
            {
                Admin admin = GetAdminByAccount(account);
                return admin.Password == password;
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
        }

        public bool ModifyPassword(string account,string newPassword)
        {
            try
            {
                Admin admin = GetAdminByAccount(account);
                admin.Password = newPassword;
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.Write(e);
                return false;
            }
        }

        /// <summary>
        /// 根据账户获取Admin
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public Admin GetAdminByAccount(string account)
        {
            var admin = _db.Admin.SingleOrDefault(a => a.Account == account);
            return admin;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
