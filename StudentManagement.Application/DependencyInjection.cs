namespace StudentManagement.Application;
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services
            .AddScoped<ICurrentUser, CurrentUser>()
            .AddScoped<IUserService, UserService>()
            .AddScoped<IStudentService, StudentService>();

        return services;
    }
}