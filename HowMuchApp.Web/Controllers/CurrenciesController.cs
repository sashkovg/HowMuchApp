using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HowMuchApp_Web.Web.Controllers;
using HowMuchApp.Bll;
using HowMuchApp.Web.Model;
using HowMuchApp.Bll.Repositories;
using HowMuchApp.Model.ViewModels;

namespace HowMuchApp.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Currencies")]
    public class CurrenciesController : BaseController
    {
        private ICurrencyBll _currencyBll;
        public CurrenciesController(IBllFactory bllFactory) : base(bllFactory)
        {
            _currencyBll = bllFactory.CurrencyBll;
        }

        [HttpPost]
        [Route("GetExhangeRates")]
        public async Task<ExchangeRateViewModel> GetExhangeRates([FromBody]ExhangeRateRequestViewModel request)
        {
            try
            {
                ExchangeRateViewModel result = await _currencyBll.GetExchangeRate(request.Currency, request.DateOn);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Ошибка при регистрации нового аккаунта" + ex.Message + ex.InnerException);
            }

        }
    }

   
}