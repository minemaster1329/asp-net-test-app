using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Exceptions;
using test11.Models;
using test11.ViewModels;

namespace test11.Services;

public class DoctorService : IDoctorService
{
    private readonly IRepository<Doctor> _doctorsRepository;
    private readonly IRepository<Specialization> _specializationRepository;

    public DoctorService(IRepository<Doctor> doctorsRepository, IRepository<Specialization> specializationRepository)
    {
        _doctorsRepository = doctorsRepository;
        _specializationRepository = specializationRepository;
    }

    public async Task<IList<Doctor>> GetAllDoctorsWithSpecialization()
    {
        return await _doctorsRepository.GetAll().ToListAsync();
    }

    public async Task AddNewDoctorAsync(NewDoctorViewModel newDoctorViewModel)
    {
        Doctor newDoctor = new Doctor();
        Specialization specialization = await _specializationRepository.GetByIdAsync(newDoctorViewModel.SpecializationId);

        if (specialization is null) throw new ArgumentException("Specialization with specified id not found");
        newDoctor.Pesel = newDoctorViewModel.Pesel;
        newDoctor.Name = newDoctorViewModel.Name;
        newDoctor.Surname = newDoctorViewModel.Surname;
        newDoctor.MiddleName = newDoctorViewModel.MiddleName;
        newDoctor.Email = newDoctorViewModel.Email;
        newDoctor.Phone = newDoctorViewModel.Phone;
        newDoctor.Specialization = specialization;
        newDoctor.Gender = newDoctorViewModel.Gender;

        await _doctorsRepository.AddAsync(newDoctor);
    }

    public async Task AddNewDoctorWithSpecializationName(NewDoctorWithSpecializationName newDoctorWithSpecializationName)
    {
        if (_specializationRepository.GetAll()
            .Any(spec => spec.Name.Equals(newDoctorWithSpecializationName.SpecializationName)))
            throw new SpecializationAlreadyExistsException();
        Specialization specialization = new Specialization() {Name = newDoctorWithSpecializationName.SpecializationName};
        await _specializationRepository.AddAsync(specialization);
        Doctor doctor = new Doctor()
        {
            Name = newDoctorWithSpecializationName.Name,
            Surname = newDoctorWithSpecializationName.Surname,
            Pesel = newDoctorWithSpecializationName.Pesel,
            Email = newDoctorWithSpecializationName.Email,
            Gender = newDoctorWithSpecializationName.Gender,
            MiddleName = newDoctorWithSpecializationName.MiddleName,
            Specialization = specialization,
            Phone = newDoctorWithSpecializationName.Phone
        };
        await _doctorsRepository.AddAsync(doctor);
    }
}