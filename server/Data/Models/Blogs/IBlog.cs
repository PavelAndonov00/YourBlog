using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Blogs
{
    public interface IBlog
    {
        string Id { get; set; }

        string Title { get; set; }

        string Description { get; set; }

        string Content { get; set; }

        string AuthorId { get; set; }
    }
}
