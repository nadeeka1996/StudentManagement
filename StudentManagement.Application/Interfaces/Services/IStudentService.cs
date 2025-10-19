namespace StudentManagement.Application.Interfaces.Services;

public interface IStudentService
{
    Task<Result<IEnumerable<StudentGetResponse>>> GetAsync();
    Task<Result<StudentGetResponse>> GetAsync(Guid id);
    Task<Result<Guid>> CreateAsync(StudentCreateRequest request);
    Task<Result> UpdateAsync(Guid id, StudentUpdateRequest request);
    Task<Result> DeleteAsync(Guid id);
}
