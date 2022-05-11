using System.Collections;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using test11.Models;
using test11.Services;

namespace test11.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SpecializationController : ControllerBase
{
    private readonly ISpecializationService _specializationService;

    public SpecializationController(ISpecializationService specializationService)
    {
        _specializationService = specializationService;
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetSpecializationById(int id)
    {
        Specialization? specialization = await _specializationService.GetById(id);

        if (specialization is null) return NotFound();
        return Ok(specialization);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSpecializations()
    {
        IList<Specialization> specializations = await _specializationService.GetAllSpecializations();

        return Ok(specializations);
    }

    [HttpPost]
    public async Task<IActionResult> AddNewSpecialization([FromBody] Specialization specialization)
    {
        await _specializationService.AddNewSpecialization(specialization);
        Debug.Write(specialization.SpecializationId);
        return Ok();
    }
}