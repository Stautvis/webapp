using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using AutoMapper.Configuration.Annotations;

namespace backend.Models;



public class Service : ISoftDelete, IConfirmable
{
    [Key]
    public int ID { get; set; }

    [Required]
    [MinLength(3)]
    public string Title { get; set; } = default!;

    public int CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    [Required]
    public Company Company { get; set; } = default!;

    public bool Deleted { get; set; } = false;
    public bool Confirmed { get; set; } = false;
}

[AutoMap(typeof(Service), ReverseMap = true)]
public class ServiceGetDTO
{
    public int ID { get; set; }

    public string Title { get; set; } = default!;

    public CompanyGetDTO Company { get; set; } = default!;
}

[AutoMap(typeof(Service), ReverseMap = true)]
public class ServicePostDTO
{
    [Required]
    public string Title { get; set; } = default!;
}
