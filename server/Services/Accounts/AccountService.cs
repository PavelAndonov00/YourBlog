using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;

namespace WebApi.Services.Accounts
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext dbContext;

        public AccountService(ApplicationDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        public async Task<ApplicationUser> GetUserByUsernameOrEmailAsync(string username)
        {
            var user = dbContext.Users
                .FirstOrDefault(u => u.UserName == username || u.Email == username);
            if(user == null)
            {
                throw new InvalidOperationException("There is no such user with that username.");
            }

            return user;
        }
    }
}
