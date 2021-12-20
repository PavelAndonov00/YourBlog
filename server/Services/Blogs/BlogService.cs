using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Data.Models.Blogs;
using WebApi.Data.Models.Comments;
using WebApi.Data.Models.Images;
using WebApi.Models.Blog.InputModels;
using WebApi.Models.Blog.ReturnModels;

namespace WebApi.Services.Blogs
{
    public class BlogService : IBlogService
    {
        private readonly ApplicationDbContext dbContext;

        public BlogService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Blog> CreateBlogAsync(BlogInputModel blogInputModel)
        {
            var image = new Image
            {
                Url = blogInputModel.ImageUrl,
                PublicId = blogInputModel.ImagePublicId
            };

            var blog = new Blog(blogInputModel.DateCreated)
            {
                AuthorId = blogInputModel.AuthorId,
                Content = blogInputModel.Content,
                Description = blogInputModel.Description,
                Title = blogInputModel.Title,
                Image = image
            };

            await dbContext.Blogs.AddAsync(blog);
            await dbContext.SaveChangesAsync();

            return blog;
        }

        public async Task<BlogReturnModel> GetBlogAsync(string blogId)
        {
            var blog = dbContext.Blogs
                .Include(b => b.UsersLiked)
                .Include(b => b.Image)
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
                    ImageUrl = b.Image.Url,
                    Likes = b.UsersLiked.Count,
                    CommentsCount = b.Comments.Count
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
                .Include(blog => blog.Image)
                .Include(blog => blog.UsersLiked)
                .Select(b => new BlogReturnModel
                {
                    AuthorName = b.Author.UserName,
                    AuthorId = b.AuthorId,
                    Title = b.Title,
                    Description = b.Description,
                    CreatedAt = b.CreatedAt.ToString("d MMM - hh:mmtt",
                                        CultureInfo.InvariantCulture),
                    Id = b.Id,
                    ImageUrl = b.Image.Url,
                    Likes = b.UsersLiked.Count,
                    CommentsCount = b.Comments.Count
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
                 .Include(blog => blog.Image)
                 .Include(blog => blog.UsersLiked)
                 .Select(b => new BlogReturnModel
                 {
                     AuthorName = b.Author.UserName,
                     AuthorId = b.AuthorId,
                     Title = b.Title,
                     Description = b.Description,
                     CreatedAt = b.CreatedAt.ToString("d MMM - hh:mmtt",
                                         CultureInfo.InvariantCulture),
                     Id = b.Id,
                     ImageUrl = b.Image.Url,
                     Likes = b.UsersLiked.Count,
                     CommentsCount = b.Comments.Count
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
            var blog = dbContext
                .Blogs
                .Include(b => b.Image)
                .FirstOrDefault(b => b.Id == blogId);
            dbContext.Blogs.Remove(blog);
            var affectedRows = await dbContext.SaveChangesAsync();

            if (affectedRows > 0)
            {
                var cloudinary = new Cloudinary();
                var deletionParams = new DeletionParams(blog.Image.PublicId);
                var result = await cloudinary.DestroyAsync(deletionParams);

                return true;
            }

            return false;
        }

        public async Task<bool> EditBlogAsync(BlogInputModel blogInputModel)
        {
            var blog = dbContext
                .Blogs
                .Include(b => b.Image)
                .FirstOrDefault(b => b.Id == blogInputModel.Id);
            blog.Title = blogInputModel.Title;
            blog.Content = blogInputModel.Content;
            blog.Description = blogInputModel.Description;

            var oldImageUrl = blog.Image.Url;
            var newImageUrl = blogInputModel.ImageUrl;

            if (oldImageUrl != newImageUrl)
            {
                var cloudinary = new Cloudinary();
                var deletionParams = new DeletionParams(blog.Image.PublicId);
                var result = await cloudinary.DestroyAsync(deletionParams);

                blog.Image.Url = blogInputModel.ImageUrl;
                blog.Image.PublicId = blogInputModel.ImagePublicId;
            }

            var affectedRows = await dbContext.SaveChangesAsync();
            return affectedRows > 0 ? true : false;
        }

        public async Task<int> LikeUnlikeBlogAsync(LikeBlogInputModel model)
        {
            var blog = dbContext
                .Blogs
                .Include(blog => blog.UsersLiked)
                .FirstOrDefault(b => b.Id == model.BlogId);
            var user = dbContext
                .Users
                .Include(user => user.LikedBlogs)
                .FirstOrDefault(u => u.Id == model.UserId);

            if (user.LikedBlogs.Contains(blog))
            {
                user.LikedBlogs.Remove(blog);
                blog.UsersLiked.Remove(user);
            }
            else
            {
                user.LikedBlogs.Add(blog);
                blog.UsersLiked.Add(user);
            }

            await dbContext.SaveChangesAsync();
            return blog.UsersLiked.Count;
        }

        public async Task<bool> IsLikedByUserAsync(LikeBlogInputModel model)
        {
            var isLiked = dbContext
                .Blogs
                .Include(b => b.UsersLiked)
                .FirstOrDefault(b => b.Id == model.BlogId)
                .UsersLiked
                .Any(user => user.Id == model.UserId);

            return isLiked;
        }

        public async Task<CommentReturnModel> AddComment(AddCommentInputModel model)
        {
            var comment = new Comment
            {
                AuthorId = model.UserId,
                Message = model.Comment
            };

            dbContext
                .Blogs
                .Include(b => b.Comments)
                .FirstOrDefault(b => b.Id == model.BlogId)
                .Comments.Add(comment);

            var rowsAffected = await dbContext.SaveChangesAsync();

            var commentInfo = dbContext
                .Comments
                .Where(c => c.Id == comment.Id)
                .Select(c => new CommentReturnModel
                {
                    Id = c.Id,
                    CreatedAt = c.CreatedAt.ToString("d MMM - hh:mmtt",
                                         CultureInfo.InvariantCulture),
                    Username = c.Author.UserName,
                    Comment = c.Message
                    
                })
                .FirstOrDefault();
            return commentInfo;
        }

        public async Task<IEnumerable<CommentReturnModel>> GetComments(string blogId)
        {
            var comments = dbContext
                .Blogs
                .Where(b => b.Id == blogId)
                .Include(b => b.Comments)
                .Select(b => new
                {
                    Comments = b.Comments
                        .OrderByDescending(c => c.CreatedAt)
                        .Select(c => new CommentReturnModel
                        {
                            Comment = c.Message,
                            CreatedAt = c.CreatedAt.ToString("d MMM - hh:mmtt",
                                             CultureInfo.InvariantCulture),
                            Id = c.Id,
                            Username = c.Author.UserName
                        })
                })
                .FirstOrDefault()
                .Comments;
                
            return comments;
        }

        #region Private Methods
        #endregion
    }
}
