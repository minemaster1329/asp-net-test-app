using Microsoft.EntityFrameworkCore;
using test11.Models;

namespace test11.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
        
    }
    /// <summary>
    /// Patients database set
    /// </summary>
    public DbSet<Patient> Patients { get; set; }
}