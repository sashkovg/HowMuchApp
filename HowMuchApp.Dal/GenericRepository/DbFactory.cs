using HowMuchApp.Model.EF;
using System;
using System.Collections.Generic;
using System.Text;

namespace HowMuchApp.Dal.GenericRepository
{
    public interface IDbFactory
    {
        ApplicationContext Init();
    }

    public class DbFactory : IDisposable, IDbFactory
    {
        ApplicationContext _dbContext;
        ApplicationContext _dbContext2;

        public DbFactory (ApplicationContext context)
        {
            _dbContext = context;
        }
        public void Dispose()
        {
            if (_dbContext != null)
                _dbContext.Dispose();
        }

        public ApplicationContext Init()
        {
            return _dbContext;
        }
    }
}
