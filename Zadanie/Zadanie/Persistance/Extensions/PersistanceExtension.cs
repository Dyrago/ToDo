using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistance.Data;
using Persistance.Repository;

namespace Persistance.Extensions
{
    public static class PersistanceExtension
    {
        public static void AddPersistance(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("AppConnectionString")));


            services.AddScoped<ICrudRepository<TaskToDo>, ToDoTaskRepository>();
        }
    }
}
