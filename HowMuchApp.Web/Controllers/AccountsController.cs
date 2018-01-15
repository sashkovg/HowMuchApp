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

namespace HowMuchApp_Web.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountsController : BaseController
    {
        private IAccountBll _accountBll;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ApplicationContext _appDbContext;
        public AccountsController(IBllFactory bllFactory, UserManager<AppUser> userManager, IMapper mapper, ApplicationContext appDbContext) : base(bllFactory)
        {
            if(bllFactory== null)
                throw new Exception("IBllFactory");
            _accountBll = bllFactory.AccountBll;
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
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
                    return new BadRequestObjectResult(Errors.AddErrorToModelState("ConfirmPassword", "Пароли не совпадают", ModelState));

                // check email
                //if(!new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").Match(model.Email).Success)
                //{
                //    return new BadRequestObjectResult(Errors.AddErrorToModelState("UserName", "Введенное значение не имеет формат Email", ModelState));
                //}

                IdentityResult result = await _accountBll.RegisterAccount(model);

                if (!result.Succeeded)
                    return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

               

                //await _appDbContext.Customers.AddAsync(new Customer { IdentityId = "234234", Location = "234234" });
                //await _appDbContext.SaveChangesAsync();

                return new OkObjectResult("Account created");
            }
            catch(Exception)
            {
                throw new Exception("Ошибка при регистрации нового аккаунта");
            }
           
        }
    }
}
