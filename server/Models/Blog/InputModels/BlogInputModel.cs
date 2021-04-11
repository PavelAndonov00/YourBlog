using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Attributes;

namespace WebApi.Models.Blog.InputModels
{
    public class BlogInputModel
    {
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

        [MaxLength(200)]
        [StartsWith("https://res.cloudinary.com")]
        public string ImageUrl { get; set; }

        public string AuthorId { get; set; }
    }
}
