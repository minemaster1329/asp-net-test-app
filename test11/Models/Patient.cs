using System.CodeDom.Compiler;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using test11.OtherStuff;

namespace test11.Models;

public class Patient
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int PatientId { get; set; }
    [Pesel] 
    public string Pesel { get; set; } = "00000000000";

    [Required]
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(35)]
    public string Name { get; set; } = "";

    [Required]
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(50)]
    public string Surname { get; set; } = "";

    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(50)]
    public string MiddleName { get; set; } = "";

    [RegularExpression(@"^[A-Z0-9a-z]+@[A-Za-z0-9]+\.[A-Za-z]{2,64}$")]
    [MaxLength(50)]
    public string Email { get; set; } = "";
    [Required]
    public Gender Gender { get; set;}

    public Patient(string pesel, string name, string surname, string middleName, string email, Gender gender)
    {
        Pesel = pesel;
        Name = name;
        Surname = surname;
        MiddleName = middleName;
        Email = email;
        Gender = gender;
    }
}