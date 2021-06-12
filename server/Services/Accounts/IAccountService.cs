using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;

namespace WebApi.Services.Accounts
{
    public interface IAccountService
    {
        Task<ApplicationUser> GetUserByUsernameOrEmailAsync(string username);
    }
}
