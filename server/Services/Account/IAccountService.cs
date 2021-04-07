using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;

namespace WebApi.Services.Account
{
    public interface IAccountService
    {
        Task<ApplicationUser> GetUserByUsernameOrEmailAsync(string username);
    }
}
