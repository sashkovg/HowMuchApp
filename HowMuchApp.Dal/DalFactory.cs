using HowMuchApp.Dal.GenericRepository;
using HowMuchApp.Dal.Repositories;
using HowMuchApp.Model.EF;
using System;

namespace HowMuchApp.Dal
{
    public interface IDalFactory
    {
        ITransactionDal  TransactionDal { get; }
    }
    public class DalFactory : IDalFactory
    {
        private ApplicationContext _context;
        public DalFactory(ApplicationContext context)
        {
            _context = context;
        }

        private ITransactionDal _transactionDal;
        public ITransactionDal TransactionDal => _transactionDal ?? (_transactionDal = new TransactionDal(_context));
    }
}
