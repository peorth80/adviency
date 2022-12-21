namespace Model.Response;

public class UpdateGift
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Owner { get; set; } = string.Empty;
    public int Amount { get; set; }
}