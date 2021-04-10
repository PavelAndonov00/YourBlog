using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Attributes
{
    public class StartsWith : ValidationAttribute
    {
        private readonly string something;
        public StartsWith(string something)
        {
            this.something = something;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value.ToString().StartsWith(something))
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("Field is not valid.");
        }
    }
}
