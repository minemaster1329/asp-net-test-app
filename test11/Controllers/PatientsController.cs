using System.Data;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test11.Data;
using test11.Models;
using test11.Services;
using test11.ViewModels;

namespace test11.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientService _patientService;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public PatientsController(IPatientService patientService, IServiceScopeFactory serviceScopeFactory)
    {
        _patientService = patientService;
        _serviceScopeFactory = serviceScopeFactory;
    }

    /// <summary>
    /// Returns all patients from system
    /// </summary>
    /// <returns>Array with patients</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllPatients()
    {
        IList<Patient> patients = await _patientService.GetAllPatients();
        return Ok(patients.ToArray());
    }

    /// <summary>
    /// Returns patient with specified id
    /// </summary>
    /// <param name="id">Patient's id</param>
    /// <returns>
    /// Patient object if found, 404 status if patient with given id does not exist
    /// </returns>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetPatientById(int id)
    {
        Patient? patient = await _patientService.GetPatientById(id);

        if (patient is not null)
        {
            return Ok(patient);
        }

        return NotFound();
    }

    /// <summary>
    /// Adds new patient to database
    /// </summary>
    /// <param name="pt">patient object</param>
    /// <returns>Ok if patient added successfully, BadRequest if something went wrong (ex. patient with specified id already exists)</returns>
    [HttpPost]
    [Consumes("application/json")]
    public async Task<IActionResult> AddNewPatient([FromBody] NewPatientViewModel pt)
    {
        try
        {
            await _patientService.AddNewPatient(pt.Pesel, pt.Name, pt.Surname, pt.MiddleName, pt.Email, pt.Gender);
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
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> RemovePatientFromDatabase(int id)
    {
        await _patientService.DeletePatient(id);
        return Ok("Patient removed successfully");
    }

    /// <summary>
    /// Changes data for specified patient
    /// </summary>
    /// <param name="id">Patient's id</param>
    /// <param name="pt">Patient object with changed data</param>
    /// <returns>Ok if patient edited successfully, BadRequest if something went wrong, NotFound if patient with specified id does not exist</returns>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> SavePatientChanges(int id, [FromBody] Patient pt)
    {
        if (id != pt.PatientId) return BadRequest();
        try
        {
            await _patientService.UpdatePatient(id, pt);
            return Ok();
        }
        catch (DBConcurrencyException)
        {
            return BadRequest();
        }
    }
}