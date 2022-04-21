using test11.Models;

namespace test11.ViewModels;

public class NewPatientViewModel
{
    public string Pesel { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string MiddleName { get; set; }
    public string Email { get; set; }
    public int Gender { get; set; }
}