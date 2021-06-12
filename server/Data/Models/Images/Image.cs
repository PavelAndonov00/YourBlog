using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Models.Images
{
    public class Image : IImage
    {
        public Image()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [StringLength(200)]
        public string Url { get; set; }

        public string PublicId { get; set; }
    }
}
