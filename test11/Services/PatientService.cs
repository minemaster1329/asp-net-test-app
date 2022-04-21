using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Models;

namespace test11.Services;

public class PatientService : IPatientService
{
    private readonly IRepository<Patient> _patientRepository;

    public PatientService(IRepository<Patient> patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task AddNewPatient(string pesel, string name, string surname, string middleName, string email, int gender)
    {
        Gender gen = gender switch
        {
            0 => Gender.Male,
            1 => Gender.Female,
            2 => Gender.Other,
            _ => throw new ArgumentOutOfRangeException()
        };
        await _patientRepository.AddAsync(
            new Patient(pesel, name, surname, middleName, email, gen)
        );
    }

    public async Task UpdatePatient(int id,Patient pt)
    {
        await _patientRepository.UpdateAsync(pt);
    }

    public async Task DeletePatient(int id)
    {
        Patient? pt = await _patientRepository.GetByIdAsync(id);
        if (pt is not null) await _patientRepository.DeleteAsync(pt);
    }

    public async Task<Patient?> GetPatientById(int id)
    {
        return await _patientRepository.GetByIdAsync(id);
    }

    public async Task<IList<Patient>> GetAllPatients()
    {
        return await _patientRepository.GetAll().ToListAsync();
    }
}