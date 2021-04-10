using System;
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

        Task<IEnumerable<BlogReturnModel>> GetAllByAuthorAsync(string authorId);
    }
}
