using Microsoft.AspNetCore.Mvc;
using System.Linq;
using test11.Exceptions;
using test11.Models;
using test11.Services;
using test11.ViewModels;

namespace test11.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class DoctorsController : ControllerBase
{
    private readonly IDoctorService _doctorService;

    public DoctorsController(IDoctorService doctorService)
    {
        _doctorService = doctorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllDoctorsWithSpecialization()
    {
        IList<Doctor> doctors = await _doctorService.GetAllDoctorsWithSpecialization();
        return Ok(doctors.ToArray());
    }

    [HttpPost]
    public async Task<IActionResult> AddNewDoctor([FromBody] NewDoctorViewModel newDoctorViewModel)
    {
        try
        {
            await _doctorService.AddNewDoctorAsync(newDoctorViewModel);
        }
        catch (ArgumentException _)
        {
            return BadRequest("Specialization with specified ID does not exist");
        }

        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddNewDoctorWithSpecializationName(
        [FromBody] NewDoctorWithSpecializationName newDoctorWithSpecializationName)
    {
        try
        {
            await _doctorService.AddNewDoctorWithSpecializationName(newDoctorWithSpecializationName);
        }
        catch (SpecializationAlreadyExistsException _)
        {
            return BadRequest("Specialization already exists");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

        return Ok();
    }

    [HttpGet]
    public async Task<bool> CheckIfDoctorWithSpecifiedPeselExists(string pesel)
    {
        return await _doctorService.CheckIfDoctorWithSpecifiedPeselExists(pesel);
    }
}