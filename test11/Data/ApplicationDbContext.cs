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
    
    public DbSet<Doctor> Doctor { get; set; }
    
    public DbSet<Visit> Visit { get; set; }
    
    public DbSet<Specialization> Specialization { get; set; }
}