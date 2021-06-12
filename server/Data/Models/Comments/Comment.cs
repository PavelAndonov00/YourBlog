using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models.Blogs;

namespace WebApi.Data.Models.Comments
{
    public class Comment : IComment
    {
        public Comment()
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = DateTime.Now;
        }

        [Key]
        public string Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Message { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }

        [Required]
        public string BlogId { get; set; }
        public Blog Blog{ get; set; }
    }
}
