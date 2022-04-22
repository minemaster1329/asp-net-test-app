using System.ComponentModel.DataAnnotations;

namespace test11.Models;

public class Specialization
{
    [Key]
    public int SpecializationId { get; set; }
    [Required]
    public string Name { get; set; }
}