using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Models;

namespace test11.Services;

public class DoctorService : IDoctorService
{
    private readonly IRepository<Doctor> _doctorsRepository;

    public DoctorService(IRepository<Doctor> doctorsRepository)
    {
        _doctorsRepository = doctorsRepository;
    }

    public async Task<IList<Doctor>> GetAllDoctors()
    {
        return await _doctorsRepository.GetAll().ToListAsync();
    }
}