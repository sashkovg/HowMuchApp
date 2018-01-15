using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using HowMuchApp.Model.Models;

namespace HowMuchApp.Model.ViewModels.Mappings
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegistrationViewModel, AppUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}
