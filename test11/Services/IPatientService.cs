using test11.Models;

namespace test11.Services;

public interface IPatientService
{
    public Task AddNewPatient(string pesel, string name, string surname, string middleName, string email, int gender);

    public Task UpdatePatient(int id,Patient pt);

    public Task DeletePatient(int id);

    public Task<Patient?> GetPatientById(int id);

    public Task<IList<Patient>> GetAllPatients();
}