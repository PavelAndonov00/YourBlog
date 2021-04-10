using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models.Blog;

namespace WebApi.Data
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {

        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? BirthDate { get; set; }

        public virtual ICollection<Blog> Blogs { get; set; }
    }
}
