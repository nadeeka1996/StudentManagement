﻿namespace StudentManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"))
        );

        services.AddMemoryCache();

        services.AddAuthentication()
            .AddAuthenticationSchemes();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}