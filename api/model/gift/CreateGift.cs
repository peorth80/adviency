namespace Model.Request;

public class CreateGift
{
    public string Name { get; set; } = string.Empty;
    public int Amount { get; set; }
    public string Owner { get; set; } = string.Empty;
}
