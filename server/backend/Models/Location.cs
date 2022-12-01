using System;
namespace backend.Models;

// Company can have more than one location in which services can be buyed
public class Location
{
    public int ID { get; set; }

    public string City { get; set; } = default!;

    public string Address { get; set; } = default!;

    public string Postcode { get; set; } = default!;
}

