using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Account.InputModels
{
    public class ChangeEmailInputModel
    {
        [Required]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string NewEmail { get; set; }

        [Required]
        [EmailAddress]
        [Compare(nameof(NewEmail), ErrorMessage = "Emails do not match.")]
        public string ConfirmNewEmail { get; set; }
    }
}
