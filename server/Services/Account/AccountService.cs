using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;

namespace WebApi.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext dbContext;

        public AccountService(ApplicationDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        public int MyProperty { get; set; }

        public async Task<ApplicationUser> GetUserByUsernameAsync(string username)
        {
            var user = dbContext.Users
                .FirstOrDefault(u => u.UserName == username);
            if(user == null)
            {
                throw new InvalidOperationException("There is no such user with that username.");
            }

            return user;
        }
    }
}
