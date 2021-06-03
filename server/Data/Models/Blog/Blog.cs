using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Blog
{
    public class Blog : IBlog
    {
        public Blog()
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = DateTime.Now;
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

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public virtual ApplicationUser Author { get; set; }

        public virtual ICollection<ApplicationUser> UsersLiked { get; set; }
    }
}
