using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Images
{
    public interface IImage
    {
        string Id { get; set; }

        string Url { get; set; }

        string PublicId { get; set; }

        string BlogId { get; set; }
    }
}
