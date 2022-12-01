using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

public class Context : DbContext
{
        public Context (DbContextOptions<Context> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Soft delete configuration
            modelBuilder.Entity<Company>().HasQueryFilter(p => !p.Deleted);
            modelBuilder.Entity<Service>().HasQueryFilter(p => !p.Deleted);
            modelBuilder.Entity<Review>().HasQueryFilter(p => !p.Deleted);
            modelBuilder.Entity<User>().HasQueryFilter(p => !p.Deleted);

        var converter = new EnumToStringConverter<Role>();
        modelBuilder.Entity<User>().Ignore(c => c.Roles);
        modelBuilder.Entity<User>().Property(c => c.Roles).HasConversion(
                e => e.ConvertAll(v => v.ToString()).Aggregate((a, b) => a + " " + b),
                e => e.Split().ToList().ConvertAll(v => (Role)Enum.Parse(typeof(Role), v))
            );
        }


public DbSet<backend.Models.Service> Service { get; set; } = default!;

        public DbSet<backend.Models.Review> Review { get; set; } = default!;

        public DbSet<backend.Models.Company> Company { get; set; } = default!;

        public DbSet<backend.Models.User> User { get; set; } = default!;
}
