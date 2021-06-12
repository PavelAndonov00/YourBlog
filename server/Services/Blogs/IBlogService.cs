using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models.Blogs;
using WebApi.Models.Blog.InputModels;
using WebApi.Models.Blog.ReturnModels;

namespace WebApi.Services.Blogs
{
    public interface IBlogService
    {
        Task<Blog> CreateBlogAsync(BlogInputModel blogInputModel);

        Task<bool> EditBlogAsync(BlogInputModel blogInputModel);

        Task<BlogReturnModel> GetBlogAsync(string blogId);

        Task<IEnumerable<BlogReturnModel>> GetAllWithoutLoggedUserAsync(int offset, int count, string loggedUserId);

        Task<IEnumerable<BlogReturnModel>> GetAllByAuthorAsync(string authorId);

        Task<bool> IsAuthorAsync(string blogId, string username);

        Task<bool> DeleteBlogAsync(string blogId);

        Task<int> LikeUnlikeBlogAsync(LikeBlogInputModel model);

        Task<bool> IsLikedByUserAsync(LikeBlogInputModel model);

        Task<CommentReturnModel> AddComment(AddCommentInputModel model);

        Task<IEnumerable<CommentReturnModel>> GetComments(string blogId);
    }
}
