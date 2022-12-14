using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;

namespace backend.Models
{
	public class User : ISoftDelete
	{
        [Key]
		public int ID { get; set; }

		[Required]
		[MinLength(3)]
		public string FirstName { get; set; } = default!;

        [Required]
        [MinLength(3)]
        public string LastName { get; set; } = default!;

        public string Password { get; set; } = default!;

        public string? RefreshToken { get; set; } = default!;

        public DateTime? TokenCreated { get; set; } = DateTime.Now;

        public DateTime? TokenExpires { get; set; } = DateTime.Now.AddMinutes(2);

        [Required]
		[MinLength(5)]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; } = default!;

        [Required]
        public Gender Gender { get; set; }

		[Required]
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }

		public bool Deleted { get; set; } = false;

        public int? CompanyID { get; set; }

        [ForeignKey("CompanyID")]
		public Company? Company { get; set; }

        public List<Role> Roles { get; set; } = new List<Role>() { Role.User};
    }

    [AutoMap(typeof(User), ReverseMap = true)]
    public class UserPostDTO
    {
        [Required]
        [MinLength(3)]
        public string FirstName { get; set; } = default!;

        [Required]
        [MinLength(3)]
        public string LastName { get; set; } = default!;

        [Required]
        [MinLength(5)]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; } = default!;

        [Required]
        public Gender Gender { get; set; }

        [Required]
        [MinLength(5)]
        public string Password { get; set; } = default!;

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }
    }

    [AutoMap(typeof(User), ReverseMap = true)]
    public class UserGetDTO
	{
        public int ID { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string EmailAddress { get; set; } = default!;

        public Gender Gender { get; set; }

        public DateTime Birthday { get; set; }

        public List<Role> Roles { get; set; } = default!;

        public int CompanyID { get; set; }
    }

    public class UserLoginDTO
    {
        [Required]
        [MinLength(5)]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; } = default!;

        [Required]
        [MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; } = default!;
    }

    public enum Role
    {
        User = 1,
        Admin = 3,
        CompanyOwner = 2,

    }

    public enum Gender
    {
        Male,
        Female,
        Other
    }
}

