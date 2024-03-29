﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Data.Models.Blogs;
using WebApi.Models.Blog.InputModels;
using WebApi.Models.Blog.ReturnModels;
using WebApi.Services.Accounts;
using WebApi.Services.Blogs;

namespace WebApi.Controllers
{
    public class BlogController : ApiControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IBlogService blogService;
        private readonly IAccountService accountService;

        public BlogController(UserManager<ApplicationUser> userManager, IBlogService blogService, IAccountService accountService)
        {
            this.userManager = userManager;
            this.blogService = blogService;
            this.accountService = accountService;
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult> Create(BlogInputModel blogInputModel)
        {
            Blog blog = new Blog();
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
                Success = true,
                blog.Id,
                blog.Image.Url,
                blog.Content,
                blog.Description,
                blog.AuthorId,
                blog.Title,
                blog.CreatedAt
            });
        }

        [HttpGet("[action]/{userId?}")]
        public async Task<IActionResult> GetAllCut(int offset, int count, string userId)
        {
            try
            {
                IEnumerable<BlogReturnModel> blogs = Enumerable.Empty<BlogReturnModel>();

                var query = HttpContext.Request.Query;
                var hasParameters = query.ContainsKey("offset") && query.ContainsKey("count");
                if (hasParameters && count != 0)
                {
                    blogs = await blogService.GetAllWithoutLoggedUserAsync(offset, count, userId);
                }

                return Ok(blogs);
            }
            catch (Exception e)
            {
                //
            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpGet("[action]/{username}")]
        [Authorize]
        public async Task<IActionResult> GetAll(string username)
        {
            try
            {
                var blogs = await blogService.GetAllByAuthorAsync(username);
                return Ok(blogs == null ? Enumerable.Empty<Blog>() : blogs);
            }
            catch (Exception e)
            {
                //
            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpGet("[action]/{blogId}")]
        public async Task<IActionResult> Get(string blogId)
        {
            try
            {
                var blog = await blogService.GetBlogAsync(blogId);
                if (blog != null)
                {
                    return Ok(blog);
                }
            }
            catch (Exception e)
            {
                //
            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpPut("[action]/{blogId}")]
        [Authorize]
        public async Task<ActionResult> Edit(BlogInputModel blogInputModel, string blogId)
        {
            try
            {
                var isAuthorOrAdmin = await IsAuthorOrAdmin(blogId, this.User.Identity.Name);
                if (!isAuthorOrAdmin)
                {
                    return Forbid();
                }

                blogInputModel.Id = blogId;
                var successfull = await this.blogService.EditBlogAsync(blogInputModel);
                if (successfull)
                {
                    return Ok(new { Success = true, Message = "You have successfully edited your post." });
                }
            }
            catch (Exception e)
            {
                //
            }

            return NotFound(new { Error = "Oops something went wrong." });
        }



        [HttpDelete("[action]/{blogId}")]
        [Authorize]
        public async Task<IActionResult> Delete(string blogId)
        {
            try
            {
                var isAuthorOrAdmin = await IsAuthorOrAdmin(blogId, this.User.Identity.Name);
                if (!isAuthorOrAdmin)
                {
                    return Forbid();
                }

                var successfull = await blogService.DeleteBlogAsync(blogId);
                if (successfull)
                {
                    return Ok(new { Success = true, Message = "You have successfully deleted the blog!" });
                }
            }
            catch (Exception e)
            {
                //
            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> LikeUnlikeBlog(LikeBlogInputModel model)
        {
            try
            {
                var likes = await this.blogService.LikeUnlikeBlogAsync(model);
                return Ok(new { Likes = likes });
            }
            catch (Exception e)
            {
            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> IsLikedByUser(LikeBlogInputModel model)
        {
            try
            {
                var liked = await this.blogService.IsLikedByUserAsync(model);

                return Ok(new { Liked = liked });
            }
            catch (Exception e)
            {

            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> AddComment(AddCommentInputModel model)
        {
            try
            {
                var commentInfo = await this.blogService.AddComment(model);

                return Ok(commentInfo);
            }
            catch (Exception e)
            {

            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        [HttpGet("[action]/{blogId}")]
        [Authorize]
        public async Task<IActionResult> Comments(string blogId)
        {
            try
            {
                var comments = await this.blogService.GetComments(blogId);

                return Ok(comments);
            }
            catch (Exception e)
            {

            }

            return NotFound(new { Error = "Oops something went wrong." });
        }

        private async Task<bool> IsAuthorOrAdmin(string blogId, string username)
        {
            var isAuthor = await blogService.IsAuthorAsync(blogId, username);
            if (isAuthor || this.User.IsInRole("Admin"))
            {
                return true;
            }

            return false;
        }
    }
}
