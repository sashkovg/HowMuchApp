using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HowMuchApp.Model.Models;
using System;

namespace HowMuchApp.Model.EF
{
    public class ApplicationContext : IdentityDbContext<AppUser>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            
        }
        public ApplicationContext() : base() { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<User_Account> User_Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }

    public class Account
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public DateTime Date_create { get; set; }
        public DateTime ? Date_delete { get; set; }
    }

    public class User_Account
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
        public Account Account { get; set; }  // navigation property
        public DateTime Date_create { get; set; }
        public DateTime ? Date_delete { get; set; }
    }

    public class Transaction
    {
        public int Id { get; set; }
        public int User_AccountId { get; set; }
        public User_Account User_Account { get; set; }  // navigation property
        public DateTime Date_create { get; set; }
        public DateTime ? Date_delete { get; set; }
    }


}
