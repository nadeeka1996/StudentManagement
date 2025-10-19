namespace StudentManagement.Application.Services;

internal sealed class StudentService(
    IUnitOfWork unitOfWork
) : IStudentService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Result<IEnumerable<StudentGetResponse>>> GetAsync()
    {
        var students = await _unitOfWork.StudentRepository.GetAsync(
            selector: s => StudentGetResponse.Map(s)
        );

        return Result<IEnumerable<StudentGetResponse>>.Success(students);
    }

    public async Task<Result<StudentGetResponse>> GetAsync(Guid id)
    {
        var student = await _unitOfWork.StudentRepository.FirstOrDefaultAsync(
            filter: s => s.Id == id
        );

        if (student is null)
            return Result<StudentGetResponse>.Failure("Student not found");

        return Result<StudentGetResponse>.Success(StudentGetResponse.Map(student));
    }

    public async Task<Result<Guid>> CreateAsync(StudentCreateRequest request)
    {
        var student = Student.Create(request.FirstName, request.LastName, request.Email, request.BirthDate);
        await _unitOfWork.StudentRepository.AddAsync(student);
        await _unitOfWork.SaveChangesAsync();
        return Result<Guid>.Success(student.Id);
    }

    public async Task<Result> UpdateAsync(Guid id, StudentUpdateRequest request)
    {
        var student = await _unitOfWork.StudentRepository.FindAsync(id);
        if (student is null)
            return Result.Failure("Student not found");

        student.Update(request.FirstName, request.LastName, request.Email, request.BirthDate);
        _unitOfWork.StudentRepository.Update(student);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        var student = await _unitOfWork.StudentRepository.FindAsync(id);
        if (student is null)
            return Result.Failure("Student not found");

        _unitOfWork.StudentRepository.Remove(student);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }
}
