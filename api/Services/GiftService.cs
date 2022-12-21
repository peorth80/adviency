namespace Services;

using Model.DB;
using Model.Request;
using Model.Response;
using Helpers;

public interface iGiftService
{
    IEnumerable<Gift> GetAll();
    Gift GetById(string id);
    Gift Create(CreateGift gift);
    Gift Update(string id, UpdateGift gift);
    void Delete(string id);
}


public class GiftService : iGiftService
{
    private DataContext _context;
    private ILogger<GiftService> _logger;

    public GiftService(
        DataContext context,
        ILogger<GiftService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public Gift Create(CreateGift gift)
    {
        Guid myuuid = Guid.NewGuid();
        var newGift = new Gift()
        {
            Id = myuuid.ToString(),
            Amount = gift.Amount,
            Name = gift.Name,
            Owner = gift.Owner
        };

        _context.Add(newGift);

        _context.SaveChanges();

        return newGift;
    }

    public void Delete(string id)
    {
        var item = _context.Gifts.Where((x) => x.Id == id).FirstOrDefault();

        if (item != null)
        {
            _context.Gifts.Remove(item);
            _logger.LogInformation($"Item {id} deleted");
        }
        else
        {
            _logger.LogCritical($"Item {id} not found; can't delete");
        }

        _context.SaveChanges();
    }

    public IEnumerable<Gift> GetAll()
    {
        return _context.Gifts;
    }

    public Gift GetById(string id)
    {
        var gift = _context.Gifts.Find(id);

        if (gift == null) throw new KeyNotFoundException("User not found");

        return gift;
    }

    public Gift Update(string id, UpdateGift gift)
    {
        var dbGift = GetById(id);

        dbGift.Amount = gift.Amount;
        dbGift.Name = gift.Name;
        dbGift.Owner = gift.Owner;

        _context.Gifts.Update(dbGift);

        _context.SaveChanges();

        return dbGift;
    }
}