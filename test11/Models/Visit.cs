using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace test11.Models;

public class Visit
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public string PatientPesel { get; set; }
    public Patient Patient { get; set; }
    
    public string DoctorPesel { get; set; }
    public Doctor Doctor { get; set; }
}