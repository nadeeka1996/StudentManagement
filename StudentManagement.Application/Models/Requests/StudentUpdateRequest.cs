namespace StudentManagement.Application.Models.Requests;

public record StudentUpdateRequest(
    string FirstName,
    string LastName,
    string Email,
    DateTime BirthDate
)
{
    public Result Validate()
    {
        var validationResult = new StudentUpdateRequestValidator().Validate(this);
        if (validationResult is { IsValid: true })
            return Result.Success();

        return Result.Failure(string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage)));
    }
}
