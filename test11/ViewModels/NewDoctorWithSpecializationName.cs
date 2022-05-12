using System.ComponentModel.DataAnnotations;
using test11.OtherStuff;

namespace test11.ViewModels;

public class NewDoctorWithSpecializationName
{
    public string Pesel { get; set; }
    
    [Required]
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(35)]
    public string Name { get; set; }
    
    [Required]
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(50)]
    public string Surname { get; set; }
    
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(50)]
    public string MiddleName { get; set; }
    
    [RegularExpression(@"^[A-Z0-9a-z]+@[A-Za-z0-9]+\.[A-Za-z]{2,64}$")]
    [MaxLength(50)]
    public string Email { get; set; }
    
    [Required]
    public Gender Gender { get; set; }
    
    [RegularExpression(@"^\d{9}$")]
    public string Phone { get; set; }
    
    [Required]
    public string SpecializationName { get; set; }

    public NewDoctorWithSpecializationName(string pesel, string name, string surname, string middleName, string email, Gender gender, string phone, string specializationName)
    {
        Pesel = pesel;
        Name = name;
        Surname = surname;
        MiddleName = middleName;
        Email = email;
        Gender = gender;
        Phone = phone;
        SpecializationName = specializationName;
    }
}