using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Blog.InputModels
{
    public class AddCommentInputModel
    {
        [Required]
        public string BlogId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}
