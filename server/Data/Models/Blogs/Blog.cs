using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models.Comments;
using WebApi.Data.Models.Images;

namespace WebApi.Data.Models.Blogs
{
    public class Blog : IBlog
    {
        public Blog() : this(default(DateTime))
        {

        }

        public Blog(DateTime createdDate)
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = createdDate != default(DateTime) ? createdDate : DateTime.Now;
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
        [MinLength(50), MaxLength(2000)]
        public string Content { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public virtual Image Image { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public virtual ApplicationUser Author { get; set; }

        public virtual ICollection<ApplicationUser> UsersLiked { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
