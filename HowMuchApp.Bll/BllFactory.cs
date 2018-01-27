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
        ICurrencyBll CurrencyBll { get; }

        ITransactionBll TransactionBll { get; }
    }

    public class BllFactory : IBllFactory
    {
        private IAccountBll _accountBll;
        private ICurrencyBll _currencyBll;
        private ITransactionBll _transactionBll;

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

        public ICurrencyBll CurrencyBll => _currencyBll ?? (_currencyBll = new CurrencyBll(_mapper, _dalFactory));

        public ITransactionBll TransactionBll => _transactionBll ?? (_transactionBll = new TransactionBll(_dalFactory));
    }
}
