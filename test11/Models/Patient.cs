using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace test11.Models;

public class Patient
{
    [Key]
    [MinLength(11)]
    [MaxLength(11)]
    public string Pesel { get; set; }

    [Required]
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(35)]
    public string Name { get; set; } = "";

    [Required]
    [RegularExpression(@"^\p{Lu}\p{Ll}+$")]
    [MaxLength(50)]
    public string Surname { get; set; } = "";

    [RegularExpression(@"(^$)|(^\p{Lu}\p{Ll}+$)")]
    [MaxLength(50)]
    public string MiddleName { get; set; } = "";

    [RegularExpression(@"(^$)|([A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64})")]
    [MaxLength(50)]
    public string Email { get; set; } = "";
    [Required]
    public Gender Gender { get; set;}
}