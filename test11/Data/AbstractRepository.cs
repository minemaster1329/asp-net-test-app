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

    public IQueryable<T> GetAll()
    {
        return ApplicationDbContext.Set<T>().AsNoTracking();
    }

    public abstract Task<T> GetByIdAsync(int id);

    public async Task AddAsync(T entity)
    {
        await ApplicationDbContext.AddAsync(entity);
        await ApplicationDbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        ApplicationDbContext.Update(entity);
        await ApplicationDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        ApplicationDbContext.Remove(entity);
        await ApplicationDbContext.SaveChangesAsync();
    }
}