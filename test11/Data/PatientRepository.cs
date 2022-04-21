using Microsoft.EntityFrameworkCore;
using test11.Models;

namespace test11.Data;

public class PatientRepository : AbstractRepository<Patient>
{
    public PatientRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext) {}
    
    public override async Task<Patient?> GetByIdAsync(int id)
    {
        return await ApplicationDbContext.Set<Patient>().FirstOrDefaultAsync(patient => patient.PatientId == id);
    }
}