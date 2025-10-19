using StudentManagement.Domain.Entities;
using StudentManagement.Application.Interfaces.Repositories.Base;

namespace StudentManagement.Application.Interfaces.Repositories;

public interface IStudentRepository : IRepository<Student>
{
}
