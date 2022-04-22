using test11.Models;

namespace test11.Services;

public interface IDoctorService
{
    public Task<IList<Doctor>> GetAllDoctors();
}