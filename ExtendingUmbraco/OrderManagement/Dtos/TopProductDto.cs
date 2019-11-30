using Newtonsoft.Json;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class TopProductDto
    {
        [JsonProperty("productName")]
        public string ProductName { get; set; }
        [JsonProperty("value")]
        public decimal Value { get; set; }

    }
}