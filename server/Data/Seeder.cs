using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data
{
    public class Seeder
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IServiceProvider serviceProvider;

        public Seeder(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            this.dbContext = dbContext;
            this.serviceProvider = serviceProvider;
        }

        public async Task Seed()
        {
            await SeedRoles();
            await SeedUsers();
        }

        private async Task SeedUsers()
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var user = new ApplicationUser
            {
                FirstName = "TestUser",
                LastName = "TestUserov",
                Email = "tuser123@abv.bg",
                BirthDate = DateTime.Now,
                PhoneNumber = "0888444333",
                UserName = "TestUser123"
            };
            await userManager.CreateAsync(user, "TestUser123@abv.bg");
            await userManager.AddToRoleAsync(user, "User");
            
            var secondUser = new ApplicationUser
            {
                FirstName = "SecondTestUser",
                LastName = "SecondTestUserov",
                Email = "stuser123@abv.bg",
                BirthDate = DateTime.Now,
                PhoneNumber = "0883562966",
                UserName = "SecondTestUser123"
            };
            await userManager.CreateAsync(secondUser, "SecondTestUser123@abv.bg");
            await userManager.AddToRoleAsync(secondUser, "User");

            var admin = new ApplicationUser
            {
                FirstName = "TestAdmin",
                LastName = "TestAdminov",
                Email = "tadmin123@abv.bg",
                BirthDate = DateTime.Now,
                PhoneNumber = "0899555666",
                UserName = "TestAdmin123"
            };
            await userManager.CreateAsync(admin, "TestAdmin123@abv.bg");
            await userManager.AddToRoleAsync(admin, "Admin");
        }

        private async Task SeedRoles()
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            await roleManager.CreateAsync(new ApplicationRole
            {
                Name = "User"
            });
            await roleManager.CreateAsync(new ApplicationRole
            {
                Name = "Admin"
            });
        }
    }
}
