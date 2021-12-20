using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models.Images;
using WebApi.Models.Blog.InputModels;
using WebApi.Services.Blogs;

namespace WebApi.Data
{
    public class Seeder
    {
        private readonly IServiceProvider serviceProvider;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly Random random;

        public Seeder(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            random = new Random();
        }

        public async Task Seed()
        {
            await SeedRoles();
            await SeedUsers();
            await SeedBlogs();
        }

        private async Task SeedUsers()
        {
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

        private async Task SeedBlogs()
        {
            var images = new Image[] {
                new Image()
                {
                    Url = "https://res.cloudinary.com/dq62pylpx/image/upload/v1640035544/nohfoqfkkpdnwf3i8fwy.jpg",
                    PublicId= "nohfoqfkkpdnwf3i8fwy"
                },
                new Image()
                {
                    Url = "https://res.cloudinary.com/dq62pylpx/image/upload/v1623492471/puaytfi3qanfugu1bj7w.jpg",
                    PublicId= "puaytfi3qanfugu1bj7w"
                },
                new Image()
                {
                    Url = "https://res.cloudinary.com/dq62pylpx/image/upload/v1618009436/768px-Eo_circle_red_not-allowed.svg_nueryp.png",
                    PublicId= "768px-Eo_circle_red_not-allowed.svg_nueryp"
                }
            };

            var blogService = serviceProvider.GetRequiredService<IBlogService>();
            var users = userManager.Users.ToArray();
            for (int i = 1; i <= 20; i++)
            {
                for (int k = 0; k < users.Length; k++)
                {
                    var user = users[k];

                    var blogInputModel = new BlogInputModel();

                    blogInputModel.AuthorId = user.Id;

                    var title = RandomString(50);
                    blogInputModel.Title = $"Title: {title}";

                    var description = RandomString(100);
                    blogInputModel.Description = $"Description: {description}";

                    var content = RandomString(1000);
                    blogInputModel.Content = $"Content: {content}";

                    blogInputModel.ImageUrl = images[k].Url;
                    blogInputModel.ImagePublicId = images[k].PublicId;

                    blogInputModel.DateCreated = DateTime.Now.AddMinutes((k * 10 + i * 10) * i);
                    await blogService.CreateBlogAsync(blogInputModel);
                }
            }
        }

        private string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
