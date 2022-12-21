# API de Regalos

Para cambiar un poco, me fui a terreno mas conocido y arme una API en .NET Core.

## Librerias
### Data Layer 
Para repositorio de datos, usa un SQLite. No le puse el repository pattern (todavia)

Tambien tiene EF 6

### Pasos para agregar EF y SQLite 

1. `dotnet add package Microsoft.EntityFrameworkCore.Sqlite`
2. Agregar el Connection String
```
{
    "ConnectionStrings": {
        "Database": "Data Source=LocalDatabase.db"
    },
    "Logging": {...
```
3. Crear el modelo de datos (dentro de `model`, en nuestro caso, `db/Gift.cs`)
4. Agregar `DataContext.cs`

```
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
```
5. Editar el `Program.cs` para agregar el DBContext
```
builder.Services.AddDbContext<DataContext>();
```
6. Para usar las migraciones, agregar 
```
dotnet add package Microsoft.EntityFrameworkCore.Design
```
7. Correr el script inicial. 
```
dotnet ef migrations add InitialCreate
```
8. Correr la migracion para que actualice la base. Esto va a crear la tabla en nuestra base de SQLite
```
dotnet ef database update
```

### Metodos de la API

La API hoy tiene los metodos basicos:
- Traer todo
- Traer uno
- Agregar
- Modificar
- Borrar

### Insomnia
En el archivo [insomnia_2022-12-21.json](Insomnia_2022-12-21.json) estab los metodos

## TODO
- Agregar automapper y mediatr para ordenar un poco el codigo
- Agregar mejor manejo de errores
- Agregar CORS
- Agregar un layer de seguridad