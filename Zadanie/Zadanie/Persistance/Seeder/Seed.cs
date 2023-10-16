using Domain.Entities;
using Persistance.Data;

namespace Persistance.Seeder
{
    public static class Seed
    {
        public static async Task SeedData(AppDbContext context)
        {
           

            if (context.Tasks.Any()) return;

            var tasks = new List<TaskToDo>()
            {
                new TaskToDo
                {
                    Title = "Task 1",
                    Description = "Task 1 To Do",
                    DateToDo = DateTime.Now,
                    TaskStatus = false
                },

                new TaskToDo
                {
                    Title = "Task 2",
                    Description = "Task 2 To Do",
                    DateToDo = DateTime.Now,
                    TaskStatus = false
                },

                new TaskToDo
                {
                    Title = "Future Task ",
                    Description = "Future Task To Do",
                    DateToDo = DateTime.Now.AddDays(1),
                    TaskStatus = false
                },

                new TaskToDo
                {
                    Title = "Task 3",
                    Description = "Task 3 To Do",
                    DateToDo = DateTime.Now,
                    TaskStatus = true
                },
            };

            await context.Tasks.AddRangeAsync(tasks);
            await context.SaveChangesAsync();
        }
    }
}
