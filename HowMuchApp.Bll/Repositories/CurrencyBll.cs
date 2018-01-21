using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using HowMuchApp.Dal;
using System.Net.Http;
using System.Threading.Tasks;
using HowMuchApp.Model.ViewModels;

namespace HowMuchApp.Bll.Repositories
{
    public interface ICurrencyBll
    {
        Task<ExchangeRateViewModel> GetExchangeRate(string currency, DateTime date);
    }
    public class CurrencyBll: ICurrencyBll
    {
        private IMapper _mapper;
        private IDalFactory _dalFactory;

        public CurrencyBll(IMapper mapper, IDalFactory dalFactory)
        {
            _mapper = mapper;
            _dalFactory = dalFactory;
        }

        /// <summary>
        /// Get Exxhange rate for specific currency
        /// </summary>
        /// <param name="currency"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        public async Task<ExchangeRateViewModel>  GetExchangeRate(string currency, DateTime date)
        {
            string dateParam = $"{date.Year}-{date.Month}-{date.Day}";
            using (var client = new HttpClient())
            {
                using (var r = await client.GetAsync(new Uri("http://www.nbrb.by/API/ExRates/Rates?onDate="+dateParam+"&Periodicity=0")))
                {
                    r.EnsureSuccessStatusCode();
                    string resultJson = await r.Content.ReadAsStringAsync();
                    List<ExchangeRateViewModel> result = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ExchangeRateViewModel>>(resultJson);
                    return result.Find(x=>x.Cur_Abbreviation.ToLower() == currency.ToLower());
                }
            }
        }
    }
}
