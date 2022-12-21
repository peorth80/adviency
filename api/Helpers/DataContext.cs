namespace Helpers;

using Microsoft.EntityFrameworkCore;
using Model.DB;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sqlite database
        options.UseSqlite(Configuration.GetConnectionString("Database"));
    }

    public DbSet<Gift> Gifts { get; set; } = default!;
}