using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Models;

namespace test11;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        // using var context =
        //     new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());
        // if (context.Patients.Any()) return;
        // context.Patients.Add(new Patient()
        //     {Name = "Jane", Surname = "Doe", Email = "", Pesel = "97082148966", MiddleName = "", Gender = Gender.Female});
        //
        // context.Patients.Add(new Patient()
        //     {Name = "John", Surname = "Kramer", Email = "", Pesel = "00212716584", MiddleName = "", Gender = Gender.Male});
        //
        // context.SaveChanges();
    }
}