using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HowMuchApp.Web
{
    public class ExchangeRateViewModel
    {
        public decimal Cur_ID { get; set; }
        public DateTime Date { get; set; }
        public string Cur_Abbreviation { get; set; }
        public int Cur_Scale { get; set; }
        public string Cur_Name { get; set; }
        public decimal Cur_OfficialRate { get; set; }
    }
}
