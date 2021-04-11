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
using WebApi.Data.Models.Blog;
using WebApi.Models.Blog.InputModels;
using WebApi.Models.Blog.ReturnModels;
using WebApi.Services.Account;
using WebApi.Services.Blog;

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
                blog.Title,
                blog.CreatedAt
            });
        }

        [HttpPut("[action]/{blogId}")]
        [Authorize]
        public async Task<ActionResult> Edit(BlogInputModel blogInputModel, string blogId)
        {
            try
            {
                blogInputModel.Id = blogId;
                var successfull = await this.blogService.EditBlogAsync(blogInputModel);
                if(successfull)
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

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IActionResult> GetAllCut(int offset, int count)
        {
            try
            {
                IEnumerable<BlogReturnModel> blogs = null;

                var query = HttpContext.Request.Query;
                var hasParameters = query.ContainsKey("offset") && query.ContainsKey("count");
                if (hasParameters && count != 0)
                {
                    blogs = await blogService.GetAllAsync(offset, count);
                }
                else
                {
                    blogs = await blogService.GetAllAsync();
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
                if(this.User.Identity.Name != username)
                {
                    return Forbid();
                }

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
        [Authorize]
        public async Task<IActionResult> Get(string blogId)
        {
            try
            {
                var isAuthor = await blogService.IsAuthorAsync(blogId, this.User.Identity.Name);
                if(!isAuthor)
                {
                    return Forbid();
                }

                var blog = await blogService.GetBlogAsync(blogId);
                if(blog == null)
                {
                    return NotFound();
                }

                return Ok(blog);
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
                var isAuthor = await blogService.IsAuthorAsync(blogId, this.User.Identity.Name);
                if (!isAuthor && !this.User.IsInRole("Admin"))
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

    }
}
