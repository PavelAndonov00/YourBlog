using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Account.InputModels
{
    public class LoginInputModel
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
