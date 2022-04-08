using System.ComponentModel.DataAnnotations;

namespace test11.Models;

public class Specialization
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    
    public List<Doctor> Doctors { get; set; }
}