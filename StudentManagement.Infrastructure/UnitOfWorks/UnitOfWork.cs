namespace StudentManagement.Infrastructure.UnitOfWorks;

internal sealed class UnitOfWork(
    ApplicationDbContext context
) : IUnitOfWork
{
    private readonly ApplicationDbContext _context = context;
    private readonly Dictionary<Type, object> _repositories = [];

    private IStudentRepository? _studentItemRepository;

    public IStudentRepository StudentRepository =>
        _studentItemRepository ?? (_studentItemRepository = new StudentRepository(_context));

    public IRepository<TEntity> Repository<TEntity>() where TEntity : class, IEntity
    {
        if (!_repositories.ContainsKey(typeof(TEntity)))
            _repositories[typeof(TEntity)] = new Repository<TEntity>(_context);

        return (IRepository<TEntity>)_repositories[typeof(TEntity)];
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        await _context.SaveChangesAsync(cancellationToken);
}