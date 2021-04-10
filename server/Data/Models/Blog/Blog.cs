using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Blog
{
    public class Blog : IBlog
    {
        public Blog()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }
        
        [Required]
        [MinLength(10), MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MinLength(10), MaxLength(200)]
        public string Description { get; set; }

        [Required]
        [StringLength(200)]
        public string ImageUrl { get; set; }

        [Required]
        [MinLength(50), MaxLength(2000)]
        public string Content { get; set; }

        public string AuthorId { get; set; }

        public ApplicationUser Author { get; set; }
    }
}
