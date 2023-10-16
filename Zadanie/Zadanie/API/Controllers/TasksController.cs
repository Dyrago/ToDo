using Application.Mapping.DTOConverter;
using Application.Mapping.DTOs;
using Application.Service;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TasksController : BaseAPIController
    {
        private readonly TasksService _tasksService;

        public TasksController(TasksService tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpGet]
        public async Task<IEnumerable<TaskToDo>> GetTasks(string? date)
        {
            if (!string.IsNullOrEmpty(date))
             return await _tasksService.GetTasks(Convert.ToDateTime(date));

            return default;
        }

        [HttpGet("{id}")]
        public async Task<TaskToDo> GetTask(int id)
        {
            return await _tasksService.GetTask(id);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskDTO taskToCreate)
        {
            _tasksService.Create(DTOConverter.TaskDTOtoTaskToDo(taskToCreate));
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            _tasksService.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id ,TaskDTO task)
        {
            _tasksService.Update(id, DTOConverter.TaskDTOtoTaskToDo(task));
            return Ok();
        }

    }
}
