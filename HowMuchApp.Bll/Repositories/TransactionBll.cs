using HowMuchApp.Dal;
using HowMuchApp.Model.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HowMuchApp.Bll.Repositories
{
    public interface ITransactionBll
    {
        IQueryable<Transaction> GetAll();
    }
    /// <summary>
    /// Transaction logic
    /// </summary>
    public class TransactionBll:ITransactionBll
    {
        private IDalFactory _dalFactory;

        public TransactionBll( IDalFactory dalFactory)
        {
            _dalFactory = dalFactory;
        }

        /// <summary>
        /// Get all (not daleted) transactions
        /// </summary>
        /// <returns></returns>
        public  IQueryable<Transaction> GetAll()
        {
            return _dalFactory.TransactionDal.FindBy(x => x.Date_delete == null)
                .Include(x => x.User_Account).ThenInclude(x => x.Identity)
                .Include(x => x.User_Account).ThenInclude(x => x.Account);
        }
    }
}
