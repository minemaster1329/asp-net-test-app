using test11.Models;

namespace test11.Services;

public interface ISpecializationService
{
    public Task<IList<Specialization>> GetAllSpecializations();

    public Task<Specialization?> GetById(int id);
}