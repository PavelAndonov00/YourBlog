﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models.Blog;
using WebApi.Models.Blog.InputModels;
using WebApi.Models.Blog.ReturnModels;

namespace WebApi.Services.Blog
{
    public interface IBlogService
    {
        Task<Data.Models.Blog.Blog> CreateBlogAsync(BlogInputModel blogInputModel);

        Task<bool> EditBlogAsync(BlogInputModel blogInputModel);

        Task<BlogReturnModel> GetBlogAsync(string blogId);

        Task<IEnumerable<BlogReturnModel>> GetAllWithoutLoggedUserAsync(int offset, int count, string loggedUserId);

        Task<IEnumerable<BlogReturnModel>> GetAllByAuthorAsync(string authorId);

        Task<bool> IsAuthorAsync(string blogId, string username);

        Task<bool> DeleteBlogAsync(string blogId);

        Task<int> LikeUnlikeBlogAsync(LikeBlogInputModel model);

        Task<bool> IsLikedByUserAsync(LikeBlogInputModel model);
    }
}
