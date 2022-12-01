using System;
namespace backend.Models
{
	public class Order : IConfirmable
	{
		public int OrderID { get; set; }
		public User Buyer { get; set; } = default!;
		public Service Service { get; set; } = default!;
		public DateTime BuyedAt { get; set; } = default!;
        public bool Confirmed { get; set; } = false;
    }
}

