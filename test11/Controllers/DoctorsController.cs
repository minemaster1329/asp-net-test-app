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
    public async Task<IActionResult> GetAllDoctors()
    {
        IList<Doctor> doctors = await _doctorService.GetAllDoctors();

        //IList<DoctorViewModel> doctorViewModels = doctors.Select(doctor => new DoctorViewModel(doctor)).ToList();

        //return Ok(doctorViewModels.ToArray());
        return Ok(doctors.ToArray());
    }
}