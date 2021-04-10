using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Data.Models.Blog;
using WebApi.Models.Blog.InputModels;
using WebApi.Services.Blog;

namespace WebApi.Controllers
{
    public class BlogController : ApiControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IBlogService blogService;

        public BlogController(UserManager<ApplicationUser> userManager, IBlogService blogService)
        {
            this.userManager = userManager;
            this.blogService = blogService;
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult> Create(BlogInputModel blogInputModel)
        {
            Blog blog = new Blog { };
            try
            {
                blog = await this.blogService.CreateBlogAsync(blogInputModel);
            }
            catch (Exception e)
            {
                return NotFound(new { Error = "Oops something went wrong." });
            }

            return Ok(new
            {
                blog.Id,
                blog.ImageUrl,
                blog.Content,
                blog.Description,
                blog.AuthorId,
                blog.Title
            });
        }
    }
}
