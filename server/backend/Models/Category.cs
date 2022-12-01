using System;
namespace backend.Models;

public class Category : ISoftDelete
{
    public int ID { get; set; }

    public string Name { get; set; } = default!;

    public List<Category> Categories { get; set; } = default!;

    public bool Deleted { get; set; } = false;
}
