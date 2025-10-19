using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Domain.Entities;
using StudentManagement.Infrastructure.Data;
using StudentManagement.Infrastructure.Repositories.Base;

namespace StudentManagement.Infrastructure.Repositories;

internal sealed class StudentRepository(
    ApplicationDbContext context
) : Repository<Student>(context), IStudentRepository
{
}
