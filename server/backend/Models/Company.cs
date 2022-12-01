﻿using System;
using System.ComponentModel.DataAnnotations;
using AutoMapper;

namespace backend.Models;

public class Company : ISoftDelete, IConfirmable
{
    [Key]
    public int ID { get; set; }

    [Required]
    [MinLength(3)]
    public string Title { get; set; } = default!;

    public List<User> Employees { get; set; } = default!;
       
    public bool Deleted { get; set; } = false;
    public bool Confirmed { get; set; } = false;
}

[AutoMap(typeof(Company), ReverseMap = true)]
public class CompanyGetDTO
{
    public int ID { get; set; }

    public string Title { get; set; } = default!;

    public List<UserGetDTO> Employees { get; set; } = default!;
}

[AutoMap(typeof(Company), ReverseMap = true)]
public class CompanyPostDTO
{
    [Required]
    [MinLength(3)]
    public string Title { get; set; } = default!;
}


