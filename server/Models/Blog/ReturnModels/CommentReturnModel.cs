using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Blog.ReturnModels
{
    public class CommentReturnModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string CreatedAt { get; set; }

        public string Comment { get; set; }
    }
}
