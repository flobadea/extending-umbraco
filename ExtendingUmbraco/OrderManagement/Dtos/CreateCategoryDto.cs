using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class CreateCategoryDto
    {
        [JsonProperty("name")]
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }

}