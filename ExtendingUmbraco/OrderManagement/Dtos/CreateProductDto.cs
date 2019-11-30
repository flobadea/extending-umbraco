using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class CreateProductDto
    {
        [JsonProperty("name")]
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("price")]
        [Range(0, 10000)]
        public decimal Price { get; set; }
        [JsonProperty("categoryId")]
        public int CategoryId { get; set; }

    }
}