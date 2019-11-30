using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class UpdateCategoryDto
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

    }
}