using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Data.Models.Blog;
using WebApi.Models.Blog.InputModels;
using WebApi.Models.Blog.ReturnModels;

namespace WebApi.Services.Blog
{
    public class BlogService : IBlogService
    {
        private readonly ApplicationDbContext dbContext;

        public BlogService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Data.Models.Blog.Blog> CreateBlogAsync(BlogInputModel blogInputModel)
        {
            var blog = new Data.Models.Blog.Blog
            {
                AuthorId = blogInputModel.AuthorId,
                Content = blogInputModel.Content,
                Description = blogInputModel.Description,
                Title = blogInputModel.Title,
                ImageUrl = blogInputModel.ImageUrl
            };
            await dbContext.Blogs.AddAsync(blog);
            await dbContext.SaveChangesAsync();

            return blog;
        }

        public async Task<IEnumerable<BlogReturnModel>> GetAllByAuthorAsync(string authorId)
        {
            var blogs = dbContext.Blogs
                .Include(blog => blog.Author)
                 .Where(b => b.AuthorId == authorId)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BlogReturnModel
                {
                    AuthorName = b.Author.UserName,
                    AuthorId = b.AuthorId,
                    Title = b.Title,
                    Description = b.Description,
                    CreatedAt = b.CreatedAt
                                    .ToString("d MMM - hh:mm",
                                        CultureInfo.InvariantCulture)
                                    + (DateTime.Now.Hour > 12 ? "pm" : "am"),
                    Id = b.Id,
                    ImageUrl = b.ImageUrl
                })
                .AsEnumerable();

            return blogs;
        }
    }
}
