namespace StudentManagement.Infrastructure.Authentication;

internal static class AuthenticationBuilderExtensions
{
    internal static AuthenticationBuilder AddAuthenticationSchemes(this AuthenticationBuilder builder)
    {
        builder.AddScheme<UserIdAuthenticationOptions, UserIdAuthenticationHandler>(
            UserIdAuthenticationOptions.SchemeName,
            _ => { }
        );

        return builder;
    }
}