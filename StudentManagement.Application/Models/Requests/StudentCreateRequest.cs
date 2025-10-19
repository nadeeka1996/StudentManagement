namespace StudentManagement.Application.Models.Requests;

public record StudentCreateRequest(
    string FirstName,
    string LastName,
    string Email,
    DateTime BirthDate
)
{
    public Result Validate()
    {
        var validationResult = new StudentCreateRequestValidator().Validate(this);
        if (validationResult is { IsValid: true })
            return Result.Success();

        return Result.Failure(string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage)));
    }
}
