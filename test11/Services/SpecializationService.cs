using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Models;

namespace test11.Services;

public class SpecializationService : ISpecializationService
{
    private readonly IRepository<Specialization> _specializationRepository;

    public SpecializationService(IRepository<Specialization> specializationRepository)
    {
        _specializationRepository = specializationRepository;
    }

    public async Task<IList<Specialization>> GetAllSpecializations()
    {
        return await _specializationRepository.GetAll().ToListAsync();
    }

    public async Task<Specialization?> GetById(int id)
    {
        return await _specializationRepository.GetByIdAsync(id);
    }

    public async Task AddNewSpecialization(Specialization spec)
    {
        await _specializationRepository.AddAsync(spec);
    }
}