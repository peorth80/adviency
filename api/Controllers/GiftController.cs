using Microsoft.AspNetCore.Mvc;
using Model.DB;
using Model.Request;
using Model.Response;
using Services;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class GiftController : ControllerBase
{
    private readonly ILogger<GiftController> _logger;
    private readonly iGiftService _service;

    public GiftController(ILogger<GiftController> logger, iGiftService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public IEnumerable<Gift> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Gift))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetById(string id)
    {
        try
        {
            var foundGift = _service.GetById(id);
            return Ok(foundGift);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogCritical($"{id} not found. {ex.Message}");
            return NotFound($"{id} not found");
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Gift))]
    public IActionResult CreateGift([FromBody] CreateGift gift)
    {
        try
        {
            var addedGift = _service.Create(gift);
            return Ok(addedGift);
        }
        catch (Exception ex)
        {
            _logger.LogCritical($"Error adding Gift: {ex.Message}");
            return BadRequest(ex);
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Gift))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult UpdateGift(string id, [FromBody] UpdateGift gift)
    {
        try
        {
            var updatedGift = _service.Update(id, gift);
            return Ok(updatedGift);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogCritical($"Can't find {id} to update");
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogCritical($"Error updating gift: {ex.Message}");
            return BadRequest(ex);
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult DeleteGift(string id)
    {
        try
        {
            _service.Delete(id);
            return Ok(
                new DeletedGift() { Id = id }
            );
        }
        catch (Exception ex)
        {
            _logger.LogCritical($"Error deleting gift: {ex.Message}");
            return BadRequest(ex);
        }
    }


}
