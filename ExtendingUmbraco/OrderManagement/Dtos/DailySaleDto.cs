using Newtonsoft.Json;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class DailySaleDto
    {
        [JsonProperty("day")]
        public int Day { get; set; }
        [JsonProperty("value")]
        public decimal Value { get; set; }

    }
}