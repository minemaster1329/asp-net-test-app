using Microsoft.AspNetCore.Mvc;
using test11.Models;

namespace test11.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PatientsController : ControllerBase
{
    private ApplicationDbContext _context;

    public PatientsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllPatients()
    {
        return Ok(_context.Patients.ToArray());
    }

    [HttpGet("{id}")]
    public IActionResult GetPatientById(string id)
    {
        if (string.IsNullOrEmpty(id)) return BadRequest();
        Patient? patient = _context.Patients.Find(id);

        if (patient is not null)
        {
            return Ok(patient);
        }

        return NotFound();
    }

    [HttpGet("{id}")]
    public bool CheckIfIdExists(string? id)
    {
        return _context.Patients.Any((patient => patient.Pesel.Equals(id)));
    }
    
    [HttpPost]
    public IActionResult AddNewPatient(Patient? pt)
    {
        if (pt is null)
        {
            return BadRequest("Patient supplied cannot be null");
        }

        if (_context.Patients.Any(p => pt.Pesel.Equals(p.Pesel)))
            return BadRequest("Patient with specified id already exist");

        try
        {
            _context.Patients.Add(pt);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }
}