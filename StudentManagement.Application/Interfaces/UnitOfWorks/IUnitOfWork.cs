namespace StudentManagement.Application.Interfaces.UnitOfWorks;

public interface IUnitOfWork
{
    IRepository<TEntity> Repository<TEntity>() where TEntity : class, IEntity;
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    IStudentRepository StudentRepository { get; }
}
