namespace TasksManagement.Presentation.Controllers;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _service;

    public StudentController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentGetResponse>>> GetAll()
    {
        var result = await _service.GetAsync();
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<StudentGetResponse>> GetById(Guid id)
    {
        var result = await _service.GetAsync(id);
        if (result.IsFailure)
            return NotFound(result);

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(StudentCreateRequest request)
    {
        var modelState = request.Validate();
        if (!modelState.IsSuccess)
            return BadRequest(modelState);

        var result = await _service.CreateAsync(request);
        if (result.IsFailure)
            return BadRequest(result);

        return CreatedAtAction(nameof(GetById), new { id = result.Value }, null);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, StudentUpdateRequest request)
    {
        var modelState = request.Validate();
        if (!modelState.IsSuccess)
            return BadRequest(modelState);

        var result = await _service.UpdateAsync(id, request);
        if (result.IsFailure)
            return NotFound(result);

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.DeleteAsync(id);
        if (result.IsFailure)
            return NotFound(result);

        return NoContent();
    }
}
