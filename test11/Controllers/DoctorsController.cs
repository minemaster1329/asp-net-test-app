using Microsoft.AspNetCore.Mvc;
using test11.Models;
using test11.Services;

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
    public async Task<IActionResult> GetAllDoctors()
    {
        IList<Doctor> doctors = await _doctorService.GetAllDoctors();

        return Ok(doctors.ToArray());
    }
}