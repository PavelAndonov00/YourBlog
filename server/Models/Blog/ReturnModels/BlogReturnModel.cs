﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Blog.ReturnModels
{
    public class BlogReturnModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Content { get; set; }

        public string CreatedAt { get; set; }

        public string AuthorId { get; set; }

        public string AuthorName { get; set; }
    }
}
