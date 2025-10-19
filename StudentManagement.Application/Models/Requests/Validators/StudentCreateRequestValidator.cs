using FluentValidation;
using StudentManagement.Application.Models.Requests;

namespace StudentManagement.Application.Models.Requests.Validators;

public class StudentCreateRequestValidator : AbstractValidator<StudentCreateRequest>
{
    public StudentCreateRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MaximumLength(100).WithMessage("First name must not exceed 100 characters.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MaximumLength(100).WithMessage("Last name must not exceed 100 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Email is not valid.");

        //RuleFor(x => x.DateOfBirth)
        //    .LessThan(DateTime.UtcNow).WithMessage("Date of birth must be in the past.")
        //    .Must(dob =>
        //    {
        //        var today = DateTime.UtcNow.Date;
        //        var age = today.Year - dob.Date.Year;
        //        if (dob.Date > today.AddYears(-age)) age--;
        //        return age >= 3 && age <= 100; // arbitrary allowed age range
        //    }).WithMessage("Date of birth results in an invalid age.");
    }
}
