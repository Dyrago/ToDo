using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using Persistance.Data;

namespace Persistance.Repository
{
    public class ToDoTaskRepository : ICrudRepository<TaskToDo>
    {
        private readonly AppDbContext _context;
        public ToDoTaskRepository(AppDbContext context) { _context = context; }

        public Task Create(TaskToDo entity)
        {
            if (entity != null)
            {
                _context.Add(entity);
                _context.SaveChanges();
                return Task.CompletedTask;
            }
            
            throw new Exception(message: "Argument may be null");
        }

        public Task Delete(int id)
        {
            if (id > 0)
            {
                var entity = _context.Tasks.FirstOrDefault(t => t.Id == id);
                _context.Tasks.Remove(entity);
                _context.SaveChangesAsync();

                return Task.CompletedTask;
            }

            throw new Exception(message: "Id must be grater then 0");
        }

        public async Task<TaskToDo> Get(int id)
        {
            if (id > 0)
            { 
                return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id); 
            }

            throw new Exception(message: $"No entity of id: {id}");
        }

        public async Task<IEnumerable<TaskToDo>> GetAll(DateTime date)
        {        
            return await _context.Tasks.Where(t => t.DateToDo.Date == date.Date).ToListAsync();
        }

        public Task Update(int id, TaskToDo entity)
        {
            if (entity != null)
            {
                entity.Id = id;
                _context.Tasks.Update(entity);
                _context.SaveChanges();
                return Task.CompletedTask;
            }

            throw new NotImplementedException();   
        }
    }
}
