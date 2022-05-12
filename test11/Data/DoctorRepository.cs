using Microsoft.EntityFrameworkCore;
using test11.Exceptions;
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

    public override async Task AddAsync(Doctor entity)
    {
        if (await ApplicationDbContext.Set<Doctor>().AsQueryable()
                .AnyAsync(doctor => doctor.Pesel.Equals(entity.Pesel))) throw new DuplicatePeselEntryException("Pesel specified in this doctor entity belongs to someone else");
        await base.AddAsync(entity);
    }

    public override async Task UpdateAsync(Doctor entity)
    {
        Doctor doc = await ApplicationDbContext.Set<Doctor>().AsQueryable()
            .FirstAsync(doctor => doctor.Pesel.Equals(entity.Pesel));
        if (doc.DoctorId != entity.DoctorId) throw new DuplicatePeselEntryException("Trying to replace current doctor's pesel with existing one belonging to another one");
        await base.UpdateAsync(entity);
    }

    public override IQueryable<Doctor> GetAll()
    {
        return ApplicationDbContext.Set<Doctor>().Include(x => x.Specialization).AsNoTracking();
    }
}