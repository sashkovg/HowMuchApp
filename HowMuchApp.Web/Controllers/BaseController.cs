using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HowMuchApp.Bll;

namespace HowMuchApp_Web.Web.Controllers
{
    public class BaseController : Controller
    {
        protected IBllFactory BllFactory;
        public BaseController(IBllFactory bllFactory)
        {
            BllFactory = bllFactory;
        } 
    }
}