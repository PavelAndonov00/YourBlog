using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Comments
{
    public interface IComment
    {
        string Id { get; set; }

        string Message { get; set; }

        DateTime CreatedAt { get; set; }
        
        string AuthorId { get; set; }

        string BlogId { get; set; }
    }
}
