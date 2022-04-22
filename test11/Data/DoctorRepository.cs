using Microsoft.EntityFrameworkCore;
using test11.Models;

namespace test11.Data;

public class DoctorRepository : AbstractRepository<Doctor>
{
    public DoctorRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {
    }

    public override async Task<Doctor?> GetByIdAsync(int id)
    {
        return await ApplicationDbContext.Set<Doctor>().FirstOrDefaultAsync(d => d.DoctorId == id);
    }

    public override IQueryable<Doctor> GetAll()
    {
        return ApplicationDbContext.Set<Doctor>().Include(x => x.Specialization).AsNoTracking();
    }
}