using Newtonsoft.Json;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class CategoryDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }

    }
}