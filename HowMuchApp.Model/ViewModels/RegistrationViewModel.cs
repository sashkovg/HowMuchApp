using System;
using System.Collections.Generic;
using System.Text;

namespace HowMuchApp.Model.ViewModels
{
    public class RegistrationViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
