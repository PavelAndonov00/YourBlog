﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Configuration;
using WebApi.Data;
using WebApi.Models.Account.InputModels;
using WebApi.Services.Account;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly JwtSettings jwtSettings;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IAccountService accountService;
        private readonly string USER_ROLE = "User";

        public AccountController(IOptions<JwtSettings> jwtSettings, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, SignInManager<ApplicationUser> signInManager, IAccountService accountService)
        {
            this.jwtSettings = jwtSettings.Value;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.accountService = accountService;
        }

        [HttpGet("[action]")]
        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult<string>> test()
        {
            return Content("test");
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(LoginInputModel model)
        {
            try
            {
                var user = await GetUserAsync(model.Username);
                var isPasswordValid = await CheckPasswordAsync(user, model.Password);
                if (isPasswordValid)
                {
                    var jwt = GenerateToken(model.Username, USER_ROLE);
                    var extracted = new { user.Id, user.Email, user.UserName, user.PhoneNumber, IsLogged = true };

                    return this.Ok(new { Success = "You have successfully logged in!", Token = jwt, User = extracted });
                }
            }
            catch (InvalidOperationException ioe)
            {
               // Exception should be handled 
            }

            return this.Ok(new { Error = "Invalid username or password" });
        }

        

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(RegisterInputModel model)
        {
            var user = new ApplicationUser() { UserName = model.Username, Email = model.Email };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Created("/Account/Register", new { Success = true, Message = "You have successfully registered!" });
            }

            return this.Ok(result.Errors);
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult<string>> ResetPassword(ResetPasswordInputModel model)
        {
            try
            {
                var user = await GetUserAsync(this.User.Identity.Name);
                bool isPasswordValid = await CheckPasswordAsync(user, model.OldPassword);
                if (isPasswordValid)
                {
                    var token = await userManager.GeneratePasswordResetTokenAsync(user);
                    var changeResult = await userManager.ResetPasswordAsync(user, token, model.NewPassword);

                    if (changeResult.Succeeded)
                    {
                        return Ok(new { Success = true, Message = "You have successfully changed your password!" });
                    }
                    else
                    {
                        return Ok(new { Error = "Oops something went wrong!" });
                    }
                }
            }
            catch (InvalidOperationException ioe)
            {
                // Exception should be handled
            }

            return Ok(new { Error = "Invalid password!" });
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult<string>> ChangeEmail(ChangeEmailInputModel model)
        {
            try
            {
                var user = await GetUserAsync(this.User.Identity.Name);
                bool isPasswordValid = await CheckPasswordAsync(user, model.Password);
                if (isPasswordValid)
                {
                    var token = await userManager.GenerateChangeEmailTokenAsync(user, model.NewEmail);
                    var changeResult = await userManager.ChangeEmailAsync(user, model.NewEmail, token);

                    if (changeResult.Succeeded)
                    {
                        return Ok(new { Success = true, Message = "You have successfully changed your email!" });
                    }
                    else
                    {
                        return Ok(new { Error = "Oops something went wrong!" });
                    }
                }
            }
            catch (InvalidOperationException ioe)
            {
                // Exception should be handled
            }

            return Ok(new { Error = "Invalid password!" });
        }

        #region Private Methods
        private async Task<ApplicationUser> GetUserAsync(string username)
        {
            return await accountService.GetUserByUsernameOrEmailAsync(username);
        }

        private async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
        {
            return await userManager.CheckPasswordAsync(user, password);
        }

        private string GenerateToken(string username, string role)
        {
            var key = Encoding.UTF8.GetBytes(this.jwtSettings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }
        #endregion
    }
}
