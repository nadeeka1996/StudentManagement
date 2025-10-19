using System;
using StudentManagement.Domain.Enums;

namespace StudentManagement.Domain.Entities;

public sealed class Student : IEntity, ISoftDeletable
{
    public Guid Id { get; private init; } = Guid.NewGuid();
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public DateTime DateOfBirth { get; private set; }
    public DateTime Created { get; private set; } = DateTime.UtcNow;
    public DateTime Updated { get; private set; }
    public bool IsDeleted { get; private set; }
    public Guid? UserId { get; private set; }

    private Student() { }

    public static Student Create(string firstName, string lastName, string email, DateTime dateOfBirth, Guid? userId = null) =>
        new()
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            DateOfBirth = dateOfBirth,
            IsDeleted = false,
            UserId = userId
        };

    public void Update(string firstName, string lastName, string email, DateTime dateOfBirth)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        DateOfBirth = dateOfBirth;
        Updated = DateTime.UtcNow;
    }

    public void Delete()
    {
        IsDeleted = true;
        Updated = DateTime.UtcNow;
    }

    public StudentCategory Category
    {
        get
        {
            var today = DateTime.UtcNow.Date;
            var age = today.Year - DateOfBirth.Date.Year;
            if (DateOfBirth.Date > today.AddYears(-age)) age--;

            return age switch
            {
                >= 6 and <= 10 => StudentCategory.Primary,
                >= 11 and <= 15 => StudentCategory.MiddleSchool,
                >= 16 and <= 19 => StudentCategory.UpperSchool,
                _ => StudentCategory.Unknown
            };
        }
    }
}
