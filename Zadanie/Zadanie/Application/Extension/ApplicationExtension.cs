using Application.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extension
{
    public static class ApplicationExtension
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddScoped<TasksService>();
        }
    }
}
