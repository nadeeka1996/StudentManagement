namespace StudentManagement.Domain.Entities.Base;

public interface ISoftDeletable
{
    bool IsDeleted { get; }
}