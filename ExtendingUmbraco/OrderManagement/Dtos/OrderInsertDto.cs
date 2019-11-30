using System.ComponentModel.DataAnnotations;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class OrderInsertDto
    {
        [Required]
        public string ShippingAddress { get; set; }
        [Required]
        [MinLength(1)]
        public OrderItemViewModel[] Items { get; set; }
    }
    public class OrderItemViewModel
    {
        public int ProductId { get; set; }
        [Range(1, 1000)]
        public int Quantity { get; set; }
        [Range(0, 10000)]
        public decimal Price { get; set; }
    }

}