using test11.Models;
using test11.ViewModels;

namespace test11.Services;

public interface IDoctorService
{
    public Task<IList<Doctor>> GetAllDoctorsWithSpecialization();

    public Task AddNewDoctorAsync(NewDoctorViewModel newDoctorViewModel);

    public Task AddNewDoctorWithSpecializationName(
        NewDoctorWithSpecializationName newDoctorWithSpecializationName);
}