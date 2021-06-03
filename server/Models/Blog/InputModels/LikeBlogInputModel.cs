using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Blog.InputModels
{
    public class LikeBlogInputModel
    {
        public string UserId { get; set; }

        public string BlogId { get; set; }
    }
}
