using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Hubs.Models;
using WebApi.Models.Blog.ReturnModels;

namespace WebApi.Hubs
{
    public class CommentsHub : Hub
    {
        public async Task SendComment(CommentReturnModel comment)
        {
            await Clients.All.SendAsync("ReceiveComment", comment);
        }

        public async Task NotifySomeoneWriting(bool isWriting)
        {
            await Clients.All.SendAsync("SomeoneWriting", isWriting);
        }
    }
}
