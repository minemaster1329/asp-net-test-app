using System.CodeDom.Compiler;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using test11.OtherStuff;

namespace test11.Models;

public class Patient : PersonAbstract
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int PatientId { get; set; }

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