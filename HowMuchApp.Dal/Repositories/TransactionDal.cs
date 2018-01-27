using HowMuchApp.Dal.GenericRepository;
using HowMuchApp.Model.EF;
using System;
using System.Collections.Generic;
using System.Text;

namespace HowMuchApp.Dal.Repositories
{
    public interface ITransactionDal : IGenericRepository<Transaction>
    {

    }
    /// <summary>
    /// Transaction data manipulation methods
    /// </summary>
    public class TransactionDal : GenericRepository<Transaction>, ITransactionDal
    {
        public TransactionDal(ApplicationContext context)
            : base(context)
        {
        }
    }
}
