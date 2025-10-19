namespace StudentManagement.Infrastructure.Authentication;

internal sealed class UserIdAuthenticationHandler(
    IOptionsMonitor<UserIdAuthenticationOptions> options,
    ILoggerFactory loggerFactory,
    UrlEncoder encoder,
    ISystemClock clock,
    ICurrentUser currentUser,
    IUserService authService
) : AuthenticationHandler<UserIdAuthenticationOptions>(options, loggerFactory, encoder, clock)
{
    private readonly ICurrentUser _currentUser = currentUser;
    private readonly IUserService _authService = authService;

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (_currentUser.Id == Guid.Empty)
            return AuthenticateResult.Fail("User ID was not provided");

        if (!await _authService.IsValidIdAsync(_currentUser.Id))
            return AuthenticateResult.Fail("Invalid User ID provided");

        Claim[] claims = [new(ClaimTypes.Name, "UserIdClient")];
        var identity = new ClaimsIdentity(claims, nameof(UserIdAuthenticationHandler));
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return AuthenticateResult.Success(ticket);
    }
}

internal sealed class UserIdAuthenticationOptions : AuthenticationSchemeOptions
{
    public const string SchemeName = "UserId";
}