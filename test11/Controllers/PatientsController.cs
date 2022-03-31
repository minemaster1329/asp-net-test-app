using System.Data;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    [Consumes("application/json")]
    public IActionResult AddNewPatient([FromBody] Patient pt)
    {
        if (_context.Patients.Any(p => pt.Pesel.Equals(p.Pesel)))
        {
            Debug.WriteLine($"Patient with id {pt.Pesel} already exists in database");
            return BadRequest("Patient with specified id already exist");
        }
            
        try
        {
            _context.Patients.Add(pt);
            _context.SaveChanges();
            Debug.WriteLine($"Patient with {pt.Pesel} added successfully");
            return Ok();
        }
        catch (Exception e)
        {
            Debug.WriteLine($"Error when adding patient {pt.Pesel}: {e.Message}");
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult RemovePatientFromDatabase(string id)
    {
        Patient? pt = _context.Patients.Find(id);

        if (pt is null) return NotFound($"Patient with id {id} not found");
        _context.Patients.Remove(pt);
        _context.SaveChanges();
        return Ok("Patient removed successfully");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> SavePatientChanges(string id, [FromBody] Patient pt)
    {
        if (!id.Equals(pt.Pesel)) return BadRequest();
        if (_context.Patients.Any(pat => pat.Pesel.Equals(id)))
        {
            _context.Entry(pt).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DBConcurrencyException)
            {
                return BadRequest();
            }
        }
        else return NotFound("Patient with specified id not found");
    }
}