using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Blog
{
    public interface IBlog
    {
        string Id { get; set; }

        string Title { get; set; }

        string Description { get; set; }

        string ImageUrl { get; set; }

        string Content { get; set; }

        string AuthorId { get; set; }
    }
}
