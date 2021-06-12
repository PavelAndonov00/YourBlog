using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Data.Models.Blogs;
using WebApi.Data.Models.Comments;
using WebApi.Data.Models.Images;

namespace WebApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {

        }

        public DbSet<Blog> Blogs { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Comment> Comments{ get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>(entity =>
            {
                entity
                .HasMany(e => e.LikedBlogs)
                .WithMany(x => x.UsersLiked);
            });

            builder.Entity<ApplicationUser>(entity =>
            {
                entity
                .HasMany(e => e.Blogs)
                .WithOne(x => x.Author)
                .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
