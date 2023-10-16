namespace Application.Mapping.DTOs
{
    public class TaskDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string DateToDo { get; set; }
        public bool TaskStatus { get; set; }
    }
}
