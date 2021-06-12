using Microsoft.AspNetCore.Authentication.JwtBearer;
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebApi.Configuration;
using WebApi.Data;
using WebApi.Models.Account.InputModels;
using WebApi.Services.Accounts;

namespace WebApi.Controllers
{
    public class AccountController : ApiControllerBase
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
            return this.userManager.GetUserId(this.User);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(LoginInputModel model)
        {
            try
            {
                var user = await _GetUserAsync(model.Username);
                var isPasswordValid = await _CheckPasswordAsync(user, model.Password);
                if (isPasswordValid)
                {
                    var jwt = _GenerateToken(model.Username, USER_ROLE);
                    var extracted = new
                    {
                        user.Id,
                        user.FirstName,
                        user.LastName,
                        user.Email,
                        user.UserName,
                        user.PhoneNumber,
                        IsLogged = true,
                        Role = "User",
                        Token = jwt
                    };

                    return this.Ok(new { Success = "You have successfully logged in!", User = extracted });
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
                return Created("/Account/Login", new { Success = true, Message = "You have successfully registered!" });
            }

            return this.Ok(result.Errors);
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult<string>> ResetPassword(ResetPasswordInputModel model)
        {
            try
            {
                var user = await _GetUserAsync(this.User.Identity.Name);
                bool isPasswordValid = await _CheckPasswordAsync(user, model.OldPassword);
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
                var user = await _GetUserAsync(this.User.Identity.Name);
                bool isPasswordValid = await _CheckPasswordAsync(user, model.Password);
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

        [HttpGet("[action]")]
        [Authorize]
        public async Task<ActionResult<string>> GetPersonalInfo()
        {
            try
            {
                var user = await _GetUserAsync(this.User.Identity.Name);

                string birthDate = string.Empty;
                if (user.BirthDate.HasValue)
                {
                    birthDate = user.BirthDate.Value.ToString("yyyy-MM-dd");
                }

                var data = new PersonalInfoInputModel()
                {
                    FirstName = user.FirstName == null ? "" : user.FirstName,
                    LastName = user.LastName == null ? "" : user.LastName,
                    PhoneNumber = user.PhoneNumber == null ? "" : user.PhoneNumber,
                    BirthDate = birthDate
                };

                return Ok(new { Success = true, data });
            }
            catch (InvalidOperationException ioe)
            {
                // Exception should be handled
            }

            return Ok(new { Error = "Oops something went wrong." });
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ActionResult<string>> UpdatePersonalInfo(PersonalInfoInputModel model)
        {
            try
            {
                var user = await _GetUserAsync(this.User.Identity.Name);

                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.PhoneNumber = model.PhoneNumber;

                var input = model.BirthDate
                    ?.Split("-");
                if (input != null && input.Length > 1)
                {
                    var dateTokens = input
                        .Select(int.Parse)
                        .ToArray();
                    var year = dateTokens[0];
                    var month = dateTokens[1];
                    var day = dateTokens[2];
                    user.BirthDate = new DateTime(year, month, day);
                }

                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok(new { Success = true, Message = "You have successfully updated your info." });
                }
            }
            catch (InvalidOperationException ioe)
            {
                // handle
            }

            return Ok(new { Error = "Oops something went wrong." });
        }

        #region Private Methods
        private async Task<ApplicationUser> _GetUserAsync(string username)
        {
            return await accountService.GetUserByUsernameOrEmailAsync(username);
        }

        private async Task<bool> _CheckPasswordAsync(ApplicationUser user, string password)
        {
            return await userManager.CheckPasswordAsync(user, password);
        }

        private string _GenerateToken(string username, string role)
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
                Expires = DateTime.UtcNow.AddDays(15),
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
