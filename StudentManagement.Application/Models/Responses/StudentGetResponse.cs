using StudentManagement.Domain.Enums;

namespace StudentManagement.Application.Models.Responses;

public record StudentGetResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    DateTime BirthDate,
    StudentCategory Category
)
{
    public static StudentGetResponse Map(Student entity) =>
        new(
            entity.Id,
            entity.FirstName,
            entity.LastName,
            entity.Email,
            entity.DateOfBirth,
            entity.Category
        );
}
