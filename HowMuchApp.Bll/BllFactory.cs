using AutoMapper;
using HowMuchApp.Bll.Repositories;
using HowMuchApp.Dal;
using HowMuchApp.Model.Models;
using Microsoft.AspNetCore.Identity;
using System;

namespace HowMuchApp.Bll
{
    public interface IBllFactory
    {
        IAccountBll AccountBll { get; }
    }

    public class BllFactory : IBllFactory
    {
        private IAccountBll _accountBll;



        private IDalFactory _dalFactory;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public BllFactory(IDalFactory dalFactory, IMapper mapper, UserManager<AppUser> userManager)
        {
            _dalFactory = dalFactory;
            _mapper = mapper;
            _userManager = userManager;
        }

        public IAccountBll AccountBll => _accountBll ?? (_accountBll = new AccountBll( _mapper, _userManager, _dalFactory));
    }
}
