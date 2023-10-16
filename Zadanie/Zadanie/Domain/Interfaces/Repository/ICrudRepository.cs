using Domain.Entities;

namespace Domain.Interfaces.Repository
{
    public interface ICrudRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(DateTime date);
        Task<T> Get(int id);
        Task Create(T entity);
        Task Delete(int id);
        Task Update(int id ,T entity);
    }
}
