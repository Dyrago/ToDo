using Application.Mapping.DTOs;
using Domain.Entities;

namespace Application.Mapping.DTOConverter
{
    public static class DTOConverter
    {
        public static TaskToDo TaskDTOtoTaskToDo(TaskDTO taskDTO)
        {
            return new TaskToDo()
            {
                Title = taskDTO.Title,
                Description = taskDTO.Description,
                DateToDo = taskDTO.DateToDo != string.Empty ? Convert.ToDateTime(taskDTO.DateToDo) : DateTime.Now.Date,
                TaskStatus = taskDTO.TaskStatus,
            };
        }
    }
}
