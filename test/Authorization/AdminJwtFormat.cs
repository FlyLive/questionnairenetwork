using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Web;
using Thinktecture.IdentityModel.Tokens;

namespace test.Authorization
{
    /// <summary> 
    /// 自定义 jwt token 的格式 
    /// </summary>
    public class AdminJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly byte[] _secret;
        private readonly string _issuer;

        public AdminJwtFormat(string issuer, byte[] secret)
        {
            _issuer = issuer;
            _secret = secret;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

            var signingKey = new HmacSigningCredentials(_secret);
            var issued = data.Properties.IssuedUtc;
            var expires = data.Properties.ExpiresUtc;

            return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(_issuer, "Any", data.Identity.Claims, issued.Value.UtcDateTime, expires.Value.UtcDateTime, signingKey));
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}