using boxon_project.Models;
using Microsoft.EntityFrameworkCore;

namespace boxon_project.DataAccess
{
    public class DBContext : DbContext
    {
        public DbSet<ArticleModel> Article { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {   
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(@"Server=.;Database=boxonProjectYousaf;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }
}
