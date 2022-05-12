namespace test11.Exceptions;

public class DuplicatePeselEntryException : Exception
{
    public DuplicatePeselEntryException(string? message) : base(message)
    {
        
    }
}