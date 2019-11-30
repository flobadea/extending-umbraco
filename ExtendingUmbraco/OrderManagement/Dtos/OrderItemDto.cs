using Newtonsoft.Json;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class OrderItemDto
    {
        [JsonProperty("orderId")]
        public int OrderId { get; set; }
        [JsonProperty("productId")]
        public int ProductId { get; set; }
        [JsonProperty("productName")]
        public string ProductName { get; set; }
        [JsonProperty("qty")]
        public int Qty { get; set; }
        [JsonProperty("unitPrice")]
        public decimal UnitPrice { get; set; }
    }

}