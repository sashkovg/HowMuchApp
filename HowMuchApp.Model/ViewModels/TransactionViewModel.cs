using System;
using System.Collections.Generic;
using System.Text;

namespace HowMuchApp.Model.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        public string User { get; set; }
        public DateTime Date_create { get; set; }
        public DateTime? Date_delete { get; set; }
    }
}
