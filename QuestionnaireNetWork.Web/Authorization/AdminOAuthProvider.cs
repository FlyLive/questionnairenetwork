using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using QuestionnaireNetWork.Service.Services;
using QuestionnaireNetWork.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace QuestionnaireNetWork.Web.Authorization
{
    /// <summary>
    /// 自定义 jwt oauth 的授权验证
    /// </summary>
    public class AdminOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var account = context.UserName;
            var password = context.Password;
            string nickName;
            if (!CheckCredential(account, password, out nickName))
            {
                context.SetError("invalid_grant", "The user name or password is incorrect");
                context.Rejected();
                return Task.FromResult<object>(null);
            }
            var ticket = new AuthenticationTicket(SetClaimsIdentity(context, account, nickName), new AuthenticationProperties());
            context.Validated(ticket);

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        private static ClaimsIdentity SetClaimsIdentity(OAuthGrantResourceOwnerCredentialsContext context, string account, string nickName)
        {
            var identity = new ClaimsIdentity("JWT");
            identity.AddClaim(new Claim("account", account));
            identity.AddClaim(new Claim("nickName", nickName));
            return identity;
        }

        private static bool CheckCredential(string account, string password, out string nick)
        {
            AdminService adminService = new AdminService();
            var success = false;
            // 用户名和密码验证
            var admin = adminService.Login(account, password);
            if (admin != null)
            {
                AdminViewModel adminVM = new AdminViewModel
                {
                    Account = admin.Account,
                    Password = admin.Password,
                    NickName = admin.Nickname
                };
                account = adminVM.Account;
                password = adminVM.Password;
                nick = adminVM.NickName;
                success = true;
            }
            else
            {
                nick = "";
            }
            return success;
        }
    }
}