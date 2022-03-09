using Microsoft.EntityFrameworkCore;
using test11.Models;

namespace test11;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Patient> Patients { get; set; }
}