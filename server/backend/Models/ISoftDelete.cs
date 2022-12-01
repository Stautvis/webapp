using System;
namespace backend.Models;

interface ISoftDelete
{
    public bool Deleted { get; set; }
}

interface IConfirmable
{
    public bool Confirmed { get; set; }
}

