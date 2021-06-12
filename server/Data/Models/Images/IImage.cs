using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Images
{
    public interface IImage
    {
        public string Id { get; set; }

        public string Url { get; set; }

        public string PublicId { get; set; }
    }
}
