using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HowMuchApp_Web.Web.Controllers;
using HowMuchApp.Bll;
using HowMuchApp.Bll.Repositories;
using HowMuchApp.Model.EF;
using AutoMapper;
using HowMuchApp.Model.ViewModels;

namespace HowMuchApp.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Transaction")]
    public class TransactionController : BaseController
    {
        readonly ITransactionBll _transactionBll;
        IMapper  _mapper;
        public TransactionController(IBllFactory bllFactory, IMapper mapper) : base(bllFactory)
        {
            _transactionBll = bllFactory.TransactionBll;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("GetAllTransactions")]
        public async Task<IEnumerable<TransactionViewModel>> GetAll()
        {
            try
            {
                IEnumerable<Transaction> resultDb =  _transactionBll.GetAll().ToList();
                var resultDto = _mapper.Map<IEnumerable<Transaction>, List<TransactionViewModel>>(resultDb);
                return resultDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при получении списка транзакций. " + ex.Message + ex.InnerException);
            }

        }
    }
}