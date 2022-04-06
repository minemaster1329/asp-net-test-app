using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using test11.Models;

namespace test11.OtherStuff;

public class PeselAttribute : ValidationAttribute
{
    private string _errorCode = "";
    
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var patient = (Patient) validationContext.ObjectInstance;

        if (CheckPeselFormat(patient.Pesel) && CheckPeselCehcksum(patient.Pesel)) return ValidationResult.Success;
        else return new ValidationResult(_errorCode);
    }

    private bool CheckPeselFormat(string value)
    {
        bool formatValid = Regex.IsMatch(value, @"^\d{11}$");
        _errorCode = formatValid ? "" : "Invalid format";
        return formatValid;
    }

    private bool CheckPeselCehcksum(string value)
    {
        int[] weights = new int[] {1, 3, 7, 9};
        int sum = 0;
        for (int i = 0; i < 10; i++)
        {
            sum +=(int) char.GetNumericValue(value[i]) * weights[i % 4];
        }

        sum %= 10;

        if (sum != 0) sum = 10 - sum;
        bool checksumCorrect = sum == (int) char.GetNumericValue(value[10]);
        _errorCode = checksumCorrect ? "" : "Invalid Pesel checksum";
        return checksumCorrect;
    }
}