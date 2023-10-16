using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class TaskToDo
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime DateToDo { get; set; }
        public bool TaskStatus { get; set; }
    }
}
