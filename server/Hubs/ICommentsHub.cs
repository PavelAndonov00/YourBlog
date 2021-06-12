using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Hubs.Models;

namespace WebApi.Hubs
{
    public interface ICommentsHub
    {
        Task SendComment(Comment comment);

        Task NotifySomeoneWriting(bool isWriting);
    }
}
