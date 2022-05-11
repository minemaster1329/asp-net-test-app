using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using test11.OtherStuff;

namespace test11.Models;

public class Doctor : PersonAbstract
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int DoctorId { get; set; }
    
    [Required]
    public Specialization Specialization { get; set; } 
}