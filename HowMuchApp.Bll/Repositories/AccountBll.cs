using AutoMapper;
using HowMuchApp.Dal;
using HowMuchApp.Model.Models;
using HowMuchApp.Model.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HowMuchApp.Bll.Repositories
{
    public interface IAccountBll
    {
        Task<IdentityResult> RegisterAccount(RegistrationViewModel model);
    }


    /// <summary>
    /// Account logic
    /// </summary>
    public class AccountBll : IAccountBll
    {
        private readonly IMapper _mapper;
        private IDalFactory _dalFactory;
        private readonly UserManager<AppUser> _userManager;
        public AccountBll(IMapper mapper, UserManager<AppUser> userManager,IDalFactory dalFactory)
        {
            _dalFactory = dalFactory;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<IdentityResult> RegisterAccount(RegistrationViewModel model)
        {
            AppUser userIdentity = _mapper.Map<AppUser>(model);
            IdentityResult result = await _userManager.CreateAsync(userIdentity, model.Password);
            return result;
        }


    }
}
