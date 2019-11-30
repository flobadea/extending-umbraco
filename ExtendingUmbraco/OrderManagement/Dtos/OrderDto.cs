using Newtonsoft.Json;
using System;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public enum OrderStatus
    {
        Created = 0,
        Shipped = 1,
        Delivered = 2
    }
    public class OrderDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }
        [JsonProperty("shippedAt")]
        public DateTime? ShippedAt { get; set; }
        [JsonProperty("deliveredAt")]
        public DateTime? DeliveredAt { get; set; }
        [JsonProperty("shippingAddress")]
        public string ShippingAddress { get; set; }
        [JsonProperty("total")]
        public decimal Total { get; set; }
    }

}