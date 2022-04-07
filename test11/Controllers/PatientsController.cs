using System.Data;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Models;

namespace test11.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PatientsController : ControllerBase
{
    /// <summary>
    /// Application Database Context
    /// </summary>
    private ApplicationDbContext _context;

    public PatientsController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Returns all patients from system
    /// </summary>
    /// <returns>Array with patients</returns>
    [HttpGet]
    public IActionResult GetAllPatients()
    {
        return Ok(_context.Patients.ToArray());
    }

    /// <summary>
    /// Returns patient with specified id
    /// </summary>
    /// <param name="id">Patient's id</param>
    /// <returns>
    /// Patient object if found, 404 status if patient with given id does not exist
    /// </returns>
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

    /// <summary>
    /// Checks if patient with specified id exists in system
    /// </summary>
    /// <param name="id">Patient's id</param>
    /// <returns>true if exists, false if not</returns>
    [HttpGet("{id}")]
    public bool CheckIfIdExists(string? id)
    {
        return _context.Patients.Any((patient => patient.Pesel.Equals(id)));
    }
    
    /// <summary>
    /// Adds new patient to database
    /// </summary>
    /// <param name="pt">patient object</param>
    /// <returns>Ok if patient added successfully, BadRequest if something went wrong (ex. patient with specified id already exists)</returns>
    [HttpPost]
    [Consumes("application/json")]
    public IActionResult AddNewPatient([FromBody] Patient pt)
    {
        if (_context.Patients.Any(p => pt.Pesel.Equals(p.Pesel)))
        {
            return BadRequest("Patient with specified id already exist");
        }
            
        try
        {
            _context.Patients.Add(pt);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Removes specified patient from database
    /// </summary>
    /// <param name="id">Patient's id</param>
    /// <returns>Ok id patient successfully removed, NotFound if patient not found</returns>
    [HttpDelete("{id}")]
    public IActionResult RemovePatientFromDatabase(string id)
    {
        Patient? pt = _context.Patients.Find(id);

        if (pt is null) return NotFound($"Patient with id {id} not found");
        _context.Patients.Remove(pt);
        _context.SaveChanges();
        return Ok("Patient removed successfully");
    }

    /// <summary>
    /// Changes data for specified patient
    /// </summary>
    /// <param name="id">Patient's id</param>
    /// <param name="pt">Patient object with changed data</param>
    /// <returns>Ok if patient edited successfully, BadRequest if something went wrong, NotFound if patient with specified id does not exist</returns>
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
        return NotFound("Patient with specified id not found");
    }
}