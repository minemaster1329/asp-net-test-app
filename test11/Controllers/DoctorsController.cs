using Microsoft.AspNetCore.Mvc;
using System.Linq;
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
}