using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Service
{
    public class TasksService
    {
        private readonly ICrudRepository<TaskToDo> _repository;

        public TasksService(ICrudRepository<TaskToDo> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TaskToDo>> GetTasks(DateTime date)
        {
            return await _repository.GetAll(date);
        }

        public async Task<TaskToDo> GetTask(int id)
        {
            return await _repository.Get(id);
        }

        public Task Delete(int id)
        {
            return _repository.Delete(id);
        }

        public Task Update (int id, TaskToDo taskToDo)
        {
            return _repository.Update(id ,taskToDo);
        }

        public Task Create(TaskToDo taskToDo)
        {
            return _repository.Create(taskToDo);
        }
    }
}
