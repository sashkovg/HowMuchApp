using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HowMuchApp.Model.ViewModels;
using HowMuchApp.Bll;
using HowMuchApp.Bll.Repositories;
using WalletApp.Web.Helpers;
using Microsoft.AspNetCore.Identity;
using HowMuchApp.Model.Models;
using AutoMapper;
using System.Text.RegularExpressions;
using HowMuchApp_Web.Web.Controllers;
using HowMuchApp.Model.EF;
using HowMuchApp.Web.Auth;
using HowMuchApp.Web.Model;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;

namespace HowMuchApp_Web.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountsController : BaseController
    {
        private IAccountBll _accountBll;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly UserManager<AppUser> _userManager;
        public AccountsController(IBllFactory bllFactory, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions, UserManager<AppUser> userManager) : base(bllFactory)
        {
            if (bllFactory == null)
                throw new Exception("IBllFactory");
            _accountBll = bllFactory.AccountBll;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody]RegistrationViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if password equals confirmPassword
                if (model.Password != model.ConfirmPassword)
                    return new BadRequestObjectResult(Errors.AddErrorToModelState("Confirm", "Пароли не совпадают", ModelState));

                // check email
                //if(!new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").Match(model.Email).Success)
                //{
                //    return new BadRequestObjectResult(Errors.AddErrorToModelState("UserName", "Введенное значение не имеет формат Email", ModelState));
                //}

                IdentityResult result = await _accountBll.RegisterAccount(model);

                if (!result.Succeeded)
                    return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

                return new OkObjectResult("Account created");
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при регистрации нового аккаунта" + ex.Message + ex.InnerException);
            }

        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }


}
