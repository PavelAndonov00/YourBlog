using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Account.InputModels
{
    public class PersonalInfoInputModel
    {
        [Required]
        [MinLength(6, ErrorMessage = "bla")]
        public string FirstName { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "bla")]
        public string LastName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        public string BirthDate { get; set; }
    }
}
