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

        public async Task<BlogReturnModel> GetBlogAsync(string blogId)
        {
            var blog = dbContext.Blogs
                .Select(b => new BlogReturnModel
                {
                    AuthorName = b.Author.UserName,
                    AuthorId = b.AuthorId,
                    Title = b.Title,
                    Description = b.Description,
                    CreatedAt = b.CreatedAt.ToString("d MMM - hh:mmtt",
                                                              CultureInfo.InvariantCulture),
                    Content = b.Content,
                    Id = b.Id,
                    ImageUrl = b.ImageUrl
                })
                .FirstOrDefault(b => b.Id == blogId);

            return blog;
        }

        public async Task<IEnumerable<BlogReturnModel>> GetAllWithoutLoggedUserAsync(int offset, int count, string loggedUserId)
        {
            var blogs = dbContext.Blogs
                .Where(b => b.AuthorId != loggedUserId)
                .OrderByDescending(b => b.CreatedAt)
                .Skip(offset)
                .Take(count)
                .Include(blog => blog.Author)
                .Select(b => new BlogReturnModel
                {
                    AuthorName = b.Author.UserName,
                    AuthorId = b.AuthorId,
                    Title = b.Title,
                    Description = b.Description,
                    CreatedAt = b.CreatedAt.ToString("d MMM - hh:mmtt",
                                        CultureInfo.InvariantCulture),
                    Id = b.Id,
                    ImageUrl = b.ImageUrl
                })
                .AsEnumerable();

            return blogs == null ? Enumerable.Empty<BlogReturnModel>() : blogs;
        }

        public async Task<IEnumerable<BlogReturnModel>> GetAllByAuthorAsync(string username)
        {
            var blogs = dbContext.Blogs
                 .Where(b => b.Author.UserName == username)
                 .OrderByDescending(b => b.CreatedAt)
                 .Include(blog => blog.Author)
                 .Select(b => new BlogReturnModel
                 {
                     AuthorName = b.Author.UserName,
                     AuthorId = b.AuthorId,
                     Title = b.Title,
                     Description = b.Description,
                     CreatedAt = b.CreatedAt.ToString("d MMM - hh:mmtt",
                                         CultureInfo.InvariantCulture),
                     Id = b.Id,
                     ImageUrl = b.ImageUrl
                 })
                 .AsEnumerable();

            return blogs == null ? Enumerable.Empty<BlogReturnModel>() : blogs;
        }

        public async Task<bool> IsAuthorAsync(string blogId, string username)
        {
            var blog = dbContext.Blogs
                            .FirstOrDefault(b => b.Id == blogId && b.Author.UserName == username);

            return blog == null ? false : true;
        }


        public async Task<bool> DeleteBlogAsync(string blogId)
        {
            var blog = dbContext.Blogs.FirstOrDefault(b => b.Id == blogId);
            dbContext.Blogs.Remove(blog);
            var affectedRows = await dbContext.SaveChangesAsync();

            return affectedRows > 0 ? true : false;
        }

        public async Task<bool> EditBlogAsync(BlogInputModel blogInputModel)
        {
            var blog = dbContext.Blogs.FirstOrDefault(b => b.Id == blogInputModel.Id);
            blog.Title = blogInputModel.Title;
            blog.Content = blogInputModel.Content;
            blog.Description = blogInputModel.Description;
            blog.ImageUrl = blogInputModel.ImageUrl;

            var affectedRows = await dbContext.SaveChangesAsync();
            return affectedRows > 0 ? true : false;
        }

        #region Private Methods
        #endregion
    }
}
