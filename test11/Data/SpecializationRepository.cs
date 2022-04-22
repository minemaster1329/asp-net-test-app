using Microsoft.EntityFrameworkCore;
using test11.Models;

namespace test11.Data;

public class SpecializationRepository : AbstractRepository<Specialization>
{
    public SpecializationRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {
    }

    public override async Task<Specialization?> GetByIdAsync(int id)
    {
        return await ApplicationDbContext.Set<Specialization>().FirstOrDefaultAsync(spec => spec.SpecializationId == id);
    }
}