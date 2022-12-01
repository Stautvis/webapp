using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;

namespace backend.Models;

public class Review : ISoftDelete
{
    [Key]
    public int ID { get; set; }

    public int AuthorID { get; set; }
    [Required]
    [ForeignKey("AuthorID")]
    public User Author { get; set; } = default!;

    public int ServiceID { get; set; }
    [Required]
    [ForeignKey("ServiceID")]
    public Service Service { get; set; } = default!;

    [Required]
    [MinLength(5)]
    [DataType(DataType.Text)]
    public string Message { get; set; } = default!;

    [Range(0,5)]
    [Required]
    public double Rating { get; set; }
    
    public DateTime PublishDate { get; set; } = DateTime.Now;

    public bool Deleted { get; set; } = false;
}

[AutoMap(typeof(Review), ReverseMap = true)]
public class ReviewGetDTO
{
    public int ID { get; set; }

    public UserGetDTO Author { get; set; } = default!;

    public string Message { get; set; } = default!;

    public double Rating { get; set; }

    public DateTime PublishDate { get; set; } = DateTime.Now;
}

[AutoMap(typeof(Review), ReverseMap = true)]
public class ReviewPostDTO
{
    public int AuthorID { get; set; }

    [Required]
    [MinLength(5)]
    [DataType(DataType.Text)]
    public string Message { get; set; } = default!;

    [Range(0, 5)]
    [Required]
    public double Rating { get; set; }
}

[AutoMap(typeof(Review), ReverseMap = true)]
public class ReviewEditDTO
{
    [Required]
    [MinLength(5)]
    [DataType(DataType.Text)]
    public string Message { get; set; } = default!;

    [Range(0, 5)]
    [Required]
    public double Rating { get; set; }
}
