using Microsoft.EntityFrameworkCore;
using test11.Models;

namespace test11.Data;

public abstract class AbstractRepository<T> : IRepository<T> where T : class
{
    protected ApplicationDbContext ApplicationDbContext { get; private set; }
    protected AbstractRepository(ApplicationDbContext applicationDbContext)
    {
        ApplicationDbContext = applicationDbContext;
    } 

    public virtual IQueryable<T> GetAll()
    {
        return ApplicationDbContext.Set<T>().AsNoTracking();
    }

    public abstract Task<T?> GetByIdAsync(int id);

    public virtual async Task AddAsync(T entity)
    {
        await ApplicationDbContext.Set<T>().AddAsync(entity);
        await ApplicationDbContext.SaveChangesAsync();
    }

    public virtual async Task UpdateAsync(T entity)
    {
        ApplicationDbContext.Set<T>().Update(entity);
        await ApplicationDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        ApplicationDbContext.Set<T>().Remove(entity);
        await ApplicationDbContext.SaveChangesAsync();
    }
}